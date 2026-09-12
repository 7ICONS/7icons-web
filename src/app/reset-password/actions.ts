"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function resetPassword(
  formData: FormData,
) {
  const password = String(
    formData.get("password") ?? "",
  );

  const confirmPassword = String(
    formData.get("confirmPassword") ?? "",
  );

  if (!password || !confirmPassword) {
    redirect(
      `/reset-password?error=${encodeURIComponent(
        "Please enter and confirm your new password.",
      )}`,
    );
  }

  if (password.length < 8) {
    redirect(
      `/reset-password?error=${encodeURIComponent(
        "Your new password must contain at least 8 characters.",
      )}`,
    );
  }

  if (password !== confirmPassword) {
    redirect(
      `/reset-password?error=${encodeURIComponent(
        "The passwords do not match.",
      )}`,
    );
  }

  const supabase =
    await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect(
      `/forgot-password?error=${encodeURIComponent(
        "Your password reset session has expired. Please request a new reset link.",
      )}`,
    );
  }

  const { error } =
    await supabase.auth.updateUser({
      password,
    });

  if (error) {
    console.error(
      "Password update failed:",
      error,
    );

    redirect(
      `/reset-password?error=${encodeURIComponent(
        "Unable to update your password. Please try again.",
      )}`,
    );
  }

  /*
   * Hanya keluarkan session website ini.
   * Jangan revoke session aplikasi lain
   * yang menggunakan project Supabase yang sama.
   */
  await supabase.auth.signOut({
    scope: "local",
  });

  revalidatePath("/", "layout");

  redirect(
    `/login?success=${encodeURIComponent(
      "Your password has been updated successfully. Please sign in with your new password.",
    )}`,
  );
}