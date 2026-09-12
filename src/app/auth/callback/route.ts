import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl =
    new URL(request.url);

  const code =
    requestUrl.searchParams.get("code");

  const nextParam =
    requestUrl.searchParams.get("next");

  const next =
    nextParam?.startsWith("/") &&
    !nextParam.startsWith("//")
      ? nextParam
      : "/";

  if (!code) {
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "The authentication link is invalid or incomplete.",
        )}`,
        requestUrl.origin,
      ),
    );
  }

  const supabase =
    await createClient();

  const { error } =
    await supabase.auth.exchangeCodeForSession(
      code,
    );

  if (error) {
    console.error(
      "Auth callback failed:",
      error,
    );

    /*
     * Recovery flow mendapatkan pesan
     * yang lebih relevan.
     */
    if (
      next === "/reset-password"
    ) {
      return NextResponse.redirect(
        new URL(
          `/forgot-password?error=${encodeURIComponent(
            "The password reset link is invalid or has expired. Please request a new one.",
          )}`,
          requestUrl.origin,
        ),
      );
    }

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Unable to complete authentication. Please try again.",
        )}`,
        requestUrl.origin,
      ),
    );
  }

  /*
   * Password recovery harus tetap langsung
   * menuju halaman reset password.
   */
  if (
    next === "/reset-password"
  ) {
    return NextResponse.redirect(
      new URL(
        "/reset-password",
        requestUrl.origin,
      ),
    );
  }

  /*
   * Untuk login/signup normal, cek apakah
   * profile sudah memiliki username.
   */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error(
        "Unable to check OAuth profile:",
        profileError,
      );
    }

    if (
      !profile?.username
    ) {
      return NextResponse.redirect(
        new URL(
          "/onboarding/username",
          requestUrl.origin,
        ),
      );
    }
  }

  return NextResponse.redirect(
    new URL(
      next,
      requestUrl.origin,
    ),
  );
}