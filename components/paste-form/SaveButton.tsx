"use client";

import { Lock } from "lucide-react";

export default function SaveButton({
  handleSave,
  isSaving,
  content,
}: {
  handleSave: () => void;
  isSaving: boolean;
  content: string;
}) {
  return (
    <button
      onClick={handleSave}
      disabled={!content.trim() || isSaving}
      className={`mt-6 w-full flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium
        ${!content.trim() || isSaving
          ? "bg-[#151826] text-neutral-500 ring-1 ring-white/10 cursor-not-allowed"
          : "bg-gradient-to-b from-[#1b2135] to-[#141a2a] text-white ring-1 ring-white/10 hover:from-[#232a41] hover:to-[#161d2f]"}
      `}
    >
      <Lock size={16} />
      <span>Save Paste</span>
    </button>
  );
}
