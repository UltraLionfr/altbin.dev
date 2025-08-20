"use client";

import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative w-full md:w-1/3 mb-8">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
      <input
        type="text"
        placeholder="Search by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-text w-full pl-10 pr-4 py-2 rounded-xl bg-[#0f1320]/70 text-white 
        placeholder:text-neutral-500 outline-none ring-1 ring-white/10 
        focus:ring-2 focus:ring-blue-500/50 transition-all"
      />
    </div>
  );
}
