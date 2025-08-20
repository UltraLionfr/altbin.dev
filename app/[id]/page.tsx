'use client';

import { useRouter } from 'next/navigation';
import Prism from 'prismjs';
import { use, useEffect, useState } from 'react';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/themes/prism-tomorrow.css';

import AuthSection from "@/components/paste-form/AuthSection";
import CodeViewer from '@/components/paste/CodeViewer';
import LoadingPaste from '@/components/paste/LoadingPaste';
import PasswordForm from '@/components/paste/PasswordForm';
import PasteSidebar from '@/components/paste/PasteSidebar';

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
  }, [id]);

  useEffect(() => {
    if (paste?.content) {
      Prism.highlightAll();
    }
  }, [paste]);

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