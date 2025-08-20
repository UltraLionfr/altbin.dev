import { authOptions } from '@/lib/auth';
import { getDashboardStats } from '@/lib/stats';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  const stats = await getDashboardStats(session?.user?.id);
  return NextResponse.json(stats);
}
