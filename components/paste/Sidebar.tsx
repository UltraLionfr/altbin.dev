'use client';

import type { Paste } from "@/types/paste";
import { CalendarDays, Copy, Download, Eye, FileText, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PasteSidebar({ paste, id }: { paste: Paste; id: string }) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  return (
    <div className="absolute top-4 right-4 w-[300px] rounded-2xl p-5 text-sm backdrop-blur-xl shadow-2xl bg-[linear-gradient(to_bottom_right,#1a2035,#101522)] ring-1 ring-white/10 mr-4">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">
            Alt<span className="text-blue-400">Bin</span>
          </h2>
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold bg-green-600 text-white shadow-sm hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60"
          >
            <Plus size={14} /> CREATE
          </button>
        </div>
        {paste.title && (
          <h1 className="text-sm font-semibold text-blue-300 truncate mt-1" title={paste.title}>
            {paste.title}
          </h1>
        )}
      </div>

      {/* Infos */}
      <div className="grid grid-cols-2 gap-3 text-neutral-300">
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 bg-[#151b2e] ring-1 ring-white/15">
          <Eye size={16} />
          <div className="leading-tight">
            <div className="text-xs text-neutral-400">Views</div>
            <div className="text-sm font-medium text-white">{paste.views}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 bg-[#151b2e] ring-1 ring-white/15">
          <CalendarDays size={16} />
          <div className="leading-tight">
            <div className="text-xs text-neutral-400">Created</div>
            <div className="text-sm font-medium text-white">
              {new Date(paste.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/10 my-4" />

      {/* Actions */}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(paste.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          title="Copy"
          className="cursor-pointer inline-flex items-center justify-center rounded-lg p-2 bg-[#151b2e] ring-1 ring-white/10 hover:bg-[#1e253d] hover:ring-blue-400/30"
        >
          <Copy size={18} />
        </button>
        <button
          onClick={() => window.open(`/raw/${id}`, "_blank")}
          title="Raw"
          className="cursor-pointer inline-flex items-center justify-center rounded-lg p-2 bg-[#151b2e] ring-1 ring-white/10 hover:bg-[#1e253d] hover:ring-blue-400/30"
        >
          <FileText size={18} />
        </button>
        <button
          onClick={() => {
            const blob = new Blob([paste.content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${id}.txt`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          title="Download"
          className="cursor-pointer inline-flex items-center justify-center rounded-lg p-2 bg-[#151b2e] ring-1 ring-white/10 hover:bg-[#1e253d] hover:ring-blue-400/30"
        >
          <Download size={18} />
        </button>
        <button
          onClick={() => router.push("/")}
          title="New paste"
          className="cursor-pointer inline-flex items-center justify-center rounded-lg p-2 bg-[#151b2e] ring-1 ring-white/10 hover:bg-[#1e253d] hover:ring-blue-400/30"
        >
          <Plus size={18} />
        </button>
      </div>

      <div
        className={`mt-3 text-center text-xs transition-opacity ${
          copied ? "opacity-100 text-green-400" : "opacity-0"
        }`}
      >
        Copied!
      </div>
    </div>
  );
}