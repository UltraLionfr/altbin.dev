import { prisma } from '@/lib/prisma';

interface Props {
  params: { id: string };
}

export default async function PastePage({ params }: Props) {
  const paste = await prisma.paste.findUnique({
    where: { id: params.id },
    select: { title: true, content: true, createdAt: true, views: true },
  });

  if (!paste) return <div>Paste not found</div>;

  return (
    <div className="min-h-screen bg-[#0e0f13] text-white p-6">
      <h1 className="text-3xl font-bold text-blue-400 mb-4">
        {paste.title || 'Untitled'}
      </h1>

      <pre className="bg-[#11131c] p-6 rounded-xl whitespace-pre-wrap overflow-auto text-sm border border-white/10 shadow-lg">
        {paste.content}
      </pre>

      <p className="mt-4 text-xs text-neutral-400">
        Views: {paste.views} · Created at: {new Date(paste.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
