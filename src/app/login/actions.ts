"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(
      `/login?error=${encodeURIComponent(
        "Please enter your email address and password."
      )}`
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    let message = "Invalid email or password.";

    if (error.code === "email_not_confirmed") {
      message = "Please confirm your email address before signing in.";
    }

    redirect(`/login?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/", "layout");

  redirect("/");
}