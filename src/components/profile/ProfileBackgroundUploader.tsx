"use client";

import {
  ChangeEvent,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

type ProfileBackgroundUploaderProps = {
  currentBackgroundUrl: string | null;
  currentBackgroundPath: string | null;
};

type DragState = {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startPositionX: number;
  startPositionY: number;
};

const MAX_FILE_SIZE =
  5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

function getExtension(
  type: string,
) {
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

function clampPosition(
  value: number,
) {
  return Math.min(
    100,
    Math.max(0, value),
  );
}

export default function ProfileBackgroundUploader({
  currentBackgroundUrl,
  currentBackgroundPath,
}: ProfileBackgroundUploaderProps) {
  const router = useRouter();

  const supabase =
    createClient();

  const previewRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const dragRef =
    useRef<DragState | null>(
      null,
    );

  const [
    previewUrl,
    setPreviewUrl,
  ] = useState<string | null>(
    currentBackgroundUrl,
  );

  const [
    activePath,
    setActivePath,
  ] = useState<string | null>(
    currentBackgroundPath,
  );

  const [
    positionX,
    setPositionX,
  ] = useState(50);

  const [
    positionY,
    setPositionY,
  ] = useState(50);

  const [
    savedPositionX,
    setSavedPositionX,
  ] = useState(50);

  const [
    savedPositionY,
    setSavedPositionY,
  ] = useState(50);

  const [
    loadingPosition,
    setLoadingPosition,
  ] = useState(true);

  const [
    dragging,
    setDragging,
  ] = useState(false);

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    removing,
    setRemoving,
  ] = useState(false);

  const [
    savingPosition,
    setSavingPosition,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  );

  const [
    success,
    setSuccess,
  ] = useState<string | null>(
    null,
  );

  /*
   * Ambil posisi background
   * yang sudah tersimpan.
   */
  useEffect(() => {
    let cancelled = false;

    async function loadPosition() {
      try {
        const {
          data: { user },
          error: userError,
        } =
          await supabase.auth.getUser();

        if (
          userError ||
          !user
        ) {
          return;
        }

        const {
          data,
          error: profileError,
        } =
          await supabase
            .from("profiles")
            .select(
              `
                background_position_x,
                background_position_y
              `,
            )
            .eq(
              "id",
              user.id,
            )
            .single();

        if (profileError) {
          console.error(
            "Unable to load background position:",
            profileError,
          );

          return;
        }

        if (cancelled) {
          return;
        }

        const x =
          typeof data
            ?.background_position_x ===
          "number"
            ? data.background_position_x
            : 50;

        const y =
          typeof data
            ?.background_position_y ===
          "number"
            ? data.background_position_y
            : 50;

        setPositionX(x);
        setPositionY(y);

        setSavedPositionX(x);
        setSavedPositionY(y);
      } finally {
        if (!cancelled) {
          setLoadingPosition(
            false,
          );
        }
      }
    }

    loadPosition();

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const positionDirty =
    Math.round(positionX) !==
      Math.round(
        savedPositionX,
      ) ||
    Math.round(positionY) !==
      Math.round(
        savedPositionY,
      );

  const handleFileChange =
    async (
      event:
        ChangeEvent<HTMLInputElement>,
    ) => {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      setError(null);
      setSuccess(null);

      if (
        !ALLOWED_TYPES.includes(
          file.type,
        )
      ) {
        setError(
          "Please choose a JPG, PNG, or WebP image.",
        );

        event.target.value =
          "";

        return;
      }

      if (
        file.size >
        MAX_FILE_SIZE
      ) {
        setError(
          "Profile background must be 5 MB or smaller.",
        );

        event.target.value =
          "";

        return;
      }

      const extension =
        getExtension(
          file.type,
        );

      if (!extension) {
        setError(
          "Unsupported image format.",
        );

        event.target.value =
          "";

        return;
      }

      setUploading(true);

      try {
        const {
          data: { user },
          error: userError,
        } =
          await supabase.auth.getUser();

        if (
          userError ||
          !user
        ) {
          throw new Error(
            "Your session could not be verified. Please sign in again.",
          );
        }

        const filePath =
          `${user.id}/${Date.now()}.${extension}`;

        /*
         * 1. Upload background baru.
         */
        const {
          error: uploadError,
        } =
          await supabase.storage
            .from(
              "profile-backgrounds",
            )
            .upload(
              filePath,
              file,
              {
                cacheControl:
                  "3600",
                contentType:
                  file.type,
                upsert: false,
              },
            );

        if (uploadError) {
          throw uploadError;
        }

        /*
         * 2. Ambil public URL.
         */
        const {
          data: {
            publicUrl,
          },
        } =
          supabase.storage
            .from(
              "profile-backgrounds",
            )
            .getPublicUrl(
              filePath,
            );

        /*
         * 3. Update database.
         *
         * Gambar baru selalu
         * dimulai dari posisi tengah.
         */
        const {
          error: profileError,
        } =
          await supabase
            .from("profiles")
            .update({
              background_url:
                publicUrl,

              background_path:
                filePath,

              background_position_x:
                50,

              background_position_y:
                50,
            })
            .eq(
              "id",
              user.id,
            );

        if (profileError) {
          await supabase.storage
            .from(
              "profile-backgrounds",
            )
            .remove([
              filePath,
            ]);

          throw profileError;
        }

        /*
         * 4. Hapus file lama.
         */
        if (
          activePath &&
          activePath !==
            filePath
        ) {
          const {
            error:
              deleteOldError,
          } =
            await supabase.storage
              .from(
                "profile-backgrounds",
              )
              .remove([
                activePath,
              ]);

          if (
            deleteOldError
          ) {
            console.error(
              "Unable to delete previous profile background:",
              deleteOldError,
            );
          }
        }

        setActivePath(
          filePath,
        );

        setPreviewUrl(
          publicUrl,
        );

        setPositionX(50);
        setPositionY(50);

        setSavedPositionX(
          50,
        );

        setSavedPositionY(
          50,
        );

        setSuccess(
          "Profile background updated successfully. Drag the image to adjust its position.",
        );

        router.refresh();
      } catch (uploadError) {
        console.error(
          "Profile background upload error:",
          uploadError,
        );

        setError(
          uploadError instanceof
            Error
            ? uploadError.message
            : "Unable to upload profile background. Please try again.",
        );
      } finally {
        setUploading(
          false,
        );

        event.target.value =
          "";
      }
    };

  function handlePointerDown(
    event:
      ReactPointerEvent<HTMLDivElement>,
  ) {
    if (
      !previewUrl ||
      uploading ||
      removing ||
      savingPosition ||
      loadingPosition
    ) {
      return;
    }

    setError(null);
    setSuccess(null);

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );

    dragRef.current = {
      pointerId:
        event.pointerId,

      startClientX:
        event.clientX,

      startClientY:
        event.clientY,

      startPositionX:
        positionX,

      startPositionY:
        positionY,
    };

    setDragging(true);
  }

  function handlePointerMove(
    event:
      ReactPointerEvent<HTMLDivElement>,
  ) {
    const drag =
      dragRef.current;

    const container =
      previewRef.current;

    if (
      !drag ||
      !container ||
      drag.pointerId !==
        event.pointerId
    ) {
      return;
    }

    const rect =
      container.getBoundingClientRect();

    if (
      rect.width <= 0 ||
      rect.height <= 0
    ) {
      return;
    }

    const deltaX =
      event.clientX -
      drag.startClientX;

    const deltaY =
      event.clientY -
      drag.startClientY;

    /*
     * Minus membuat gambar terasa
     * seperti benar-benar sedang
     * digeser dengan tangan.
     */
    const nextX =
      drag.startPositionX -
      (deltaX /
        rect.width) *
        100;

    const nextY =
      drag.startPositionY -
      (deltaY /
        rect.height) *
        100;

    setPositionX(
      clampPosition(
        nextX,
      ),
    );

    setPositionY(
      clampPosition(
        nextY,
      ),
    );
  }

  function endDrag(
    event:
      ReactPointerEvent<HTMLDivElement>,
  ) {
    const drag =
      dragRef.current;

    if (
      drag?.pointerId ===
      event.pointerId
    ) {
      dragRef.current =
        null;

      setDragging(false);
    }

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    }
  }

  function handleResetPosition() {
    if (!previewUrl) {
      return;
    }

    setError(null);
    setSuccess(null);

    setPositionX(50);
    setPositionY(50);
  }

  async function handleSavePosition() {
    if (
      !previewUrl ||
      !positionDirty
    ) {
      return;
    }

    setError(null);
    setSuccess(null);

    setSavingPosition(
      true,
    );

    try {
      const {
        data: { user },
        error: userError,
      } =
        await supabase.auth.getUser();

      if (
        userError ||
        !user
      ) {
        throw new Error(
          "Your session could not be verified. Please sign in again.",
        );
      }

      const finalX =
        Math.round(
          positionX,
        );

      const finalY =
        Math.round(
          positionY,
        );

      const {
        error: profileError,
      } =
        await supabase
          .from("profiles")
          .update({
            background_position_x:
              finalX,

            background_position_y:
              finalY,
          })
          .eq(
            "id",
            user.id,
          );

      if (profileError) {
        throw profileError;
      }

      setPositionX(
        finalX,
      );

      setPositionY(
        finalY,
      );

      setSavedPositionX(
        finalX,
      );

      setSavedPositionY(
        finalY,
      );

      setSuccess(
        "Background position saved successfully.",
      );

      router.refresh();
    } catch (saveError) {
      console.error(
        "Background position save error:",
        saveError,
      );

      setError(
        saveError instanceof
          Error
          ? saveError.message
          : "Unable to save background position. Please try again.",
      );
    } finally {
      setSavingPosition(
        false,
      );
    }
  }

  const handleRemoveBackground =
    async () => {
      if (
        !activePath &&
        !previewUrl
      ) {
        return;
      }

      const confirmed =
        window.confirm(
          "Remove your current profile background?",
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
        } =
          await supabase.auth.getUser();

        if (
          userError ||
          !user
        ) {
          throw new Error(
            "Your session could not be verified. Please sign in again.",
          );
        }

        const {
          error: profileError,
        } =
          await supabase
            .from("profiles")
            .update({
              background_url:
                null,

              background_path:
                null,

              background_position_x:
                50,

              background_position_y:
                50,
            })
            .eq(
              "id",
              user.id,
            );

        if (profileError) {
          throw profileError;
        }

        if (activePath) {
          const {
            error:
              deleteError,
          } =
            await supabase.storage
              .from(
                "profile-backgrounds",
              )
              .remove([
                activePath,
              ]);

          if (
            deleteError
          ) {
            console.error(
              "Unable to delete profile background file:",
              deleteError,
            );
          }
        }

        setActivePath(
          null,
        );

        setPreviewUrl(
          null,
        );

        setPositionX(50);
        setPositionY(50);

        setSavedPositionX(
          50,
        );

        setSavedPositionY(
          50,
        );

        setSuccess(
          "Profile background removed successfully.",
        );

        router.refresh();
      } catch (removeError) {
        console.error(
          "Profile background removal error:",
          removeError,
        );

        setError(
          removeError instanceof
            Error
            ? removeError.message
            : "Unable to remove profile background. Please try again.",
        );
      } finally {
        setRemoving(
          false,
        );
      }
    };

  return (
    <div className="rounded-2xl border border-violet-100 bg-[#faf8ff] p-5 sm:p-6">
      {/* Preview */}
      <div
        ref={
          previewRef
        }
        onPointerDown={
          handlePointerDown
        }
        onPointerMove={
          handlePointerMove
        }
        onPointerUp={
          endDrag
        }
        onPointerCancel={
          endDrag
        }
        className={`relative aspect-[3/1] w-full overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm ${
          previewUrl
            ? dragging
              ? "cursor-grabbing touch-none"
              : "cursor-grab touch-none"
            : ""
        }`}
      >
        {previewUrl ? (
          <>
            <img
              src={
                previewUrl
              }
              alt="Profile background"
              draggable={
                false
              }
              style={{
                objectPosition:
                  `${positionX}% ${positionY}%`,
              }}
              className="pointer-events-none h-full w-full select-none object-cover"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-4 pb-3 pt-10">
              <p className="text-center text-xs font-semibold text-white">
                {dragging
                  ? "Repositioning..."
                  : "Drag image to reposition"}
              </p>
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-500">
            <div className="text-center text-white">
              <p className="text-sm font-bold">
                Default ICONIA
                Background
              </p>

              <p className="mt-1 text-xs text-white/70">
                Upload an image to
                personalize your
                profile.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Position Info */}
      {previewUrl && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs leading-5 text-slate-500">
            Drag the image until
            the important part is
            visible inside the
            frame.
          </p>

          <p className="rounded-full border border-violet-100 bg-white px-3 py-1 text-[11px] font-semibold text-slate-500">
            X{" "}
            {Math.round(
              positionX,
            )}
            % · Y{" "}
            {Math.round(
              positionY,
            )}
            %
          </p>
        </div>
      )}

      {/* Main Controls */}
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-slate-900">
            Profile Background
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            JPG, PNG or WebP ·
            Maximum 5 MB
          </p>

          <p className="text-xs leading-5 text-slate-400">
            Recommended size:
            1200 × 400 pixels.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <label
            className={`inline-flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-500/15 transition ${
              uploading ||
              removing ||
              savingPosition
                ? "pointer-events-none opacity-50"
                : "hover:-translate-y-0.5 hover:shadow-lg"
            }`}
          >
            {uploading
              ? "Uploading..."
              : previewUrl
                ? "Change Background"
                : "Upload Background"}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={
                handleFileChange
              }
              disabled={
                uploading ||
                removing ||
                savingPosition
              }
              className="hidden"
            />
          </label>

          {previewUrl && (
            <button
              type="button"
              onClick={
                handleRemoveBackground
              }
              disabled={
                uploading ||
                removing ||
                savingPosition
              }
              className="rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {removing
                ? "Removing..."
                : "Remove"}
            </button>
          )}
        </div>
      </div>

      {/* Position Controls */}
      {previewUrl && (
        <div className="mt-5 flex flex-col gap-3 border-t border-violet-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Background
              Position
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Repositioning does
              not modify the
              original image.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={
                handleResetPosition
              }
              disabled={
                uploading ||
                removing ||
                savingPosition ||
                loadingPosition
              }
              className="rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset Position
            </button>

            <button
              type="button"
              onClick={
                handleSavePosition
              }
              disabled={
                uploading ||
                removing ||
                savingPosition ||
                loadingPosition ||
                !positionDirty
              }
              className="rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {savingPosition
                ? "Saving..."
                : "Save Position"}
            </button>
          </div>
        </div>
      )}

      {/* Error */}
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

      {/* Success */}
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