import { prisma } from "@/lib/prisma";

export async function getDashboardStats(userId?: string) {
  const where = userId ? { createdBy: userId } : undefined;

  const [totalPastes, totalViews, recentPastes, apiUsage, storageUsed, avgViews, mostViewed, avgSize] =
    await Promise.all([
      prisma.paste.count({ where }),
      prisma.paste.aggregate({ _sum: { views: true }, where }),
      prisma.paste.count({
        where: {
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          ...(userId ? { createdBy: userId } : {}),
        },
      }),
      prisma.paste.count({ where: { createdBy: { not: null } } }),
      prisma.paste.aggregate({ _sum: { size: true }, where }),
      prisma.paste.aggregate({ _avg: { views: true }, where }),
      prisma.paste.findFirst({
        orderBy: { views: "desc" },
        select: { views: true },
        where,
      }),
      prisma.paste.aggregate({ _avg: { size: true }, where }),
    ]);

  return {
    totalPastes,
    totalViews: totalViews._sum.views || 0,
    recentPastes,
    apiUsage,
    storageUsed: storageUsed._sum.size || 0,
    avgViews: Number(avgViews._avg.views?.toFixed(1)) || 0,
    mostViewed: mostViewed?.views || 0,
    avgSize: avgSize._avg.size || 0,
  };
}

export async function getUserPastes(userId: string) {
  return prisma.paste.findMany({
    where: { createdBy: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      createdAt: true,
      views: true,
      title: true,
      content: true,
    },
  });
}
