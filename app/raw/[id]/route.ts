import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const paste = await prisma.paste.findUnique({ where: { id } });
  if (!paste) {
    return new NextResponse("Paste not found", { status: 404 });
  }

  return new NextResponse(paste.content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}