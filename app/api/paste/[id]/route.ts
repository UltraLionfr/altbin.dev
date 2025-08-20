import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const pasteId = params.id;

  const { password = '' } = await request.json();

  if (!pasteId) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const paste = await prisma.paste.findUnique({ where: { id: pasteId } });
  if (!paste) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    await prisma.paste.delete({ where: { id: paste.id } });
    return NextResponse.json({ error: 'Max views exceeded' }, { status: 404 });
  }

  if (paste.password) {
    const valid = await bcrypt.compare(password, paste.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 403 });
    }
  }

  const updated = await prisma.paste.update({
    where: { id: paste.id },
    data: { views: { increment: 1 } },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      views: true,
      maxViews: true,
      password: true,
    },
  });

  const payload = {
    id: updated.id,
    title: updated.title,
    content: updated.content,
    createdAt: updated.createdAt,
    views: updated.views,
    protected: !!updated.password,
  };

  if (updated.maxViews !== null && updated.views >= updated.maxViews) {
    prisma.paste.delete({ where: { id: updated.id } }).catch(() => {});
  }

  return NextResponse.json(payload, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
