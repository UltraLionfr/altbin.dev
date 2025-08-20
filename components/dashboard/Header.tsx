"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import LordIcon from "./LordIcon";

export default function Header({ user }: { user?: string | null }) {
  const plusIconRef = useRef<any>(null);
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-white">
        Welcome back, <span className="text-blue-400">{user || "User"}</span>
      </h1>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => router.push("/")}
        className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl text-base font-medium
          text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30
          hover:shadow-blue-500/50 transition-all duration-300"
        onMouseEnter={() => plusIconRef.current?.playFromBeginning()}
        onMouseLeave={() => plusIconRef.current?.goToFirstFrame()}
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <LordIcon
            ref={plusIconRef}
            url="https://cdn.lordicon.com/vjgknpfx.json"
            size={28}
            colorize="#ffffff"
          />
        </div>
        Create New Paste
      </motion.button>
    </div>
  );
}