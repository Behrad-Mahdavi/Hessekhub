// apps/web/src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret") || (await request.json().catch(() => ({}))).secret;
  const expectedSecret = process.env.REVALIDATE_WEBHOOK_SECRET || "hessekhub-revalidate-secret-token";

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: "توکن اعتبارسنجی نامعتبر است." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const tag = body.tag || request.nextUrl.searchParams.get("tag");
  const path = body.path || request.nextUrl.searchParams.get("path");

  if (tag) {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  }

  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path, now: Date.now() });
  }

  return NextResponse.json({ message: "تگ یا مسیر الزامی است." }, { status: 400 });
}

