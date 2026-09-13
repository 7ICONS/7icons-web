import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

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

  const supabase = await createClient();

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(
      code,
    );

  if (exchangeError) {
    console.error(
      "Auth callback failed:",
      exchangeError,
    );

    if (next === "/reset-password") {
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
   * Password recovery memiliki flow sendiri.
   */
  if (next === "/reset-password") {
    return NextResponse.redirect(
      new URL(
        "/reset-password",
        requestUrl.origin,
      ),
    );
  }

  /*
   * Semua OAuth login normal harus melalui
   * moderation check.
   */
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    await supabase.auth.signOut({
      scope: "local",
    });

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Unable to verify your account. Please try again.",
        )}`,
        requestUrl.origin,
      ),
    );
  }

  const {
    data: userProfile,
    error: statusError,
  } = await supabase
    .from("user_profiles")
    .select("status")
    .eq("id", user.id)
    .maybeSingle();

  if (
    statusError ||
    !userProfile
  ) {
    console.error(
      "Unable to verify OAuth account status:",
      statusError,
    );

    await supabase.auth.signOut({
      scope: "local",
    });

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Unable to verify your account status. Please try again.",
        )}`,
        requestUrl.origin,
      ),
    );
  }

  /*
   * BANNED
   *
   * Session diputus sepenuhnya lalu status
   * dikirim melalui query parameter agar
   * account-restricted bisa menampilkan
   * tampilan banned.
   */
  if (userProfile.status === "banned") {
    await supabase.auth.signOut();

    return NextResponse.redirect(
      new URL(
        "/account-restricted?status=banned",
        requestUrl.origin,
      ),
    );
  }

  /*
   * SUSPENDED
   *
   * Session tetap aktif supaya user masih
   * dapat browse, tetapi diarahkan ke halaman
   * restricted dengan tampilan suspended.
   */
  if (
    userProfile.status === "suspended"
  ) {
    return NextResponse.redirect(
      new URL(
        "/account-restricted?status=suspended",
        requestUrl.origin,
      ),
    );
  }

  if (userProfile.status !== "active") {
    await supabase.auth.signOut({
      scope: "local",
    });

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Your account status could not be verified.",
        )}`,
        requestUrl.origin,
      ),
    );
  }

  /*
   * Setelah moderation lolos,
   * periksa username onboarding.
   */
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

  if (!profile?.username) {
    return NextResponse.redirect(
      new URL(
        "/onboarding/username",
        requestUrl.origin,
      ),
    );
  }

  return NextResponse.redirect(
    new URL(
      next,
      requestUrl.origin,
    ),
  );
}