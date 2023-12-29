import { NextResponse } from "next/server";
import { protectedRoutes } from "./app/core/routes";
import { cookies } from "next/headers";
export function middleware(request) {

  const currentUser = cookies().get("user-auth")?.value;
  const currentPath = protectedRoutes.find(f => request.nextUrl.pathname.startsWith(f))

  if (currentPath && !currentUser) {
    request.cookies.delete('user-auth');
    const NextPage = NextResponse.redirect(new URL("/login", request.url));
    NextPage.cookies.delete('user-auth');
    return NextPage;
  }

  return NextResponse.next()
}