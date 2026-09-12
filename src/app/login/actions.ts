"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

type AccountStatus =
  | "active"
  | "suspended"
  | "banned";

export async function login(
  formData: FormData,
) {
  const email = String(
    formData.get("email") ?? "",
  ).trim();

  const password = String(
    formData.get("password") ?? "",
  );

  if (!email || !password) {
    redirect(
      `/login?error=${encodeURIComponent(
        "Please enter your email address and password.",
      )}`,
    );
  }

  const supabase =
    await createClient();

  /*
   * =========================================================
   * SIGN IN
   * =========================================================
   */
  const {
    data,
    error,
  } =
    await supabase.auth.signInWithPassword(
      {
        email,
        password,
      },
    );

  if (error) {
    let message =
      "Invalid email or password.";

    if (
      error.code ===
      "email_not_confirmed"
    ) {
      message =
        "Please confirm your email address before signing in.";
    }

    redirect(
      `/login?error=${encodeURIComponent(
        message,
      )}`,
    );
  }

  const user = data.user;

  /*
   * =========================================================
   * VERIFY ACCOUNT STATUS
   * =========================================================
   */
  const {
    data: account,
    error: statusError,
  } = await supabase
    .from("user_profiles")
    .select("status")
    .eq("id", user.id)
    .maybeSingle();

  /*
   * Status account wajib tersedia.
   * Kalau gagal diverifikasi, jangan biarkan
   * session masuk tanpa moderation status.
   */
  if (
    statusError ||
    !account
  ) {
    console.error(
      "Unable to verify account status:",
      statusError,
    );

    await supabase.auth.signOut();

    redirect(
      `/login?error=${encodeURIComponent(
        "Unable to verify your account status. Please try again.",
      )}`,
    );
  }

  const status =
    account.status as AccountStatus;

  /*
   * =========================================================
   * BANNED
   * =========================================================
   */
  if (status === "banned") {
    await supabase.auth.signOut();

    redirect(
      "/account-restricted?status=banned",
    );
  }

  /*
   * =========================================================
   * SUSPENDED
   *
   * Login tetap diperbolehkan,
   * tetapi user diberi pemberitahuan.
   * =========================================================
   */
  if (status === "suspended") {
    revalidatePath("/", "layout");

    redirect(
      "/account-restricted?status=suspended",
    );
  }

  /*
   * =========================================================
   * ACTIVE
   * =========================================================
   */
  revalidatePath("/", "layout");

  redirect("/");
}