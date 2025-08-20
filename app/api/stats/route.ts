import { getDashboardStats } from '@/lib/stats';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  const stats = await getDashboardStats(session?.user?.id);
  return NextResponse.json(stats);
}
