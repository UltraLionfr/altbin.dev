'use client';

import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/themes/prism-tomorrow.css';
import { useEffect, useRef } from 'react';

import { Paste } from '@/types/paste';

export default function CodeViewer({
  paste,
  language,
}: {
  paste: Paste;
  language: string;
}) {
  const codeRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    if (paste?.content) {
      Prism.highlightAll();
    }
  }, [paste, language]);

  return (
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
  );
}