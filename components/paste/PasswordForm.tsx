export default function PasswordForm({
  onSubmit,
  error,
}: {
  onSubmit: (pwd: string) => void;
  error?: string;
}) {
  return (
    <div className="h-screen w-screen bg-[#0e0f13] flex items-center justify-center text-white">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement & {
            password: { value: string };
          };
          const pwd = form.password.value;
          onSubmit(pwd);
        }}
        className="w-full max-w-sm rounded-2xl p-6 space-y-4 backdrop-blur-xl shadow-2xl bg-[linear-gradient(to_bottom_right,rgba(20,24,38,0.9),rgba(14,16,24,0.9))] ring-1 ring-white/10"
      >
        <h2 className="text-xl font-bold">
          <span className="text-red-400">🔒 Protected Paste</span>
        </h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          name="password"
          type="password"
          placeholder="Enter password"
          className="w-full rounded-xl bg-[#0f1320]/60 text-white placeholder:text-neutral-500 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/50"
        />

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium bg-gradient-to-b from-[#1b2135] to-[#141a2a] text-white ring-1 ring-white/10 hover:from-[#232a41] hover:to-[#161d2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
        >
          View Paste
        </button>
      </form>
    </div>
  );
}