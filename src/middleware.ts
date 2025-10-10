import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = ["/dashboard/change-password"];
const roleBasedPrivateRoutes = {
  CUSTOMER: [/^\/dashboard\/customer/],
  ADMIN: [/^\/dashboard\/admin/],
  DRIVER: [/^\/dashboard\/driver/],
};

const additionalPrivateMatchers = [/^\/rides$/, /^\/checkout(\/.*)?$/];


export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  const isAdditionalPrivatePage = additionalPrivateMatchers.some((regex) =>
    regex.test(pathname)
  );

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    if (isAdditionalPrivatePage || pathname.startsWith("/dashboard")) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname + (search || ""));
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  let decodedData = null;
  try {
    decodedData = jwtDecode(accessToken) as any;
  } catch (error) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  const rawRole = decodedData?.role as string | undefined;
  const roleKey = rawRole
    ? rawRole.toUpperCase() === "USER"
      ? "CUSTOMER"
      : rawRole.toUpperCase()
    : undefined;

  const redirectParam = request.nextUrl.searchParams.get("redirect");
  if (redirectParam) {
    return NextResponse.redirect(new URL(redirectParam, request.url));
  }

  if (AuthRoutes.includes(pathname)) {
    if (roleKey) {
      const target =
        roleKey === "ADMIN"
          ? "/dashboard/admin"
          : roleKey === "CUSTOMER"
          ? "/dashboard/customer"
          : "/dashboard/driver";
      return NextResponse.redirect(new URL(target, request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (isAdditionalPrivatePage) {
    return NextResponse.next();
  }

  if (pathname === "/dashboard") {
    if (roleKey) {
      const target =
        roleKey === "ADMIN"
          ? "/dashboard/admin"
          : roleKey === "CUSTOMER"
          ? "/dashboard/customer"
          : "/dashboard/driver";
      return NextResponse.redirect(new URL(target, request.url));
    }
  }

  if (roleKey && roleBasedPrivateRoutes[roleKey as Role]) {
    const routes = roleBasedPrivateRoutes[roleKey as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  if (pathname.startsWith("/dashboard") && roleKey) {
    const target =
      roleKey === "ADMIN"
        ? "/dashboard/admin"
        : roleKey === "CUSTOMER"
        ? "/dashboard/customer"
        : "/dashboard/driver";
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/rides",
    "/checkout",
    "/checkout/:path*",
  ],
};
