'use client';

import { useRouter } from 'next/navigation';
import Prism from 'prismjs';
import { use, useEffect, useState } from 'react';

import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/themes/prism-tomorrow.css';

import AuthSection from "@/components/paste-form/AuthSection";
import CodeViewer from '@/components/paste/CodeViewer';
import LoadingPaste from '@/components/paste/LoadingPaste';
import PasswordForm from '@/components/paste/PasswordForm';
import PasteSidebar from '@/components/paste/PasteSidebar';


async function loadLanguage(lang: string) {
  try {
    await import(`prismjs/components/prism-${lang}.js`);
  } catch (err) {
    console.warn(`[Prism] Language '${lang}' introuvable. Fallback -> plaintext`);
  }
}

export default function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [paste, setPaste] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<string>('language-javascript');

  const fetchPaste = async (pwd?: string) => {
    setLoading(true);
    const res = await fetch(`/api/paste/${id}`, {
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

    const content = data.content.toLowerCase();

    let detected = 'javascript';
    if (content.includes('select ') || content.includes('insert into')) {
      detected = 'sql';
    } else if (content.includes('function') || content.includes('const')) {
      detected = 'javascript';
    } else if (content.includes('import ') || content.includes('export ')) {
      detected = 'typescript';
    } else if (content.includes('{') && content.includes('}')) {
      detected = 'json';
    } else if (content.includes('#include') || content.includes('int main')) {
      detected = 'cpp';
    } else if (content.includes('arduino')) {
      detected = 'arduino';
    } else {
      detected = 'bash';
    }

    await loadLanguage(detected);
    setLanguage(`language-${detected}`);

    setLoading(false);
  };

  useEffect(() => {
    fetchPaste();
  }, [id]);

  useEffect(() => {
    if (paste?.content) Prism.highlightAll();
  }, [paste, language]);

  if (loading) return <LoadingPaste />;

  if (error || (paste?.protected && !paste?.content)) {
    return <PasswordForm error={error} onSubmit={(pwd) => fetchPaste(pwd)} />;
  }

  return (
    <div className="relative w-screen h-screen bg-[#0e0f13] text-white flex overflow-hidden">
      <CodeViewer paste={paste} language={language} />
      <PasteSidebar paste={paste} id={id} />
      <AuthSection />
    </div>
  );
}
