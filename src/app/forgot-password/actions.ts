"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

function getSiteOrigin(
  host: string | null,
  forwardedHost: string | null,
  forwardedProto: string | null,
) {
  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredSiteUrl) {
    return configuredSiteUrl.replace(/\/$/, "");
  }

  const resolvedHost =
    forwardedHost || host;

  if (!resolvedHost) {
    return "http://localhost:3000";
  }

  const protocol =
    forwardedProto ||
    (resolvedHost.includes("localhost")
      ? "http"
      : "https");

  return `${protocol}://${resolvedHost}`;
}

export async function requestPasswordReset(
  formData: FormData,
) {
  const email = String(
    formData.get("email") ?? "",
  )
    .trim()
    .toLowerCase();

  if (!email) {
    redirect(
      `/forgot-password?error=${encodeURIComponent(
        "Please enter your email address.",
      )}`,
    );
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    redirect(
      `/forgot-password?error=${encodeURIComponent(
        "Please enter a valid email address.",
      )}`,
    );
  }

  const requestHeaders =
    await headers();

  const origin = getSiteOrigin(
    requestHeaders.get("host"),
    requestHeaders.get(
      "x-forwarded-host",
    ),
    requestHeaders.get(
      "x-forwarded-proto",
    ),
  );

  const supabase =
    await createClient();

  const { error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          `${origin}/auth/callback?next=/reset-password`,
      },
    );

  if (error) {
    console.error(
      "Password reset request failed:",
      error,
    );

    redirect(
      `/forgot-password?error=${encodeURIComponent(
        "Unable to send the reset email right now. Please try again later.",
      )}`,
    );
  }

  /*
   * Jangan memberi tahu apakah email
   * terdaftar atau tidak.
   * Ini mencegah account enumeration.
   */
  redirect(
    `/forgot-password?success=${encodeURIComponent(
      "If an account exists for that email address, password reset instructions have been sent.",
    )}`,
  );
}