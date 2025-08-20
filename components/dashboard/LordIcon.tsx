"use client";

import { Player } from "@lordicon/react";
import { forwardRef, useEffect, useState, type ForwardedRef } from "react";

const LordIcon = forwardRef(function LordIcon(
  { url, size = 28, colorize = "#3b82f6" }: { url: string; size?: number; colorize?: string },
  ref: ForwardedRef<Player>
) {
  const [iconData, setIconData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data: Record<string, unknown>) => setIconData(data));
  }, [url]);

  if (!iconData) return null;

  return <Player ref={ref} icon={iconData} size={size} colorize={colorize} />;
});

export default LordIcon;
