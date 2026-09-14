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

import AccountBadge, {
  type AccountBadgeType,
} from "@/components/account/AccountBadge";
import CommentReportModal from "@/components/comments/CommentReportModal";

type PublicComment = {
  id: string;
  parent_id: string | null;
  body: string;
  created_at: string;
  author_name: string;
  avatar_url: string | null;
  is_representative: boolean;
  account_badge: string | null;
};

type CommentLikeSummaryRow = {
  comment_id: string;
  like_count: number;
  liked_by_me: boolean;
};

type CommentLikeState = {
  like_count: number;
  liked_by_me: boolean;
};

type CommentBookmarkSummaryRow = {
  comment_id: string;
  bookmarked_by_me: boolean;
};

type GalleryCommentsProps = {
  albumId: string;
};

const validAccountBadges: AccountBadgeType[] = [
  "member",
  "representative",
  "moderator",
  "editor",
  "admin",
  "super_admin",
];

function resolveAccountBadge(
  value?: string | null,
): AccountBadgeType {
  if (
    value &&
    validAccountBadges.includes(
      value as AccountBadgeType,
    )
  ) {
    return value as AccountBadgeType;
  }

  return "member";
}

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
  ).format(new Date(dateString));
}

function CommentAvatar({
  name,
  avatarUrl,
  size = "large",
}: {
  name: string;
  avatarUrl: string | null;
  size?: "large" | "small";
}) {
  const sizeClass =
    size === "large"
      ? "h-9 w-9 text-sm"
      : "h-8 w-8 text-xs";

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={`${sizeClass} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-700 to-purple-500 font-bold text-white`}
    >
      {name
        .charAt(0)
        .toUpperCase()}
    </div>
  );
}

function HeartIcon({
  active,
}: {
  active: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={
        active
          ? "currentColor"
          : "none"
      }
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

function StarIcon({
  active,
}: {
  active: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={
        active
          ? "currentColor"
          : "none"
      }
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.4 6.3-.9L12 2.8Z" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 21V4" />
      <path d="M5 5h11l-1.5 4L16 13H5" />
    </svg>
  );
}

function ReplyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m9 17-5-5 5-5" />
      <path d="M4 12h10a6 6 0 0 1 6 6v1" />
    </svg>
  );
}

export default function GalleryComments({
  albumId,
}: GalleryCommentsProps) {
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
    likeState,
    setLikeState,
  ] = useState<
    Record<
      string,
      CommentLikeState
    >
  >({});

  const [
    bookmarkState,
    setBookmarkState,
  ] = useState<
    Record<string, boolean>
  >({});

  const [
    reportedCommentIds,
    setReportedCommentIds,
  ] = useState<
    Record<string, boolean>
  >({});

  const [
    reportingCommentId,
    setReportingCommentId,
  ] = useState<
    string | null
  >(null);

  const [
    replyingToCommentId,
    setReplyingToCommentId,
  ] = useState<
    string | null
  >(null);

  const [
    replyBody,
    setReplyBody,
  ] = useState("");

  const [
    isSubmittingReply,
    setIsSubmittingReply,
  ] = useState(false);

  const [
    replyErrorMessage,
    setReplyErrorMessage,
  ] = useState("");

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
    busyLikeCommentId,
    setBusyLikeCommentId,
  ] = useState<
    string | null
  >(null);

  const [
    busyBookmarkCommentId,
    setBusyBookmarkCommentId,
  ] = useState<
    string | null
  >(null);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [
    interactionErrorMessage,
    setInteractionErrorMessage,
  ] = useState("");

  /*
   * =========================================================
   * LIKE SUMMARY
   * =========================================================
   */
  const loadLikeSummaries =
    useCallback(
      async (
        commentRows: PublicComment[],
      ) => {
        if (
          !supabase ||
          commentRows.length === 0
        ) {
          setLikeState({});
          return;
        }

        const commentIds =
          commentRows.map(
            (comment) =>
              comment.id,
          );

        const {
          data,
          error,
        } =
          await supabase.rpc(
            "get_comment_like_summary",
            {
              p_comment_ids:
                commentIds,
            },
          );

        if (error) {
          console.error(
            "Unable to load comment likes:",
            error,
          );

          const fallbackState:
            Record<
              string,
              CommentLikeState
            > = {};

          commentIds.forEach(
            (commentId) => {
              fallbackState[
                commentId
              ] = {
                like_count: 0,
                liked_by_me:
                  false,
              };
            },
          );

          setLikeState(
            fallbackState,
          );

          return;
        }

        const nextState:
          Record<
            string,
            CommentLikeState
          > = {};

        commentIds.forEach(
          (commentId) => {
            nextState[
              commentId
            ] = {
              like_count: 0,
              liked_by_me:
                false,
            };
          },
        );

        (
          (data ??
            []) as CommentLikeSummaryRow[]
        ).forEach(
          (summary) => {
            nextState[
              summary.comment_id
            ] = {
              like_count:
                Number(
                  summary.like_count ??
                    0,
                ),

              liked_by_me:
                Boolean(
                  summary.liked_by_me,
                ),
            };
          },
        );

        setLikeState(
          nextState,
        );
      },
      [supabase],
    );

  /*
   * =========================================================
   * BOOKMARK SUMMARY
   * =========================================================
   */
  const loadBookmarkSummaries =
    useCallback(
      async (
        commentRows: PublicComment[],
      ) => {
        if (
          !supabase ||
          commentRows.length === 0
        ) {
          setBookmarkState({});
          return;
        }

        const commentIds =
          commentRows.map(
            (comment) =>
              comment.id,
          );

        const {
          data,
          error,
        } =
          await supabase.rpc(
            "get_comment_bookmark_summary",
            {
              p_comment_ids:
                commentIds,
            },
          );

        if (error) {
          console.error(
            "Unable to load comment bookmarks:",
            error,
          );

          return;
        }

        const nextState:
          Record<
            string,
            boolean
          > = {};

        commentIds.forEach(
          (commentId) => {
            nextState[
              commentId
            ] = false;
          },
        );

        (
          (data ??
            []) as CommentBookmarkSummaryRow[]
        ).forEach(
          (summary) => {
            nextState[
              summary.comment_id
            ] =
              Boolean(
                summary.bookmarked_by_me,
              );
          },
        );

        setBookmarkState(
          nextState,
        );
      },
      [supabase],
    );

  /*
   * =========================================================
   * LOAD COMMENTS
   * =========================================================
   */
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
            "get_public_gallery_comments",
            {
              p_gallery_album_id:
                albumId,
            },
          );

        if (error) {
          console.error(
            "Unable to load Gallery comments:",
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

        const commentRows =
          (data ??
            []) as PublicComment[];

        setComments(
          commentRows,
        );

        await loadLikeSummaries(
          commentRows,
        );

        setIsLoading(
          false,
        );
      },
      [
        albumId,
        loadLikeSummaries,
        supabase,
      ],
    );

  /*
   * =========================================================
   * AUTH + INITIAL LOAD
   * =========================================================
   */
  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      if (!supabase) {
        if (isMounted) {
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

    const {
      data: {
        subscription,
      },
    } =
      supabase?.auth.onAuthStateChange(
        (
          _event,
          session,
        ) => {
          if (!isMounted) {
            return;
          }

          setIsAuthenticated(
            Boolean(
              session?.user,
            ),
          );

          void loadComments();
        },
      ) ?? {
        data: {
          subscription: null,
        },
      };

    return () => {
      isMounted = false;

      subscription?.unsubscribe();
    };
  }, [
    loadComments,
    supabase,
  ]);

  /*
   * =========================================================
   * PRIVATE BOOKMARK STATE
   * =========================================================
   */
  useEffect(() => {
    if (
      !isAuthenticated
    ) {
      setBookmarkState({});
      return;
    }

    if (
      comments.length === 0
    ) {
      return;
    }

    void loadBookmarkSummaries(
      comments,
    );
  }, [
    comments,
    isAuthenticated,
    loadBookmarkSummaries,
  ]);

  /*
   * =========================================================
   * COMMENT TREE
   * =========================================================
   */
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

  const childrenByParent =
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
    }, [
      comments,
    ]);

  /*
   * Semua descendant tetap ditampilkan
   * satu level di bawah komentar utama.
   */
  const getFlatReplies =
    useCallback(
      (
        topLevelCommentId: string,
      ) => {
        const result:
          PublicComment[] = [];

        const visited =
          new Set<string>();

        function collect(
          parentId: string,
        ) {
          const children =
            childrenByParent.get(
              parentId,
            ) ?? [];

          children.forEach(
            (child) => {
              if (
                visited.has(
                  child.id,
                )
              ) {
                return;
              }

              visited.add(
                child.id,
              );

              result.push(
                child,
              );

              collect(
                child.id,
              );
            },
          );
        }

        collect(
          topLevelCommentId,
        );

        result.sort(
          (a, b) =>
            new Date(
              a.created_at,
            ).getTime() -
            new Date(
              b.created_at,
            ).getTime(),
        );

        return result;
      },
      [
        childrenByParent,
      ],
    );

  /*
   * =========================================================
   * SUBMIT TOP-LEVEL COMMENT
   * =========================================================
   */
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
          "submit_gallery_comment",
          {
            p_gallery_album_id:
              albumId,

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
        "Gallery comment submission failed:",
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

  /*
   * =========================================================
   * SUBMIT REPLY
   * =========================================================
   */
  async function handleSubmitReply(
    event:
      FormEvent<HTMLFormElement>,
    targetCommentId: string,
  ) {
    event.preventDefault();

    if (
      !supabase ||
      isSubmittingReply
    ) {
      return;
    }

    const body =
      replyBody.trim();

    if (!body) {
      setReplyErrorMessage(
        "Please write a reply first.",
      );

      return;
    }

    if (
      body.length >
      2000
    ) {
      setReplyErrorMessage(
        "Reply cannot exceed 2000 characters.",
      );

      return;
    }

    setIsSubmittingReply(
      true,
    );

    setReplyErrorMessage(
      "",
    );

    try {
      const {
        error,
      } =
        await supabase.rpc(
          "submit_comment_reply",
          {
            p_parent_comment_id:
              targetCommentId,

            p_body:
              body,
          },
        );

      if (error) {
        throw new Error(
          error.message,
        );
      }

      setReplyBody("");

      setReplyingToCommentId(
        null,
      );

      await loadComments();
    } catch (error) {
      console.error(
        "Comment reply failed:",
        error,
      );

      setReplyErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your reply.",
      );
    } finally {
      setIsSubmittingReply(
        false,
      );
    }
  }

  /*
   * =========================================================
   * LIKE
   * =========================================================
   */
  async function handleToggleLike(
    commentId: string,
  ) {
    if (
      !supabase ||
      !isAuthenticated ||
      busyLikeCommentId
    ) {
      return;
    }

    setBusyLikeCommentId(
      commentId,
    );

    setInteractionErrorMessage(
      "",
    );

    const previousState =
      likeState[
        commentId
      ] ?? {
        like_count: 0,
        liked_by_me:
          false,
      };

    try {
      const {
        data,
        error,
      } =
        await supabase.rpc(
          "toggle_comment_like",
          {
            p_comment_id:
              commentId,
          },
        );

      if (error) {
        throw new Error(
          error.message,
        );
      }

      const likedNow =
        Boolean(data);

      setLikeState(
        (current) => {
          const existing =
            current[
              commentId
            ] ?? {
              like_count: 0,
              liked_by_me:
                false,
            };

          return {
            ...current,

            [commentId]: {
              like_count:
                likedNow
                  ? existing.like_count +
                    1
                  : Math.max(
                      0,
                      existing.like_count -
                        1,
                    ),

              liked_by_me:
                likedNow,
            },
          };
        },
      );
    } catch (error) {
      console.error(
        "Comment like failed:",
        error,
      );

      setLikeState(
        (current) => ({
          ...current,

          [commentId]:
            previousState,
        }),
      );

      setInteractionErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update Like.",
      );
    } finally {
      setBusyLikeCommentId(
        null,
      );
    }
  }

  /*
   * =========================================================
   * BOOKMARK
   * =========================================================
   */
  async function handleToggleBookmark(
    commentId: string,
  ) {
    if (
      !supabase ||
      !isAuthenticated ||
      busyBookmarkCommentId
    ) {
      return;
    }

    setBusyBookmarkCommentId(
      commentId,
    );

    setInteractionErrorMessage(
      "",
    );

    const previousState =
      bookmarkState[
        commentId
      ] ?? false;

    try {
      const {
        data,
        error,
      } =
        await supabase.rpc(
          "toggle_comment_bookmark",
          {
            p_comment_id:
              commentId,
          },
        );

      if (error) {
        throw new Error(
          error.message,
        );
      }

      setBookmarkState(
        (current) => ({
          ...current,

          [commentId]:
            Boolean(data),
        }),
      );
    } catch (error) {
      console.error(
        "Comment bookmark failed:",
        error,
      );

      setBookmarkState(
        (current) => ({
          ...current,

          [commentId]:
            previousState,
        }),
      );

      setInteractionErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update bookmark.",
      );
    } finally {
      setBusyBookmarkCommentId(
        null,
      );
    }
  }

  /*
   * =========================================================
   * ACTION BUTTONS
   * =========================================================
   */
  function renderLikeButton(
    commentId: string,
  ) {
    const state =
      likeState[
        commentId
      ] ?? {
        like_count: 0,
        liked_by_me:
          false,
      };

    if (
      !isAuthenticated
    ) {
      return (
        <Link
          href="/login"
          title="Sign in to like this comment"
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-violet-100 bg-white px-3 text-xs font-semibold text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
        >
          <HeartIcon
            active={false}
          />

          <span>
            {state.like_count}
          </span>
        </Link>
      );
    }

    const isBusy =
      busyLikeCommentId ===
      commentId;

    return (
      <button
        type="button"
        onClick={() =>
          void handleToggleLike(
            commentId,
          )
        }
        disabled={
          Boolean(
            busyLikeCommentId,
          )
        }
        aria-pressed={
          state.liked_by_me
        }
        title={
          state.liked_by_me
            ? "Unlike this comment"
            : "Like this comment"
        }
        className={`inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
          state.liked_by_me
            ? "border-violet-200 bg-violet-50 text-violet-700"
            : "border-violet-100 bg-white text-slate-500 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
        }`}
      >
        <HeartIcon
          active={
            state.liked_by_me
          }
        />

        <span>
          {isBusy
            ? "..."
            : state.like_count}
        </span>
      </button>
    );
  }

  function renderReplyButton(
    comment: PublicComment,
  ) {
    if (
      !isAuthenticated
    ) {
      return (
        <Link
          href="/login"
          title="Sign in to reply"
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-violet-100 bg-white px-3 text-xs font-semibold text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
        >
          <ReplyIcon />

          <span>
            Reply
          </span>
        </Link>
      );
    }

    const active =
      replyingToCommentId ===
      comment.id;

    return (
      <button
        type="button"
        onClick={() => {
          if (active) {
            setReplyingToCommentId(
              null,
            );

            setReplyBody("");

            setReplyErrorMessage(
              "",
            );

            return;
          }

          setReplyingToCommentId(
            comment.id,
          );

          setReplyBody("");

          setReplyErrorMessage(
            "",
          );
        }}
        className={`inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition ${
          active
            ? "border-violet-200 bg-violet-50 text-violet-700"
            : "border-violet-100 bg-white text-slate-500 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
        }`}
      >
        <ReplyIcon />

        <span>
          {active
            ? "Cancel"
            : "Reply"}
        </span>
      </button>
    );
  }

  function renderBookmarkButton(
    commentId: string,
  ) {
    const bookmarked =
      bookmarkState[
        commentId
      ] ?? false;

    if (
      !isAuthenticated
    ) {
      return (
        <Link
          href="/login"
          title="Sign in to bookmark this comment"
          aria-label="Bookmark comment"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-violet-100 bg-white text-slate-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-500"
        >
          <StarIcon
            active={false}
          />
        </Link>
      );
    }

    const isBusy =
      busyBookmarkCommentId ===
      commentId;

    return (
      <button
        type="button"
        onClick={() =>
          void handleToggleBookmark(
            commentId,
          )
        }
        disabled={
          Boolean(
            busyBookmarkCommentId,
          )
        }
        aria-pressed={
          bookmarked
        }
        aria-label={
          bookmarked
            ? "Remove bookmark"
            : "Bookmark comment"
        }
        title={
          bookmarked
            ? "Remove bookmark"
            : "Bookmark this comment"
        }
        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition disabled:cursor-not-allowed disabled:opacity-60 ${
          bookmarked
            ? "border-amber-200 bg-amber-50 text-amber-500"
            : "border-violet-100 bg-white text-slate-500 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-500"
        }`}
      >
        {isBusy ? (
          <span className="text-xs">
            …
          </span>
        ) : (
          <StarIcon
            active={
              bookmarked
            }
          />
        )}
      </button>
    );
  }

  function renderReportButton(
    commentId: string,
  ) {
    const reported =
      reportedCommentIds[
        commentId
      ] ?? false;

    if (
      !isAuthenticated
    ) {
      return (
        <Link
          href="/login"
          title="Sign in to report this comment"
          aria-label="Report comment"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-violet-100 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        >
          <FlagIcon />
        </Link>
      );
    }

    return (
      <button
        type="button"
        onClick={() =>
          setReportingCommentId(
            commentId,
          )
        }
        disabled={
          reported
        }
        aria-label={
          reported
            ? "Comment reported"
            : "Report comment"
        }
        title={
          reported
            ? "Report submitted"
            : "Report this comment"
        }
        className={`inline-flex h-9 items-center justify-center gap-2 rounded-xl border px-3 text-xs font-semibold transition ${
          reported
            ? "cursor-default border-red-100 bg-red-50 text-red-400"
            : "border-violet-100 bg-white text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        }`}
      >
        <FlagIcon />

        <span>
          {reported
            ? "Reported"
            : "Report"}
        </span>
      </button>
    );
  }

  /*
   * =========================================================
   * REPLY FORM
   * =========================================================
   */
  function renderReplyForm(
    comment: PublicComment,
  ) {
    if (
      replyingToCommentId !==
      comment.id
    ) {
      return null;
    }

    return (
      <form
        onSubmit={(
          event,
        ) =>
          void handleSubmitReply(
            event,
            comment.id,
          )
        }
        className="mt-4 rounded-2xl border border-violet-100 bg-violet-50/40 p-4"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-800">
            Reply to{" "}
            <span className="text-violet-700">
              {
                comment.author_name
              }
            </span>
          </p>

          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
            Posts instantly
          </span>
        </div>

        {comment.parent_id && (
          <p className="mt-1 text-xs text-slate-500">
            Your reply will mention
            this user automatically.
          </p>
        )}

        <textarea
          value={
            replyBody
          }
          onChange={(
            event,
          ) =>
            setReplyBody(
              event.target
                .value,
            )
          }
          rows={3}
          maxLength={2000}
          disabled={
            isSubmittingReply
          }
          placeholder="Write your reply..."
          className="mt-3 w-full resize-y rounded-xl border border-violet-100 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100 disabled:bg-slate-50"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            {
              replyBody.length
            }{" "}
            / 2000
          </p>

          <button
            type="submit"
            disabled={
              isSubmittingReply
            }
            className="inline-flex h-10 items-center justify-center rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmittingReply
              ? "Replying..."
              : "Post Reply"}
          </button>
        </div>

        {replyErrorMessage && (
          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">
              {
                replyErrorMessage
              }
            </p>
          </div>
        )}
      </form>
    );
  }

  return (
    <>
      <section className="border-t border-violet-100 bg-white">
        <div className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-6 lg:py-16">
          {/* Header */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-600">
              Community
            </p>

            <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Gallery Conversation
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Share your thoughts,
                  memories, and stories
                  about this Gallery
                  album with ICONIA.
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

          {/* Main Comment Form */}
          <div className="mt-8">
            {isAuthenticated ? (
              <form
                onSubmit={
                  handleSubmit
                }
                className="rounded-3xl border border-violet-100 bg-violet-50/30 p-5 sm:p-6"
              >
                <label
                  htmlFor="gallery-comment"
                  className="text-sm font-semibold text-slate-800"
                >
                  Leave a Comment
                </label>

                <textarea
                  id="gallery-comment"
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
                  maxLength={2000}
                  disabled={
                    isSubmitting
                  }
                  placeholder="Share a memory or thought about this Gallery album..."
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

          {interactionErrorMessage && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-700">
                {
                  interactionErrorMessage
                }
              </p>
            </div>
          )}

          {/* Comments */}
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
                  to share a memory
                  about this Gallery.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {topLevelComments.map(
                  (comment) => {
                    const replies =
                      getFlatReplies(
                        comment.id,
                      );

                    return (
                      <article
                        key={
                          comment.id
                        }
                        id={`comment-${comment.id}`}
                        className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm sm:p-6"
                      >
                        {/* Main Comment */}
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <CommentAvatar
                              name={
                                comment.author_name
                              }
                              avatarUrl={
                                comment.avatar_url
                              }
                            />

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-bold text-slate-900">
                                  {
                                    comment.author_name
                                  }
                                </p>

                                <AccountBadge
                                  badge={resolveAccountBadge(
                                    comment.account_badge,
                                  )}
                                  className="px-2 py-0.5 text-[10px] uppercase tracking-wider"
                                />
                              </div>

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

                          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-violet-50 pt-3">
                            {renderLikeButton(
                              comment.id,
                            )}

                            {renderReplyButton(
                              comment,
                            )}

                            {renderBookmarkButton(
                              comment.id,
                            )}

                            {renderReportButton(
                              comment.id,
                            )}
                          </div>

                          {renderReplyForm(
                            comment,
                          )}
                        </div>

                        {/* Flat Replies */}
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
                                  id={`comment-${reply.id}`}
                                  className="rounded-2xl bg-violet-50/60 p-4"
                                >
                                  <div className="flex flex-wrap items-center gap-2">
                                    <CommentAvatar
                                      name={
                                        reply.author_name
                                      }
                                      avatarUrl={
                                        reply.avatar_url
                                      }
                                      size="small"
                                    />

                                    <div>
                                      <div className="flex flex-wrap items-center gap-2">
                                        <p className="text-sm font-bold text-slate-900">
                                          {
                                            reply.author_name
                                          }
                                        </p>

                                        <AccountBadge
                                          badge={resolveAccountBadge(
                                            reply.account_badge,
                                          )}
                                          className="px-2 py-0.5 text-[10px] uppercase tracking-wider"
                                        />
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

                                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-violet-100 pt-3">
                                    {renderLikeButton(
                                      reply.id,
                                    )}

                                    {renderReplyButton(
                                      reply,
                                    )}

                                    {renderBookmarkButton(
                                      reply.id,
                                    )}

                                    {renderReportButton(
                                      reply.id,
                                    )}
                                  </div>

                                  {renderReplyForm(
                                    reply,
                                  )}
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

      {reportingCommentId && (
        <CommentReportModal
          commentId={
            reportingCommentId
          }
          onClose={() =>
            setReportingCommentId(
              null,
            )
          }
          onReported={() =>
            setReportedCommentIds(
              (current) => ({
                ...current,

                [reportingCommentId]:
                  true,
              }),
            )
          }
        />
      )}
    </>
  );
}