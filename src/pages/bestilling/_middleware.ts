import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const session_id = req.nextUrl.searchParams.get("session_id");

  if (!session_id) {
    return NextResponse.redirect("/feil");
  }

  return NextResponse.next();
}
