export default function LoadingPaste() {
  return (
    <div className="relative w-screen h-screen bg-[#0e0f13] text-white flex overflow-hidden">
      <div className="flex-1 h-full font-mono text-sm">
        <div className="h-full overflow-auto pt-6 pb-6 px-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-transparent animate-spin" />
            <span className="text-white/70 text-sm">Loading paste…</span>
          </div>
          <div className="space-y-2">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className={`h-3 rounded bg-white/10 animate-pulse ${
                  i % 3 === 0 ? 'w-5/6' : i % 3 === 1 ? 'w-11/12' : 'w-3/4'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 w-[300px] rounded-2xl p-5 text-sm backdrop-blur-xl shadow-2xl bg-[linear-gradient(to_bottom_right,#1a2035,#101522)] ring-1 ring-white/10 mr-4">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 bg-white/10 rounded animate-pulse" />
            <div className="h-7 w-20 rounded-full bg-green-600/60 animate-pulse" />
          </div>
          <div className="h-4 w-40 bg-white/10 rounded mt-2 animate-pulse" />
        </div>

        <div className="grid grid-cols-2 gap-3 text-neutral-300">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg px-3 py-2 bg-[#151b2e] ring-1 ring-white/15"
            >
              <div className="h-4 w-4 rounded bg-white/10 animate-pulse" />
              <div className="flex-1 space-y-1">
                <div className="h-3 w-10 bg-white/10 rounded animate-pulse" />
                <div className="h-3 w-12 bg-white/20 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/10 my-4" />

        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-9 rounded-lg bg-[#151b2e] ring-1 ring-white/10 animate-pulse"
            />
          ))}
        </div>

        <div className="mt-3 h-3 w-16 mx-auto bg-green-400/50 rounded animate-pulse" />
      </div>
    </div>
  );
}