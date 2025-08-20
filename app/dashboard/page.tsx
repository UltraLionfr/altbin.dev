"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Header from "@/components/dashboard/Header";
import LoadingDashboard from "@/components/dashboard/LoadingDashboard";
import Pagination from "@/components/dashboard/Pagination";
import PasteCard from "@/components/dashboard/PasteCard";
import SearchBar from "@/components/dashboard/SearchBar";
import Sidebar from "@/components/dashboard/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";

import { formatBytes } from "@/lib/format-bytes";

const PER_PAGE = 6;

const dashboardIcons = {
  clipboard: "https://cdn.lordicon.com/gvtjlyjf.json",
  views: "https://cdn.lordicon.com/dicvhxpz.json",
  calendar: "https://cdn.lordicon.com/uphbloed.json",
  code: "https://cdn.lordicon.com/xqdfobxg.json",
  storage: "https://cdn.lordicon.com/kikjlzqr.json",
  chart: "https://cdn.lordicon.com/abwrkdvl.json",
  flame: "https://cdn.lordicon.com/thtrcqvk.json",
  file: "https://cdn.lordicon.com/fikcyfpp.json",
  paste: "https://cdn.lordicon.com/hmpomorl.json",
};

// ---- Types ----
interface DashboardStats {
  totalPastes: number;
  totalViews: number;
  recentPastes: number;
  apiUsage: number;
  storageUsed: number;
  avgViews: number;
  mostViewed: number;
  avgSize: number;
}

interface Paste {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  views: number;
  maxViews: number | null;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [pastes, setPastes] = useState<Paste[]>([]);
  const [page, setPage] = useState(1);
  const [totalPastes, setTotalPastes] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/paste?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setPastes((prev) => prev.filter((p) => p.id !== id));
      setTotalPastes((prev) => prev - 1);
      toast.success("Paste deleted successfully 🚀");
    } else {
      toast.error("Failed to delete paste ❌");
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchStats = async () => {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data: DashboardStats = await res.json();
          setStats(data);
        }
      };

      const fetchPastes = async () => {
        const res = await fetch(
          `/api/user-pastes?page=${page}&perPage=${PER_PAGE}&q=${encodeURIComponent(searchTerm)}`
        );
        if (!res.ok) {
          setPastes([]);
          return;
        }
        try {
          const data: { pastes: Paste[]; total: number } = await res.json();
          setPastes(data.pastes ?? []);
          setTotalPastes(data.total ?? 0);
        } catch {
          setPastes([]);
          setTotalPastes(0);
        }
      };

      fetchStats();
      fetchPastes();
    }
  }, [status, page, searchTerm]);

  if (status === "loading" || !stats) return <LoadingDashboard />;

  const totalPages = Math.ceil(totalPastes / PER_PAGE);

  return (
    <div className="flex h-screen bg-[#0d1117]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <Header user={session?.user?.name ?? "User"} />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Pastes", value: stats.totalPastes, icon: dashboardIcons.clipboard },
            { label: "Total Views", value: stats.totalViews, icon: dashboardIcons.views },
            { label: "Last 30 Days", value: stats.recentPastes, icon: dashboardIcons.calendar },
            { label: "API Usage", value: stats.apiUsage, icon: dashboardIcons.code },
            { label: "Storage Used", value: formatBytes(stats.storageUsed), icon: dashboardIcons.storage },
            { label: "Avg Views", value: stats.avgViews, icon: dashboardIcons.chart },
            { label: "Most Viewed", value: stats.mostViewed, icon: dashboardIcons.flame },
            { label: "Avg Paste Size", value: formatBytes(stats.avgSize), icon: dashboardIcons.file },
          ].map((stat, i) => (
            <StatCard key={i} label={stat.label} value={stat.value} icon={stat.icon} />
          ))}
        </div>

        <SearchBar
          value={searchTerm}
          onChange={(v) => {
            setSearchTerm(v);
            setPage(1);
          }}
        />

        {/* Pastes */}
        <h2 className="text-lg font-semibold text-white mb-4">Your Pastes</h2>
        {pastes.length === 0 ? (
          <div className="text-sm text-neutral-400">No pastes found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastes.map((paste) => (
              <PasteCard
                key={paste.id}
                paste={paste}
                onDelete={setDeleteId}
                pasteIconUrl={dashboardIcons.paste}
              />
            ))}
          </div>
        )}

        <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />

        <ConfirmDeleteModal
          open={!!deleteId}
          onOpenChange={(open) => !open && setDeleteId(null)}
          onConfirm={() => {
            if (deleteId) {
              handleDelete(deleteId);
              setDeleteId(null);
            }
          }}
        />
      </main>
    </div>
  );
}