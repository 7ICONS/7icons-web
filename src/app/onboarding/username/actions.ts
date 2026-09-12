"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function completeUsernameOnboarding(
  formData: FormData,
) {
  const username = String(
    formData.get("username") ?? "",
  )
    .trim()
    .toLowerCase();

  const usernamePattern =
    /^[a-z0-9_]{3,30}$/;

  if (!username) {
    redirect(
      `/onboarding/username?error=${encodeURIComponent(
        "Please choose a username.",
      )}`,
    );
  }

  if (!usernamePattern.test(username)) {
    redirect(
      `/onboarding/username?error=${encodeURIComponent(
        "Username must be 3–30 characters and can only contain letters, numbers, and underscores.",
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
    redirect("/login");
  }

  /*
   * Pastikan user memang masih membutuhkan onboarding.
   */
  const {
    data: currentProfile,
    error: profileLoadError,
  } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  if (profileLoadError) {
    console.error(
      "Unable to load onboarding profile:",
      profileLoadError,
    );

    redirect(
      `/onboarding/username?error=${encodeURIComponent(
        "Unable to verify your profile. Please try again.",
      )}`,
    );
  }

  if (currentProfile?.username) {
    redirect("/");
  }

  /*
   * Gunakan RPC yang sama dengan signup normal.
   */
  const {
    data: usernameExists,
    error: usernameCheckError,
  } = await supabase.rpc(
    "username_exists",
    {
      candidate: username,
    },
  );

  if (usernameCheckError) {
    console.error(
      "Username availability check failed:",
      usernameCheckError,
    );

    redirect(
      `/onboarding/username?error=${encodeURIComponent(
        "Unable to check username availability. Please try again.",
      )}`,
    );
  }

  if (usernameExists) {
    redirect(
      `/onboarding/username?error=${encodeURIComponent(
        `Username "${username}" is already taken.`,
      )}`,
    );
  }

  const { error: updateError } =
    await supabase
      .from("profiles")
      .update({
        username,
      })
      .eq("id", user.id);

  if (updateError) {
    console.error(
      "Unable to save username:",
      updateError,
    );

    redirect(
      `/onboarding/username?error=${encodeURIComponent(
        "Unable to save your username. Please try again.",
      )}`,
    );
  }

  /*
   * Sinkronkan ke Auth metadata juga.
   * profiles tetap menjadi sumber utama.
   */
  const { error: metadataError } =
    await supabase.auth.updateUser({
      data: {
        username,
      },
    });

  if (metadataError) {
    console.error(
      "Unable to sync username metadata:",
      metadataError,
    );
  }

  revalidatePath("/", "layout");

  redirect("/");
}