"use client";

import { Info, Shield } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthSection() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 text-sm">
      {!session?.user ? (
        <div className="flex items-center gap-3">
          {/* Bouton About */}
          <a
            href="/about"
            className="cursor-pointer flex items-center gap-2 bg-[#0d1117] hover:bg-[#1c2230] border border-white/10 text-neutral-300 px-4 py-2 rounded-lg shadow-md transition-all"
          >
            <Info size={16} />
            <span>About</span>
          </a>

          {/* Bouton Login */}
          <button
            onClick={() => signIn("discord")}
            className="cursor-pointer flex items-center gap-2 bg-[#0d1117] hover:bg-[#1c2230] border border-blue-500 text-blue-400 px-4 py-2 rounded-lg shadow-md transition-all"
          >
            <Shield className="animate-pulse" size={18} />
            <span>Login</span>
          </button>
        </div>
      ) : (
        <div className="bg-[#0d1117] border border-white/10 rounded-xl p-4 shadow-lg space-y-2 min-w-[220px]">
          <div className="flex items-center gap-2 text-green-400 font-medium">
            <Shield size={18} />
            <span>Connected as</span>
            <span className="truncate font-semibold text-white">
              {session.user.name || "User"}
            </span>
          </div>

          <div className="flex justify-between gap-2 mt-2">
            <a
              href="/dashboard"
              className="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Dashboard
            </a>
            <button
              onClick={() => signOut()}
              className="cursor-pointer flex-1 text-center bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}