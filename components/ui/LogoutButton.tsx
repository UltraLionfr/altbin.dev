"use client";

import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogOutButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => signOut()}
      className="cursor-pointer group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-medium
      text-white bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/30
      hover:shadow-red-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400/60"
    >
      <LogOut
        size={20}
        className="text-red-200 group-hover:-rotate-90 transition-transform duration-300"
      />
      <span>LogOut</span>
    </motion.button>
  );
}