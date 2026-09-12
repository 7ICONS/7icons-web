"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

type AvatarUploaderProps = {
  currentAvatarUrl: string | null;
  currentAvatarPath: string | null;
  displayName: string;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

function getExtension(type: string) {
  switch (type) {
    case "image/jpeg":
      return "jpg";

    case "image/png":
      return "png";

    case "image/webp":
      return "webp";

    default:
      return null;
  }
}

export default function AvatarUploader({
  currentAvatarUrl,
  currentAvatarPath,
  displayName,
}: AvatarUploaderProps) {
  const router = useRouter();
  const supabase = createClient();

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentAvatarUrl,
  );

  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const initial =
    displayName.trim().charAt(0).toUpperCase() || "I";

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError(null);
    setSuccess(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError(
        "Please choose a JPG, PNG, or WebP image.",
      );

      event.target.value = "";

      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(
        "Profile picture must be 5 MB or smaller.",
      );

      event.target.value = "";

      return;
    }

    const extension = getExtension(file.type);

    if (!extension) {
      setError("Unsupported image format.");

      event.target.value = "";

      return;
    }

    setUploading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          "Your session could not be verified. Please sign in again.",
        );
      }

      const filePath = `${user.id}/${Date.now()}.${extension}`;

      /*
       * 1. Upload avatar baru.
       * Kita memakai nama file baru agar tidak terkena cache avatar lama.
       */
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      /*
       * 2. Ambil public URL.
       */
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      /*
       * 3. Update profile.
       */
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          avatar_url: publicUrl,
          avatar_path: filePath,
        })
        .eq("id", user.id);

      if (profileError) {
        /*
         * Kalau update database gagal,
         * hapus file baru agar tidak menjadi orphan.
         */
        await supabase.storage
          .from("avatars")
          .remove([filePath]);

        throw profileError;
      }

      /*
       * 4. Sinkronkan metadata Auth.
       * Tidak fatal jika gagal karena sumber utama avatar tetap profiles.
       */
      const { error: authError } =
        await supabase.auth.updateUser({
          data: {
            avatar_url: publicUrl,
          },
        });

      if (authError) {
        console.error(
          "Unable to sync avatar metadata:",
          authError,
        );
      }

      /*
       * 5. Setelah database menunjuk avatar baru,
       * baru avatar lama dihapus.
       */
      if (
        currentAvatarPath &&
        currentAvatarPath !== filePath
      ) {
        const { error: deleteOldError } =
          await supabase.storage
            .from("avatars")
            .remove([currentAvatarPath]);

        if (deleteOldError) {
          console.error(
            "Unable to delete previous avatar:",
            deleteOldError,
          );
        }
      }

      setPreviewUrl(publicUrl);
      setSuccess("Profile picture updated successfully.");

      router.refresh();
    } catch (uploadError) {
      console.error("Avatar upload error:", uploadError);

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload profile picture. Please try again.",
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  };

  const handleRemoveAvatar = async () => {
    if (!currentAvatarPath && !previewUrl) {
      return;
    }

    const confirmed = window.confirm(
      "Remove your current profile picture?",
    );

    if (!confirmed) {
      return;
    }

    setError(null);
    setSuccess(null);
    setRemoving(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          "Your session could not be verified. Please sign in again.",
        );
      }

      /*
       * Hilangkan referensi database lebih dulu.
       * Kalau delete Storage gagal, website tetap tidak menunjuk file lama.
       */
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          avatar_url: null,
          avatar_path: null,
        })
        .eq("id", user.id);

      if (profileError) {
        throw profileError;
      }

      await supabase.auth.updateUser({
        data: {
          avatar_url: null,
        },
      });

      if (currentAvatarPath) {
        const { error: deleteError } =
          await supabase.storage
            .from("avatars")
            .remove([currentAvatarPath]);

        if (deleteError) {
          console.error(
            "Unable to delete avatar file:",
            deleteError,
          );
        }
      }

      setPreviewUrl(null);
      setSuccess("Profile picture removed successfully.");

      router.refresh();
    } catch (removeError) {
      console.error("Avatar removal error:", removeError);

      setError(
        removeError instanceof Error
          ? removeError.message
          : "Unable to remove profile picture. Please try again.",
      );
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-violet-100 bg-[#faf8ff] p-5 sm:p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {/* Avatar Preview */}
        <div className="shrink-0">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={displayName}
              className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-violet-700 to-purple-500 text-4xl font-bold text-white shadow-lg">
              {initial}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900">
            Profile Picture
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Upload a JPG, PNG, or WebP image up to 5 MB.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <label
              className={`inline-flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-500/15 transition ${
                uploading || removing
                  ? "pointer-events-none opacity-50"
                  : "hover:-translate-y-0.5 hover:shadow-lg"
              }`}
            >
              {uploading
                ? "Uploading..."
                : previewUrl
                  ? "Change Picture"
                  : "Upload Picture"}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={uploading || removing}
                className="hidden"
              />
            </label>

            {previewUrl && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                disabled={uploading || removing}
                className="rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {removing ? "Removing..." : "Remove"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Avatar Error */}
      {error && (
        <div
          className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
          role="alert"
        >
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Avatar Success */}
      {success && (
        <div
          className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
          role="status"
        >
          <p className="text-sm font-medium text-emerald-700">
            {success}
          </p>
        </div>
      )}
    </div>
  );
}