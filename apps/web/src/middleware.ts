// apps/web/src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";

// Static fast cache of known legacy 301 redirects
const LEGACY_REDIRECTS: Record<string, string> = {
  "/diet-mashhad": "/programs/weight-loss",
  "/healthy-catering": "/programs/executive-workday",
  "/hessekhub-cafe": "/cafe",
  "/cafe-menu": "/cafe/menu",
  "/calculate-calorie": "/tools/calorie-calculator",
  "/register": "/start",
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check known redirect rules
  const target = LEGACY_REDIRECTS[pathname];
  if (target) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|fonts|favicon.ico|robots.txt|sitemap.xml|llms.txt|llms-full.txt).*)",
  ],
};

