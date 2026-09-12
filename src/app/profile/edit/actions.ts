"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName = String(formData.get("fullName") ?? "").trim();

  const username = String(formData.get("username") ?? "")
    .trim()
    .toLowerCase();

  const bio = String(formData.get("bio") ?? "").trim();

  /*
   * Full Name Validation
   */
  if (!fullName) {
    redirect(
      `/profile/edit?error=${encodeURIComponent(
        "Full name is required.",
      )}`,
    );
  }

  if (fullName.length > 80) {
    redirect(
      `/profile/edit?error=${encodeURIComponent(
        "Full name must be 80 characters or fewer.",
      )}`,
    );
  }

  /*
   * Username Validation
   */
  const usernamePattern = /^[a-z0-9_]{3,30}$/;

  if (!usernamePattern.test(username)) {
    redirect(
      `/profile/edit?error=${encodeURIComponent(
        "Username must be 3–30 characters and can only contain letters, numbers, and underscores.",
      )}`,
    );
  }

  /*
   * Bio Validation
   */
  if (bio.length > 300) {
    redirect(
      `/profile/edit?error=${encodeURIComponent(
        "Bio must be 300 characters or fewer.",
      )}`,
    );
  }

  /*
   * Check Username
   */
  const {
    data: usernameTaken,
    error: usernameCheckError,
  } = await supabase.rpc("username_taken_by_other", {
    candidate: username,
  });

  if (usernameCheckError) {
    console.error(
      "Username check error:",
      usernameCheckError,
    );

    redirect(
      `/profile/edit?error=${encodeURIComponent(
        "Unable to check username availability. Please try again.",
      )}`,
    );
  }

  if (usernameTaken) {
    redirect(
      `/profile/edit?error=${encodeURIComponent(
        `Username "${username}" is already taken.`,
      )}`,
    );
  }

  /*
   * Update public.profiles
   */
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      username,
      bio: bio || null,
    })
    .eq("id", user.id);

  if (profileError) {
    console.error("Profile update error:", profileError);

    redirect(
      `/profile/edit?error=${encodeURIComponent(
        "Unable to update your profile. Please try again.",
      )}`,
    );
  }

  /*
   * Keep Auth Metadata in sync.
   * Navbar currently reads username/full_name from Auth metadata.
   */
  const { error: authError } =
    await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        username,
      },
    });

  if (authError) {
    console.error(
      "Auth metadata update error:",
      authError,
    );
  }

  revalidatePath("/", "layout");
  revalidatePath("/profile");
  revalidatePath("/profile/edit");

  redirect(
    `/profile?success=${encodeURIComponent(
      "Profile updated successfully.",
    )}`,
  );
}