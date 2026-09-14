"use client";

import {
  FormEvent,
  useMemo,
  useState,
} from "react";

import { createClient } from "@/lib/supabase/client";

type ReportReason =
  | "spam"
  | "harassment"
  | "hate_speech"
  | "misinformation"
  | "inappropriate"
  | "other";

type CommentReportModalProps = {
  commentId: string;
  onClose: () => void;
  onReported?: () => void;
};

const reportReasons: {
  value: ReportReason;
  label: string;
  description: string;
}[] = [
  {
    value: "spam",
    label: "Spam",
    description:
      "Unwanted promotions, repeated messages, or suspicious links.",
  },
  {
    value: "harassment",
    label: "Harassment",
    description:
      "Bullying, threats, or targeted abusive behavior.",
  },
  {
    value: "hate_speech",
    label: "Hate Speech",
    description:
      "Attacks or hateful content directed at a person or group.",
  },
  {
    value: "misinformation",
    label: "Misinformation",
    description:
      "False or misleading information that may confuse the community.",
  },
  {
    value: "inappropriate",
    label: "Inappropriate",
    description:
      "Content that is unsuitable for the 7ICONS community.",
  },
  {
    value: "other",
    label: "Other",
    description:
      "Another issue not covered by the options above.",
  },
];

export default function CommentReportModal({
  commentId,
  onClose,
  onReported,
}: CommentReportModalProps) {
  const supabase =
    useMemo(
      () => createClient(),
      [],
    );

  const [
    reason,
    setReason,
  ] = useState<ReportReason>(
    "spam",
  );

  const [
    details,
    setDetails,
  ] = useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const cleanDetails =
      details.trim();

    if (
      reason === "other" &&
      !cleanDetails
    ) {
      setErrorMessage(
        "Please provide details for this report.",
      );

      return;
    }

    if (
      cleanDetails.length >
      1000
    ) {
      setErrorMessage(
        "Report details cannot exceed 1000 characters.",
      );

      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const {
      error,
    } =
      await supabase.rpc(
        "submit_comment_report",
        {
          p_comment_id:
            commentId,

          p_reason:
            reason,

          p_details:
            cleanDetails ||
            null,
        },
      );

    if (error) {
      console.error(
        "Comment report failed:",
        error,
      );

      setErrorMessage(
        error.message ||
          "Unable to submit your report.",
      );

      setIsSubmitting(false);

      return;
    }

    setSubmitted(true);
    setIsSubmitting(false);

    onReported?.();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comment-report-title"
    >
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-3xl border border-violet-100 bg-white shadow-2xl">
        {submitted ? (
          <div className="p-7 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">
              ✓
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-950">
              Report submitted
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Thank you for helping
              keep the ICONIA
              community safe. The
              moderation team will
              review this comment.
            </p>

            <button
              type="button"
              onClick={
                onClose
              }
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={
              handleSubmit
            }
          >
            <div className="flex items-start justify-between gap-5 border-b border-violet-100 px-6 py-5 sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-500">
                  Community Safety
                </p>

                <h2
                  id="comment-report-title"
                  className="mt-1 text-xl font-bold text-slate-950"
                >
                  Report Comment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Tell us why this
                  comment should be
                  reviewed.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  onClose
                }
                disabled={
                  isSubmitting
                }
                aria-label="Close report dialog"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-violet-50 hover:text-slate-700 disabled:opacity-50"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M6 6 18 18" />
                  <path d="M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="p-6 sm:p-7">
              <div className="space-y-2">
                {reportReasons.map(
                  (item) => {
                    const selected =
                      reason ===
                      item.value;

                    return (
                      <label
                        key={
                          item.value
                        }
                        className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition ${
                          selected
                            ? "border-red-200 bg-red-50/70"
                            : "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="report-reason"
                          value={
                            item.value
                          }
                          checked={
                            selected
                          }
                          onChange={() =>
                            setReason(
                              item.value,
                            )
                          }
                          className="mt-1 h-4 w-4 accent-red-500"
                        />

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {
                              item.label
                            }
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {
                              item.description
                            }
                          </p>
                        </div>
                      </label>
                    );
                  },
                )}
              </div>

              <div className="mt-6">
                <label
                  htmlFor="report-details"
                  className="text-sm font-semibold text-slate-800"
                >
                  Details{" "}
                  {reason ===
                  "other"
                    ? "(required)"
                    : "(optional)"}
                </label>

                <textarea
                  id="report-details"
                  value={
                    details
                  }
                  onChange={(
                    event,
                  ) =>
                    setDetails(
                      event.target
                        .value,
                    )
                  }
                  maxLength={
                    1000
                  }
                  rows={4}
                  disabled={
                    isSubmitting
                  }
                  placeholder="Add any information that may help our moderation team..."
                  className="mt-2 w-full resize-y rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100 disabled:bg-slate-50"
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {
                    details.length
                  }{" "}
                  / 1000
                </p>
              </div>

              {errorMessage && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-700">
                    {
                      errorMessage
                    }
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-violet-100 px-6 py-5 sm:flex-row sm:justify-end sm:px-7">
              <button
                type="button"
                onClick={
                  onClose
                }
                disabled={
                  isSubmitting
                }
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  isSubmitting
                }
                className="inline-flex h-11 items-center justify-center rounded-xl bg-red-500 px-5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Report"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}