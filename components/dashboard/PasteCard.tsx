"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import LordIcon from "./LordIcon";

export default function PasteCard({
  paste,
  onDelete,
  pasteIconUrl,
}: {
  paste: any;
  onDelete: (id: string) => void;
  pasteIconUrl: string;
}) {
  const pasteIconRef = useRef<any>(null);

  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-[#11131c] p-5 flex flex-col shadow-sm hover:shadow-lg hover:border-blue-500/30 transition-all"
      variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
      onMouseEnter={() => pasteIconRef.current?.playFromBeginning()}
      onMouseLeave={() => pasteIconRef.current?.goToFirstFrame()}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
          <LordIcon ref={pasteIconRef} url={pasteIconUrl} size={28} colorize="#3b82f6" />
        </div>
        <div className="font-mono text-white text-sm truncate">
          {paste.title || 'Untitled'}
        </div>
      </div>
      <div className="text-xs text-neutral-400 font-mono mb-3 line-clamp-3">
        {paste.content || 'No content'}
      </div>
      <div className="flex justify-between items-center mt-auto text-xs text-neutral-500">
        <span>{new Date(paste.createdAt).toLocaleString()}</span>
        <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
          {paste.views} views
        </span>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <a
          href={`/${paste.id}`}
          className="cursor-pointer px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-500 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
        <button
          onClick={() => onDelete(paste.id)}
          className="cursor-pointer px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm hover:bg-red-500 transition-colors"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}