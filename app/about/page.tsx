"use client";

import { Player } from "@lordicon/react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

// URLs d’icônes Lordicon
const icons = {
  simplicity: "https://cdn.lordicon.com/tsrgicte.json",
  shield: "https://cdn.lordicon.com/sjoccsdj.json",
  community: "https://cdn.lordicon.com/ubpgwkmy.json",
  github: "https://cdn.lordicon.com/jjxzcivr.json",
  discord: "https://cdn.lordicon.com/zvnxzuwv.json",
};

// Wrapper pour Lordicon
const LordIcon = forwardRef(function LordIcon(
  {
    url,
    size = 30,
    colorize = "#3b82f6",
  }: { url: string; size?: number; colorize?: string },
  ref: ForwardedRef<Player>
) {
  const [iconData, setIconData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setIconData)
      .catch(() => setIconData(null));
  }, [url]);

  if (!iconData) return null;
  return <Player ref={ref} icon={iconData} size={size} colorize={colorize} />;
});

// Carte Feature
function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  const iconRef = useRef<Player>(null);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl bg-[#11131c] border border-white/10 p-6 shadow-lg hover:border-blue-500/40 transition-colors"
      onMouseEnter={() => iconRef.current?.playFromBeginning()}
      onMouseLeave={() => iconRef.current?.goToFirstFrame()}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
          <LordIcon ref={iconRef} url={icon} size={32} />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// Bouton Contact
function ContactButton({
  href,
  icon,
  text,
  gradient,
  shadow,
  color = "#fff",
}: {
  href: string;
  icon: string;
  text: string;
  gradient: string;
  shadow: string;
  color?: string;
}) {
  const iconRef = useRef<Player>(null);

  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-medium text-white ${gradient} ${shadow} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60`}
      onMouseEnter={() => iconRef.current?.playFromBeginning()}
      onMouseLeave={() => iconRef.current?.goToFirstFrame()}
    >
      <LordIcon ref={iconRef} url={icon} size={32} colorize={color} />
      <span>{text}</span>
    </motion.a>
  );
}

export default function AboutPage() {
  const router = useRouter();

  const features = [
    {
      title: "Simplicity",
      desc: "Create a paste in seconds, distraction-free.",
      icon: icons.simplicity,
    },
    {
      title: "Security",
      desc: "Protect your posts with a password or limited number of views.",
      icon: icons.shield,
    },
    {
      title: "Open Source",
      desc: "Contribute to the project and improve the platform.",
      icon: icons.community,
    },
  ];

  return (
    <div className="p-8 relative min-h-screen bg-[#0e0f13] text-white">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-12 max-w-6xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.back()}
          className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium
            text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30
            hover:shadow-blue-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
        >
          <ArrowLeft size={18} className="text-blue-200" />
          Back
        </motion.button>

        <h1 className="text-lg font-bold text-neutral-300">AltBin</h1>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <FeatureCard key={i} title={f.title} desc={f.desc} icon={f.icon} />
        ))}
      </div>

      {/* Contact */}
      <div className="mt-20 max-w-2xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Contact</h2>
        <p className="text-neutral-400 mb-8">
          Any <span className="text-blue-400">questions</span> or{" "}
          <span className="text-blue-400">suggestions</span>?  
          Join the community or check out the source code
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <ContactButton
            href="https://discord.gg/msaPJjBMbZ"
            icon={icons.discord}
            text="Join Discord"
            gradient="bg-gradient-to-r from-indigo-600 to-indigo-500"
            shadow="shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
          />
          <ContactButton
            href="https://github.com/UltraLionfr/altbin.dev"
            icon={icons.github}
            text="GitHub"
            gradient="bg-gradient-to-r from-gray-800 to-gray-700"
            shadow="shadow-lg shadow-black/30 hover:shadow-blue-500/40"
          />
        </div>
      </div>
    </div>
  );
}