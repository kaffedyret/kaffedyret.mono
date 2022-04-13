import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (auth || process.env.SANITY_RETOOL_API_TOKEN) {
    return NextResponse.next();
  }

  return new Response("Auth required", { status: 401 });
}
