import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 7);

export async function POST(req: Request) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  let hashedPassword = null;
  if (body.password) {
    hashedPassword = await bcrypt.hash(body.password, 10);
  }

  const paste = await prisma.paste.create({
    data: {
      id: nanoid(),
      title: body.title || null,
      content: body.content,
      password: hashedPassword,
      maxViews: body.maxViews ? parseInt(body.maxViews, 10) : null,
      createdBy: session?.user?.id ?? null,
      size: Buffer.byteLength(body.content, 'utf8'),
    },
  });

  return NextResponse.json(paste);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const paste = await prisma.paste.findUnique({ where: { id } });

    if (!paste || paste.createdBy !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.paste.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
