"use client";

import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

type GoogleAuthButtonProps = {
  next?: string;
};

export default function GoogleAuthButton({
  next = "/",
}: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  async function handleGoogleAuth() {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const supabase = createClient();

      const origin =
        window.location.origin;

      const { error } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo:
              `${origin}/auth/callback?next=${encodeURIComponent(
                next,
              )}`,
          },
        });

      if (error) {
        setErrorMessage(
          "Unable to continue with Google. Please try again.",
        );

        setIsLoading(false);
      }
    } catch {
      setErrorMessage(
        "Unable to continue with Google. Please try again.",
      );

      setIsLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleAuth}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-violet-100 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {/* Official-style Google multicolor G */}
        <svg
          viewBox="0 0 48 48"
          aria-hidden="true"
          className="h-5 w-5 shrink-0"
        >
          <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303C33.702 32.657 29.31 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z"
          />

          <path
            fill="#FF3D00"
            d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.347 4.337-17.694 10.691Z"
          />

          <path
            fill="#4CAF50"
            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.143 35.091 26.62 36 24 36c-5.289 0-9.668-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44Z"
          />

          <path
            fill="#1976D2"
            d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.086 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917Z"
          />
        </svg>

        {isLoading
          ? "Connecting to Google..."
          : "Continue with Google"}
      </button>

      {errorMessage && (
        <p
          role="alert"
          className="mt-3 text-center text-xs font-medium text-red-600"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}