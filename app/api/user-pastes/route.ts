import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import * as Prisma from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json([], { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('perPage') || '10', 10);
  const skip = (page - 1) * perPage;

  const search = searchParams.get('q') || '';

  const filter = {
    createdBy: session.user.id,
    ...(search
      ? {
          title: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {}),
  };

  const [pastes, total] = await Promise.all([
    prisma.paste.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
      skip,
      take: perPage,
    }),
    prisma.paste.count({
      where: filter,
    }),
  ]);

  return NextResponse.json({ pastes, total });
}