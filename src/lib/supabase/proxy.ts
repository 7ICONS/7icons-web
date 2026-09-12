import { createServerClient } from "@supabase/ssr";
import {
  NextResponse,
  type NextRequest,
} from "next/server";

type AccountStatus =
  | "active"
  | "suspended"
  | "banned";

const suspendedBlockedPaths = [
  "/profile/edit",
];

function isBlockedForSuspended(
  pathname: string,
) {
  return suspendedBlockedPaths.some(
    (path) =>
      pathname === path ||
      pathname.startsWith(`${path}/`),
  );
}

function copyResponseCookies(
  source: NextResponse,
  target: NextResponse,
) {
  source.cookies
    .getAll()
    .forEach((cookie) => {
      target.cookies.set(cookie);
    });

  return target;
}

export async function updateSession(
  request: NextRequest,
) {
  let supabaseResponse =
    NextResponse.next({
      request,
    });

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseKey =
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables. Check .env.local.",
    );
  }

  const supabase =
    createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },

          setAll(cookiesToSet) {
            cookiesToSet.forEach(
              ({ name, value }) => {
                request.cookies.set(
                  name,
                  value,
                );
              },
            );

            supabaseResponse =
              NextResponse.next({
                request,
              });

            cookiesToSet.forEach(
              ({
                name,
                value,
                options,
              }) => {
                supabaseResponse.cookies.set(
                  name,
                  value,
                  options,
                );
              },
            );
          },
        },
      },
    );

  /*
   * =========================================================
   * VALIDATE / REFRESH AUTH SESSION
   * =========================================================
   */
  const {
    data: claimsData,
  } =
    await supabase.auth.getClaims();

  const userId =
    claimsData?.claims?.sub;

  /*
   * Tidak login.
   */
  if (!userId) {
    return supabaseResponse;
  }

  /*
   * =========================================================
   * LOAD ACCOUNT STATUS
   * =========================================================
   */
  const {
    data: account,
    error: accountError,
  } = await supabase
    .from("user_profiles")
    .select("status")
    .eq("id", userId)
    .maybeSingle();

  if (accountError) {
    console.error(
      "Unable to verify account status:",
      accountError,
    );

    return supabaseResponse;
  }

  const status =
    account?.status as
      | AccountStatus
      | undefined;

  const pathname =
    request.nextUrl.pathname;

  /*
   * =========================================================
   * BANNED
   *
   * Banned user:
   * - session dihapus
   * - diarahkan ke account-restricted
   * =========================================================
   */
  if (status === "banned") {
    await supabase.auth.signOut();

    /*
     * Jika sudah berada di halaman restricted,
     * cukup kirim response yang berisi cookie
     * sign-out agar tidak terjadi redirect loop.
     */
    if (
      pathname ===
      "/account-restricted"
    ) {
      return supabaseResponse;
    }

    const url =
      request.nextUrl.clone();

    url.pathname =
      "/account-restricted";

    url.searchParams.set(
      "status",
      "banned",
    );

    const redirectResponse =
      NextResponse.redirect(url);

    return copyResponseCookies(
      supabaseResponse,
      redirectResponse,
    );
  }

  /*
   * =========================================================
   * SUSPENDED
   *
   * Suspended user masih boleh:
   * - login
   * - browse website
   * - view profile
   *
   * Tetapi tidak boleh membuka area perubahan akun.
   * =========================================================
   */
  if (
    status === "suspended" &&
    isBlockedForSuspended(pathname)
  ) {
    const url =
      request.nextUrl.clone();

    url.pathname =
      "/account-restricted";

    url.searchParams.set(
      "status",
      "suspended",
    );

    const redirectResponse =
      NextResponse.redirect(url);

    return copyResponseCookies(
      supabaseResponse,
      redirectResponse,
    );
  }

  return supabaseResponse;
}