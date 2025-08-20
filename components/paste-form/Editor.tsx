"use client";

import { ChevronRight } from "lucide-react";
import { useRef } from "react";

interface EditorProps {
  content: string;
  setContent: (v: string) => void;
}

export default function Editor({ content, setContent }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className="flex w-full h-full overflow-hidden font-mono text-sm text-white">
      {/* Numéros de lignes */}
      <div
        ref={lineNumbersRef}
        className="flex flex-col items-end pr-4 pl-3 pt-6 text-neutral-600 select-none shrink-0 overflow-hidden"
      >
        {content.split("\n").map((_, i) => (
          <div key={i} className="flex items-center gap-2 leading-6 tabular-nums">
            {i === 0 && <ChevronRight size={14} className="text-blue-400 opacity-0" />}
            <span>{i + 1}</span>
          </div>
        ))}
      </div>

      {/* Zone d’édition */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onScroll={handleScroll}
        placeholder={`Insert or paste your content here...\n\n// Supported content types:\n// – Source code (any language)\n// – Config files\n// – Text documents\n// – Logs and debug output\n\nShortcut: Ctrl+S (or Cmd+S) to save your paste`}
        className="w-full flex-1 bg-transparent text-white resize-none outline-none py-6 pr-4 pl-0 caret-blue-400 placeholder:text-sm placeholder:text-gray-500 leading-6 whitespace-pre overflow-auto"
        aria-label="Paste editor"
      />
    </div>
  );
}