"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function signUp(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();

  const username = String(formData.get("username") ?? "")
    .trim()
    .toLowerCase();

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");

  const confirmPassword = String(
    formData.get("confirmPassword") ?? ""
  );

  const terms = formData.get("terms");

  /*
   * Required fields
   */
  if (
    !fullName ||
    !username ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    redirect(
      `/signup?error=${encodeURIComponent(
        "Please complete all required fields."
      )}`
    );
  }

  /*
   * Username format
   *
   * Allowed:
   * - lowercase letters
   * - numbers
   * - underscore
   * - 3–30 characters
   */
  const usernamePattern = /^[a-z0-9_]{3,30}$/;

  if (!usernamePattern.test(username)) {
    redirect(
      `/signup?error=${encodeURIComponent(
        "Username must be 3–30 characters and can only contain letters, numbers, and underscores."
      )}`
    );
  }

  /*
   * Password confirmation
   */
  if (password !== confirmPassword) {
    redirect(
      `/signup?error=${encodeURIComponent(
        "Password and confirmation password do not match."
      )}`
    );
  }

  /*
   * Terms
   */
  if (!terms) {
    redirect(
      `/signup?error=${encodeURIComponent(
        "You must agree to the Terms of Use and Privacy Policy."
      )}`
    );
  }

  const supabase = await createClient();

  /*
   * Check username availability
   */
  const {
    data: usernameExists,
    error: usernameCheckError,
  } = await supabase.rpc("username_exists", {
    candidate: username,
  });

  if (usernameCheckError) {
    console.error(
      "Username availability check failed:",
      usernameCheckError
    );

    redirect(
      `/signup?error=${encodeURIComponent(
        "Unable to check username availability. Please try again."
      )}`
    );
  }

  if (usernameExists) {
    redirect(
      `/signup?error=${encodeURIComponent(
        `Username "${username}" is already taken.`
      )}`
    );
  }

  /*
   * Create Supabase Auth user
   */
  const { data, error } = await supabase.auth.signUp({
    email,
    password,

    options: {
      data: {
        full_name: fullName,
        username,
      },
    },
  });

  if (error) {
    console.error("Sign up error:", error);

    redirect(
      `/signup?error=${encodeURIComponent(error.message)}`
    );
  }

  /*
   * Email confirmation enabled
   */
  if (!data.session) {
    redirect(
      `/signup?success=${encodeURIComponent(
        "Account created successfully. Please check your email to confirm your account before signing in."
      )}`
    );
  }

  /*
   * Email confirmation disabled
   */
  revalidatePath("/", "layout");

  redirect("/");
}