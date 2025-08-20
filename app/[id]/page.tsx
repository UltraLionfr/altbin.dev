'use client';

import {
  CalendarDays,
  Copy,
  Download,
  Eye,
  FileText,
  Plus,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';

import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

/** ---------- Loader animé (spinner + skeletons) ---------- */
function LoadingPaste() {
  return (
    <div className="relative w-screen h-screen bg-[#0e0f13] text-white flex overflow-hidden">
      {/* Zone code (skeleton lignes) */}
      <div className="flex-1 h-full font-mono text-sm">
        <div className="h-full overflow-auto pt-6 pb-6 px-6">
          <div className="mb-4 flex items-center gap-2">
            <div
              className="h-5 w-5 rounded-full border-2 border-white/30 border-t-transparent animate-spin"
              aria-hidden
            />
            <span className="text-white/70 text-sm">Chargement du paste…</span>
          </div>
          <div className="space-y-2">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className={`h-3 rounded bg-white/10 animate-pulse ${i % 3 === 0 ? 'w-5/6' : i % 3 === 1 ? 'w-11/12' : 'w-3/4'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar (skeleton cartes + boutons) */}
      <div
        className="
          absolute top-4 right-4 w-[300px] rounded-2xl p-5 text-sm
          backdrop-blur-xl shadow-2xl
          bg-[linear-gradient(to_bottom_right,#1a2035,#101522)]
          ring-1 ring-white/10 mr-4
        "
      >
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 bg-white/10 rounded animate-pulse" />
            <div className="h-7 w-20 rounded-full bg-green-600/60 animate-pulse" />
          </div>
          <div className="h-4 w-40 bg-white/10 rounded mt-2 animate-pulse" />
        </div>

        <div className="grid grid-cols-2 gap-3 text-neutral-300">
          <div className="flex items-center gap-2 rounded-lg px-3 py-2 bg-[#151b2e] ring-1 ring-white/15">
            <div className="h-4 w-4 rounded bg-white/10 animate-pulse" />
            <div className="flex-1 space-y-1">
              <div className="h-3 w-10 bg-white/10 rounded animate-pulse" />
              <div className="h-3 w-12 bg-white/20 rounded animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg px-3 py-2 bg-[#151b2e] ring-1 ring-white/15">
            <div className="h-4 w-4 rounded bg-white/10 animate-pulse" />
            <div className="flex-1 space-y-1">
              <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
              <div className="h-3 w-16 bg-white/20 rounded animate-pulse" />
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10 my-4" />

        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 rounded-lg bg-[#151b2e] ring-1 ring-white/10 animate-pulse" />
          ))}
        </div>

        <div className="mt-3 h-3 w-16 mx-auto bg-green-400/50 rounded animate-pulse" />
      </div>
    </div>
  );
}
/** -------------------------------------------------------- */

export default function PastePage({ params }: { params: { id: string } }) {
  const [paste, setPaste] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<string>('language-javascript');
  const [copied, setCopied] = useState(false);

  const codeRef = useRef<HTMLPreElement | null>(null);
  const router = useRouter();

  const fetchPaste = async (pwd?: string) => {
    setLoading(true);
    const res = await fetch(`/api/paste/${params.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pwd || '' }),
    });

    if (res.status === 403) {
      setError('Invalid password.');
      setLoading(false);
      return;
    }
    if (res.status === 404) {
      setError('Paste not found or expired.');
      setLoading(false);
      return;
    }

    const data = await res.json();
    setPaste(data);

    if (data.content.includes('function') || data.content.includes('const')) {
      setLanguage('language-javascript');
    } else if (data.content.includes('import') || data.content.includes('export')) {
      setLanguage('language-typescript');
    } else if (data.content.includes('{') && data.content.includes('}')) {
      setLanguage('language-json');
    } else {
      setLanguage('language-bash');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPaste();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (paste?.content) {
      Prism.highlightAll();
    }
  }, [paste]);

  // 👉 Remplace l'ancien message "Loading..." par le loader animé
  if (loading) return <LoadingPaste />;

  if (error || (paste?.protected && !paste?.content)) {
    return (
      <div className="h-screen w-screen bg-[#0e0f13] flex items-center justify-center text-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchPaste((e.currentTarget as any).password.value);
          }}
          className="
            w-full max-w-sm rounded-2xl p-6 space-y-4
            backdrop-blur-xl shadow-2xl
            bg-[linear-gradient(to_bottom_right,rgba(20,24,38,0.9),rgba(14,16,24,0.9))]
            ring-1 ring-white/10
          "
        >
          <h2 className="text-xl font-bold">
            <span className="text-red-400">🔒 Protected Paste</span>
          </h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            name="password"
            type="password"
            placeholder="Enter password"
            className="
              w-full rounded-xl bg-[#0f1320]/60 text-white placeholder:text-neutral-500
              px-3 py-2 outline-none
              ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/50
            "
          />

          <button
            type="submit"
            className="
              w-full inline-flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium
              bg-gradient-to-b from-[#1b2135] to-[#141a2a] text-white ring-1 ring-white/10
              hover:from-[#232a41] hover:to-[#161d2f]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60
            "
          >
            View Paste
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-[#0e0f13] text-white flex overflow-hidden">
      <div className="flex-1 h-full font-mono text-sm">
        <pre
          ref={codeRef}
          className="h-full overflow-auto pt-6 pb-6 px-6 line-numbers"
        >
          <code className={`${language} whitespace-pre-wrap break-words`}>
            {paste.content}
          </code>
        </pre>
      </div>

      <div
        className="
          absolute top-4 right-4 w-[300px] rounded-2xl p-5 text-sm
          backdrop-blur-xl shadow-2xl
          bg-[linear-gradient(to_bottom_right,#1a2035,#101522)]
          ring-1 ring-white/10 mr-4
        "
      >
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight">
              Alt<span className="text-blue-400">Bin</span>
            </h2>
            <button
              onClick={() => router.push('/')}
              className="
                cursor-pointer inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold
                bg-green-600 text-white shadow-sm
                hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60
              "
            >
              <Plus size={14} />
              CREATE
            </button>
          </div>
          {paste.title && (
            <h1
              className="text-sm font-semibold text-blue-300 truncate mt-1"
              title={paste.title}
            >
              {paste.title}
            </h1>
          )}
        </div>

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

        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(paste.content);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            className="cursor-pointer inline-flex items-center justify-center rounded-lg p-2 bg-[#151b2e] ring-1 ring-white/10 hover:bg-[#1e253d] hover:ring-blue-400/30"
            title="Copy"
          >
            <Copy size={18} />
          </button>

          <button
            onClick={() => window.open(`/api/${params.id}?raw=1`, '_blank')}
            className="cursor-pointer inline-flex items-center justify-center rounded-lg p-2 bg-[#151b2e] ring-1 ring-white/10 hover:bg-[#1e253d] hover:ring-blue-400/30"
            title="Raw"
          >
            <FileText size={18} />
          </button>

          <button
            onClick={() => {
              const blob = new Blob([paste.content], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${params.id}.txt`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="cursor-pointer inline-flex items-center justify-center rounded-lg p-2 bg-[#151b2e] ring-1 ring-white/10 hover:bg-[#1e253d] hover:ring-blue-400/30"
            title="Download"
          >
            <Download size={18} />
          </button>

          <button
            onClick={() => router.push('/')}
            className="cursor-pointer inline-flex items-center justify-center rounded-lg p-2 bg-[#151b2e] ring-1 ring-white/10 hover:bg-[#1e253d] hover:ring-blue-400/30"
            title="New paste"
          >
            <Plus size={18} />
          </button>
        </div>

        <div
          className={`mt-3 text-center text-xs transition-opacity ${
            copied ? 'opacity-100 text-green-400' : 'opacity-0'
          }`}
        >
          Copied!
        </div>
      </div>
    </div>
  );
}