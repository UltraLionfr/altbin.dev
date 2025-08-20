"use client";

import AuthSection from "@/components/paste-form/AuthSection";
import Editor from "@/components/paste-form/Editor";
import SidebarPanel from "@/components/paste-form/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function PasteForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [advanced, setAdvanced] = useState(true);

  const handleSave = useCallback(async () => {
    if (!content.trim()) return;
    setIsSaving(true);

    const res = await fetch("/api/paste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim() || null,
        content,
        password: password || null,
        maxViews: maxViews ? parseInt(maxViews, 10) : null,
        createdBy: session?.user?.id || null,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/${data.id}`);
    }

    setIsSaving(false);
  }, [title, content, password, maxViews, session, router]);

  // Raccourci clavier Ctrl+S
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!isSaving && content.trim()) handleSave();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleSave, isSaving, content]);

  return (
    <div className="w-screen h-screen bg-[#0e0f13] text-white relative">
      <Editor content={content} setContent={setContent} />
      <SidebarPanel
        title={title}
        setTitle={setTitle}
        maxViews={maxViews}
        setMaxViews={setMaxViews}
        password={password}
        setPassword={setPassword}
        content={content}
        isSaving={isSaving}
        handleSave={handleSave}
        advanced={advanced}
        setAdvanced={setAdvanced}
      />
      <AuthSection />
    </div>
  );
}