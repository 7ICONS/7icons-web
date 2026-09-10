"use client";

import Link from "next/link";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createBrowserClient } from "@supabase/ssr";

type PublicComment = {
  id: string;
  parent_id: string | null;
  body: string;
  created_at: string;
  author_name: string;
  is_representative: boolean;
};

type ArticleCommentsProps = {
  articleId: string;
};

function formatCommentDate(
  dateString: string,
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(
    new Date(dateString),
  );
}

export default function ArticleComments({
  articleId,
}: ArticleCommentsProps) {
  const supabase =
    useMemo(() => {
      const supabaseUrl =
        process.env
          .NEXT_PUBLIC_SUPABASE_URL;

      const supabaseKey =
        process.env
          .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
        process.env
          .NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (
        !supabaseUrl ||
        !supabaseKey
      ) {
        return null;
      }

      return createBrowserClient(
        supabaseUrl,
        supabaseKey,
      );
    }, []);

  const [
    comments,
    setComments,
  ] = useState<
    PublicComment[]
  >([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(false);

  const [
    commentBody,
    setCommentBody,
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
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const loadComments =
    useCallback(
      async () => {
        if (!supabase) {
          setErrorMessage(
            "Comments are temporarily unavailable.",
          );

          setIsLoading(
            false,
          );

          return;
        }

        const {
          data,
          error,
        } =
          await supabase.rpc(
            "get_public_article_comments",
            {
              p_article_id:
                articleId,
            },
          );

        if (error) {
          console.error(
            "Unable to load article comments:",
            error,
          );

          setErrorMessage(
            "Unable to load comments right now.",
          );

          setIsLoading(
            false,
          );

          return;
        }

        setComments(
          (data ??
            []) as PublicComment[],
        );

        setIsLoading(
          false,
        );
      },
      [
        articleId,
        supabase,
      ],
    );

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      if (!supabase) {
        if (
          isMounted
        ) {
          setIsAuthenticated(
            false,
          );

          setIsLoading(
            false,
          );
        }

        return;
      }

      const {
        data,
      } =
        await supabase.auth.getUser();

      if (!isMounted) {
        return;
      }

      setIsAuthenticated(
        Boolean(
          data.user,
        ),
      );

      await loadComments();
    }

    void initialize();

    return () => {
      isMounted = false;
    };
  }, [
    loadComments,
    supabase,
  ]);

  const topLevelComments =
    useMemo(
      () =>
        comments.filter(
          (comment) =>
            comment.parent_id ===
            null,
        ),
      [comments],
    );

  const repliesByParent =
    useMemo(() => {
      const map =
        new Map<
          string,
          PublicComment[]
        >();

      comments.forEach(
        (comment) => {
          if (
            !comment.parent_id
          ) {
            return;
          }

          const current =
            map.get(
              comment.parent_id,
            ) ?? [];

          current.push(
            comment,
          );

          map.set(
            comment.parent_id,
            current,
          );
        },
      );

      return map;
    }, [comments]);

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      isSubmitting ||
      !supabase
    ) {
      return;
    }

    const body =
      commentBody.trim();

    if (!body) {
      setErrorMessage(
        "Please write a comment first.",
      );

      return;
    }

    if (
      body.length >
      2000
    ) {
      setErrorMessage(
        "Comment cannot exceed 2000 characters.",
      );

      return;
    }

    setIsSubmitting(
      true,
    );

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const {
        error,
      } =
        await supabase.rpc(
          "submit_article_comment",
          {
            p_article_id:
              articleId,

            p_body:
              body,
          },
        );

      if (error) {
        throw new Error(
          error.message,
        );
      }

      setCommentBody("");

      setSuccessMessage(
        "Your comment has been submitted and is waiting for review.",
      );
    } catch (error) {
      console.error(
        "Article comment submission failed:",
        error,
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your comment.",
      );
    } finally {
      setIsSubmitting(
        false,
      );
    }
  }

  return (
    <section className="border-t border-violet-100 bg-white">
      <div className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-6 lg:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-600">
            Community
          </p>

          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Join the Conversation
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Share your thoughts
                with ICONIA and keep
                the conversation
                around this story
                alive.
              </p>
            </div>

            {!isLoading && (
              <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                {
                  topLevelComments.length
                }{" "}
                {topLevelComments.length ===
                1
                  ? "Comment"
                  : "Comments"}
              </span>
            )}
          </div>
        </div>

        <div className="mt-8">
          {isAuthenticated ? (
            <form
              onSubmit={
                handleSubmit
              }
              className="rounded-3xl border border-violet-100 bg-violet-50/30 p-5 sm:p-6"
            >
              <label
                htmlFor="article-comment"
                className="text-sm font-semibold text-slate-800"
              >
                Leave a Comment
              </label>

              <textarea
                id="article-comment"
                value={
                  commentBody
                }
                onChange={(
                  event,
                ) =>
                  setCommentBody(
                    event.target
                      .value,
                  )
                }
                rows={5}
                maxLength={
                  2000
                }
                disabled={
                  isSubmitting
                }
                placeholder="Share your thoughts about this story..."
                className="mt-3 w-full resize-y rounded-2xl border border-violet-100 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100 disabled:bg-slate-50"
              />

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-400">
                  {
                    commentBody.length
                  }{" "}
                  / 2000
                </p>

                <button
                  type="submit"
                  disabled={
                    isSubmitting
                  }
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/15 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Post Comment"}
                </button>
              </div>

              {successMessage && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <p className="text-sm font-medium text-emerald-700">
                    {
                      successMessage
                    }
                  </p>
                </div>
              )}

              {errorMessage && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-700">
                    {
                      errorMessage
                    }
                  </p>
                </div>
              )}
            </form>
          ) : (
            <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-purple-50/40 p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-slate-900">
                    Want to join the
                    conversation?
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Sign in to your
                    7ICONS account to
                    leave a comment.
                  </p>
                </div>

                <Link
                  href="/login"
                  className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  Sign In to Comment
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10">
          {isLoading ? (
            <div className="rounded-2xl border border-violet-100 bg-violet-50/20 px-5 py-8 text-center">
              <p className="text-sm font-medium text-slate-500">
                Loading comments...
              </p>
            </div>
          ) : topLevelComments.length ===
            0 ? (
            <div className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/20 px-6 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                >
                  <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
                </svg>
              </div>

              <p className="mt-4 font-semibold text-slate-800">
                No comments yet
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Be the first ICONIA
                to join the
                conversation.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {topLevelComments.map(
                (comment) => {
                  const replies =
                    repliesByParent.get(
                      comment.id,
                    ) ?? [];

                  return (
                    <article
                      key={
                        comment.id
                      }
                      className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm sm:p-6"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                            {comment.author_name
                              .charAt(
                                0,
                              )
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {
                                comment.author_name
                              }
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {formatCommentDate(
                                comment.created_at,
                              )}
                            </p>
                          </div>
                        </div>

                        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                          {
                            comment.body
                          }
                        </p>
                      </div>

                      {replies.length >
                        0 && (
                        <div className="ml-4 mt-5 space-y-3 border-l-2 border-violet-100 pl-4 sm:ml-8 sm:pl-6">
                          {replies.map(
                            (
                              reply,
                            ) => (
                              <div
                                key={
                                  reply.id
                                }
                                className="rounded-2xl bg-violet-50/60 p-4"
                              >
                                <div className="flex flex-wrap items-center gap-2">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                                    {reply.author_name
                                      .charAt(
                                        0,
                                      )
                                      .toUpperCase()}
                                  </div>

                                  <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <p className="text-sm font-bold text-slate-900">
                                        {
                                          reply.author_name
                                        }
                                      </p>

                                      {reply.is_representative && (
                                        <span className="rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                                          ICONIA Representative
                                        </span>
                                      )}
                                    </div>

                                    <p className="mt-0.5 text-xs text-slate-400">
                                      {formatCommentDate(
                                        reply.created_at,
                                      )}
                                    </p>
                                  </div>
                                </div>

                                <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                                  {
                                    reply.body
                                  }
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </article>
                  );
                },
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}