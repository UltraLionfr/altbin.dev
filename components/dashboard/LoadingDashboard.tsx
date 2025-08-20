"use client";

export default function LoadingDashboard() {
  const StatSkeleton = () => (
    <div className="rounded-2xl bg-[#11131c] p-5 border border-white/10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  const PasteSkeleton = () => (
    <div className="rounded-xl border border-white/10 bg-[#11131c] p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-7 h-7 rounded-lg bg-white/10 animate-pulse" />
        <div className="h-4 w-40 bg-white/10 rounded animate-pulse" />
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
        <div className="h-3 w-5/6 bg-white/10 rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-white/10 rounded animate-pulse" />
      </div>
      <div className="flex justify-between items-center mt-auto">
        <div className="h-3 w-28 bg-white/10 rounded animate-pulse" />
        <div className="h-5 w-16 bg-white/10 rounded-full animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0d1117]">
      {/* Sidebar skeleton */}
      <aside className="hidden md:flex flex-col w-64 bg-[#11131c] border-r border-white/10 p-6">
        <div className="h-6 w-40 bg-white/10 rounded mb-8 animate-pulse" />
        <div className="space-y-4">
          <div className="h-4 w-28 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
        </div>
        <div className="mt-auto h-9 w-28 bg-white/10 rounded animate-pulse" />
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header skeleton + spinner */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-7 w-80 bg-white/10 rounded animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-transparent animate-spin" />
            <span className="text-white/70 text-sm">Loading dashboard...</span>
          </div>
        </div>

        {/* Stat cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <StatSkeleton key={i} />
          ))}
        </div>

        {/* Search skeleton */}
        <div className="relative w-full md:w-1/3 mb-8">
          <div className="h-10 w-full rounded-xl bg-white/10 animate-pulse" />
        </div>

        {/* Pastes skeleton grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <PasteSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}