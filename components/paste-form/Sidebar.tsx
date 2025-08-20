"use client";

import SaveButton from "@/components/paste-form/SaveButton";
import { ChevronDown, ChevronRight, Eye, Lock, Plus, Settings } from "lucide-react";

interface SidebarPanelProps {
  title: string;
  setTitle: (v: string) => void;
  maxViews: string;
  setMaxViews: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  content: string;
  isSaving: boolean;
  handleSave: () => void;
  advanced: boolean;
  setAdvanced: (v: boolean) => void;
}

export default function SidebarPanel({
  title,
  setTitle,
  maxViews,
  setMaxViews,
  password,
  setPassword,
  content,
  isSaving,
  handleSave,
  advanced,
  setAdvanced,
}: SidebarPanelProps) {
  return (
    <aside className="absolute top-4 right-4 w-[300px] rounded-2xl p-5 text-sm z-10 backdrop-blur-xl shadow-2xl bg-[linear-gradient(to_bottom_right,rgba(20,24,38,0.9),rgba(14,16,24,0.9))] ring-1 ring-white/10 mr-4">
      <h2 className="text-lg font-bold text-center">
        Alt<span className="text-blue-400">Bin</span>
      </h2>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={handleSave}
          disabled={!content.trim() || isSaving}
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold bg-green-600 text-white shadow-sm hover:bg-green-500 disabled:opacity-50"
        >
          <Plus size={14} /> CREATE
        </button>

        <button
          onClick={() => setAdvanced(!advanced)}
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium bg-[#0f1320]/70 text-neutral-200 ring-1 ring-white/15 hover:bg-[#151a2a] hover:ring-white/25"
        >
          <Settings size={14} />
          <span>Advanced</span>
          {advanced ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* Options avancées */}
      {advanced && (
        <div className="space-y-6 mt-4">
          {/* Title */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-400 mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Optional title"
              className="w-full rounded-xl bg-[#0f1320]/60 px-4 py-2 text-white ring-1 ring-white/10"
            />
          </div>

          {/* Max Views */}
          <div>
            <label className="flex items-center gap-2 text-[11px] font-semibold text-neutral-400 mb-2">
              <Eye size={14} /> Max Views
            </label>
            <input
              type="number"
              value={maxViews}
              onChange={(e) => setMaxViews(e.target.value)}
              placeholder="∞"
              className="w-full rounded-xl bg-[#0f1320]/60 px-4 py-2 text-white ring-1 ring-white/10"
            />
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 text-[11px] font-semibold text-neutral-400 mb-2">
              <Lock size={14} /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Optional password"
              className="w-full rounded-xl bg-[#0f1320]/60 px-4 py-2 text-white ring-1 ring-white/10"
            />
          </div>
        </div>
      )}

      {/* Save principal */}
      <SaveButton
        handleSave={handleSave}
        isSaving={isSaving}
        content={content}
      />
    </aside>
  );
}