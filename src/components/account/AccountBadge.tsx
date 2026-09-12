export type AccountBadgeType =
  | "member"
  | "representative"
  | "moderator"
  | "editor"
  | "admin"
  | "super_admin";

type AccountBadgeProps = {
  badge?: AccountBadgeType | null;
  className?: string;
};

const badgeConfig: Record<
  AccountBadgeType,
  {
    label: string;
    classes: string;
  }
> = {
  member: {
    label: "ICONIA Member",
    classes:
      "border-violet-200 bg-violet-50 text-violet-700",
  },

  representative: {
    label: "ICONIA Representative",
    classes:
      "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
  },

  moderator: {
    label: "Moderator",
    classes:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  editor: {
    label: "Editor",
    classes:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  admin: {
    label: "Admin",
    classes:
      "border-purple-200 bg-purple-50 text-purple-700",
  },

  super_admin: {
    label: "Super Admin",
    classes:
      "border-purple-300 bg-purple-100 text-purple-800",
  },
};

export default function AccountBadge({
  badge = "member",
  className = "",
}: AccountBadgeProps) {
  const resolvedBadge =
    badge &&
    badge in badgeConfig
      ? badge
      : "member";

  const config =
    badgeConfig[resolvedBadge];

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold leading-none tracking-wide",
        config.classes,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {config.label}
    </span>
  );
}