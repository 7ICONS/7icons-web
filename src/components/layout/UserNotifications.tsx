"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

type UserNotificationType =
  | "comment_like"
  | "comment_reply";

type NotificationTargetType =
  | "article"
  | "gallery";

type UserNotification = {
  notification_id: string;
  type: UserNotificationType;
  comment_id: string;
  actor_user_id: string;
  actor_name: string;
  actor_avatar_url: string | null;
  like_count: number | string | null;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  target_type: NotificationTargetType | null;
  target_id: string | null;
  article_slug: string | null;
};

type UserNotificationsProps = {
  userId: string;
  variant?: "desktop" | "mobile";
};

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
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

function ArrowIcon() {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function formatRelativeTime(
  dateString: string,
) {
  const date =
    new Date(dateString);

  const now =
    new Date();

  const seconds =
    Math.max(
      0,
      Math.floor(
        (now.getTime() -
          date.getTime()) /
          1000,
      ),
    );

  if (seconds < 60) {
    return "Just now";
  }

  const minutes =
    Math.floor(
      seconds / 60,
    );

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours =
    Math.floor(
      minutes / 60,
    );

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days =
    Math.floor(
      hours / 24,
    );

  if (days < 7) {
    return `${days}d ago`;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}

function NotificationAvatar({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl: string | null;
}) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-700 to-purple-500 text-sm font-bold text-white">
      {name
        .charAt(0)
        .toUpperCase()}
    </div>
  );
}

function getNotificationMessage(
  notification: UserNotification,
) {
  if (
    notification.type ===
    "comment_reply"
  ) {
    return (
      <>
        <span className="font-semibold text-slate-900">
          {
            notification.actor_name
          }
        </span>{" "}
        replied to your comment
      </>
    );
  }

  const likeCount =
    Number(
      notification.like_count ??
        0,
    );

  if (likeCount <= 1) {
    return (
      <>
        <span className="font-semibold text-slate-900">
          {
            notification.actor_name
          }
        </span>{" "}
        liked your comment
      </>
    );
  }

  const others =
    likeCount - 1;

  return (
    <>
      <span className="font-semibold text-slate-900">
        {
          notification.actor_name
        }
      </span>{" "}
      and{" "}
      <span className="font-semibold text-slate-900">
        {others}{" "}
        {others === 1
          ? "other"
          : "others"}
      </span>{" "}
      liked your comment
    </>
  );
}

function getNotificationHref(
  notification: UserNotification,
) {
  /*
   * =========================================================
   * ARTICLE
   * =========================================================
   */
  if (
    notification.target_type ===
      "article" &&
    notification.article_slug
  ) {
    return `/blog/${notification.article_slug}#comment-${notification.comment_id}`;
  }

  /*
   * =========================================================
   * GALLERY
   * =========================================================
   *
   * Gallery menggunakan single public route.
   * Album + comment dibuka melalui query.
   */
  if (
    notification.target_type ===
      "gallery" &&
    notification.target_id
  ) {
    const albumId =
      encodeURIComponent(
        notification.target_id,
      );

    const commentId =
      encodeURIComponent(
        notification.comment_id,
      );

    return `/gallery?album=${albumId}&comment=${commentId}`;
  }

  return null;
}

export default function UserNotifications({
  userId,
  variant = "desktop",
}: UserNotificationsProps) {
  const router =
    useRouter();

  const supabase =
    useMemo(
      () => createClient(),
      [],
    );

  const [
    notifications,
    setNotifications,
  ] = useState<
    UserNotification[]
  >([]);

  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    busyNotificationId,
    setBusyNotificationId,
  ] = useState<
    string | null
  >(null);

  const [
    isMarkingAll,
    setIsMarkingAll,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const loadNotifications =
    useCallback(
      async (
        showLoading = false,
      ) => {
        if (!userId) {
          setNotifications(
            [],
          );

          setIsLoading(
            false,
          );

          return;
        }

        if (showLoading) {
          setIsLoading(
            true,
          );
        }

        const {
          data,
          error,
        } =
          await supabase.rpc(
            "get_user_notifications",
            {
              p_limit: 20,
            },
          );

        if (error) {
          console.error(
            "Unable to load user notifications:",
            error,
          );

          setErrorMessage(
            "Unable to load notifications.",
          );

          setIsLoading(
            false,
          );

          return;
        }

        setNotifications(
          (data ??
            []) as UserNotification[],
        );

        setErrorMessage("");
        setIsLoading(false);
      },
      [
        supabase,
        userId,
      ],
    );

  /*
   * =========================================================
   * INITIAL LOAD + POLLING
   * =========================================================
   */
  useEffect(() => {
    void loadNotifications(
      true,
    );

    const interval =
      window.setInterval(
        () => {
          void loadNotifications();
        },
        30000,
      );

    return () => {
      window.clearInterval(
        interval,
      );
    };
  }, [
    loadNotifications,
  ]);

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.is_read,
    ).length;

  /*
   * =========================================================
   * OPEN ONE NOTIFICATION
   * =========================================================
   *
   * 1. Mark as read.
   * 2. Update badge immediately.
   * 3. Navigate to the exact comment.
   */
  async function handleNotificationClick(
    notification: UserNotification,
  ) {
    if (
      busyNotificationId
    ) {
      return;
    }

    const href =
      getNotificationHref(
        notification,
      );

    setBusyNotificationId(
      notification.notification_id,
    );

    try {
      if (
        !notification.is_read
      ) {
        const {
          error,
        } =
          await supabase.rpc(
            "mark_user_notification_read",
            {
              p_notification_id:
                notification.notification_id,
            },
          );

        if (error) {
          throw new Error(
            error.message,
          );
        }

        setNotifications(
          (current) =>
            current.map(
              (item) =>
                item.notification_id ===
                notification.notification_id
                  ? {
                      ...item,
                      is_read: true,
                    }
                  : item,
            ),
        );
      }

      /*
       * Close notification UI before
       * moving to the destination.
       */
      setIsOpen(false);

      if (href) {
        router.push(
          href,
        );
      }
    } catch (error) {
      console.error(
        "Unable to open notification:",
        error,
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to open notification.",
      );
    } finally {
      setBusyNotificationId(
        null,
      );
    }
  }

  /*
   * =========================================================
   * MARK ALL READ
   * =========================================================
   */
  async function handleMarkAllRead() {
    if (
      unreadCount === 0 ||
      isMarkingAll
    ) {
      return;
    }

    setIsMarkingAll(true);
    setErrorMessage("");

    try {
      const {
        error,
      } =
        await supabase.rpc(
          "mark_all_user_notifications_read",
        );

      if (error) {
        throw new Error(
          error.message,
        );
      }

      setNotifications(
        (current) =>
          current.map(
            (notification) => ({
              ...notification,
              is_read: true,
            }),
          ),
      );
    } catch (error) {
      console.error(
        "Unable to mark all notifications as read:",
        error,
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update notifications.",
      );
    } finally {
      setIsMarkingAll(
        false,
      );
    }
  }

  /*
   * =========================================================
   * NOTIFICATION LIST
   * =========================================================
   */
  function renderNotificationList() {
    if (isLoading) {
      return (
        <div className="px-5 py-8 text-center">
          <p className="text-sm font-medium text-slate-500">
            Loading
            notifications...
          </p>
        </div>
      );
    }

    if (
      notifications.length ===
      0
    ) {
      return (
        <div className="px-5 py-10 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-500">
            <BellIcon />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-700">
            You&apos;re all
            caught up
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            New likes and replies
            will appear here.
          </p>
        </div>
      );
    }

    return (
      <div className="max-h-[420px] overflow-y-auto [scrollbar-width:thin]">
        {notifications.map(
          (notification) => {
            const isBusy =
              busyNotificationId ===
              notification.notification_id;

            const hasDestination =
              Boolean(
                getNotificationHref(
                  notification,
                ),
              );

            return (
              <button
                key={
                  notification.notification_id
                }
                type="button"
                onClick={() =>
                  void handleNotificationClick(
                    notification,
                  )
                }
                disabled={
                  Boolean(
                    busyNotificationId,
                  )
                }
                className={`group flex w-full items-start gap-3 border-b border-violet-50 px-4 py-4 text-left transition last:border-b-0 disabled:cursor-wait ${
                  notification.is_read
                    ? "bg-white hover:bg-violet-50/40"
                    : "bg-violet-50/60 hover:bg-violet-50"
                }`}
              >
                <NotificationAvatar
                  name={
                    notification.actor_name
                  }
                  avatarUrl={
                    notification.actor_avatar_url
                  }
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <div
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
                        notification.type ===
                        "comment_like"
                          ? "bg-pink-50 text-pink-500"
                          : "bg-violet-50 text-violet-600"
                      }`}
                    >
                      {notification.type ===
                      "comment_like" ? (
                        <HeartIcon />
                      ) : (
                        <ReplyIcon />
                      )}
                    </div>

                    <p className="min-w-0 flex-1 text-xs leading-5 text-slate-600">
                      {getNotificationMessage(
                        notification,
                      )}
                    </p>

                    {!notification.is_read && (
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-600"
                        aria-label="Unread"
                      />
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-3 pl-8">
                    <p className="text-[11px] text-slate-400">
                      {formatRelativeTime(
                        notification.updated_at ||
                          notification.created_at,
                      )}
                    </p>

                    {hasDestination && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-violet-500 opacity-70 transition group-hover:text-violet-700 group-hover:opacity-100">
                        {isBusy
                          ? "Opening..."
                          : "View"}

                        {!isBusy && (
                          <ArrowIcon />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          },
        )}
      </div>
    );
  }

  /*
   * =========================================================
   * MOBILE
   * =========================================================
   */
  if (
    variant === "mobile"
  ) {
    return (
      <div className="border-t border-violet-100">
        <button
          type="button"
          onClick={() =>
            setIsOpen(
              (current) =>
                !current,
            )
          }
          aria-expanded={
            isOpen
          }
          className="flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:text-violet-700"
        >
          <span className="flex items-center gap-2">
            <span className="relative inline-flex">
              <BellIcon />

              {unreadCount >
                0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[9px] font-bold text-white">
                  {unreadCount >
                  9
                    ? "9+"
                    : unreadCount}
                </span>
              )}
            </span>

            Notifications
          </span>

          <span
            className={`text-xs text-slate-400 transition ${
              isOpen
                ? "rotate-180"
                : ""
            }`}
          >
            ▼
          </span>
        </button>

        {isOpen && (
          <div className="mb-3 overflow-hidden rounded-2xl border border-violet-100 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-violet-100 px-4 py-3">
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Notifications
                </p>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  {unreadCount >
                  0
                    ? `${unreadCount} unread`
                    : "You're all caught up"}
                </p>
              </div>

              {unreadCount >
                0 && (
                <button
                  type="button"
                  onClick={() =>
                    void handleMarkAllRead()
                  }
                  disabled={
                    isMarkingAll
                  }
                  className="text-[11px] font-semibold text-violet-600 transition hover:text-violet-800 disabled:opacity-50"
                >
                  {isMarkingAll
                    ? "Updating..."
                    : "Mark all read"}
                </button>
              )}
            </div>

            {errorMessage && (
              <div className="border-b border-red-100 bg-red-50 px-4 py-3">
                <p className="text-xs font-medium text-red-600">
                  {
                    errorMessage
                  }
                </p>
              </div>
            )}

            {renderNotificationList()}
          </div>
        )}
      </div>
    );
  }

  /*
   * =========================================================
   * DESKTOP
   * =========================================================
   */
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() =>
          setIsOpen(
            (current) =>
              !current,
          )
        }
        aria-label="Notifications"
        aria-expanded={
          isOpen
        }
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition ${
          isOpen
            ? "bg-violet-50 text-violet-700"
            : "text-slate-500 hover:bg-violet-50 hover:text-violet-700"
        }`}
      >
        <BellIcon />

        {unreadCount >
          0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-violet-600 px-1 text-[9px] font-bold leading-none text-white">
            {unreadCount >
            9
              ? "9+"
              : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+12px)] z-[90] w-[360px] overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-2xl shadow-violet-950/10">
          <div className="flex items-center justify-between gap-4 border-b border-violet-100 px-5 py-4">
            <div>
              <p className="text-sm font-bold text-slate-900">
                Notifications
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                {unreadCount >
                0
                  ? `${unreadCount} unread`
                  : "You're all caught up"}
              </p>
            </div>

            {unreadCount >
              0 && (
              <button
                type="button"
                onClick={() =>
                  void handleMarkAllRead()
                }
                disabled={
                  isMarkingAll
                }
                className="text-xs font-semibold text-violet-600 transition hover:text-violet-800 disabled:opacity-50"
              >
                {isMarkingAll
                  ? "Updating..."
                  : "Mark all read"}
              </button>
            )}
          </div>

          {errorMessage && (
            <div className="border-b border-red-100 bg-red-50 px-5 py-3">
              <p className="text-xs font-medium text-red-600">
                {
                  errorMessage
                }
              </p>
            </div>
          )}

          {renderNotificationList()}
        </div>
      )}
    </div>
  );
}