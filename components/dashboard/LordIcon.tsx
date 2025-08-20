"use client";

import { Player } from "@lordicon/react";
import { forwardRef, useEffect, useState } from "react";

const LordIcon = forwardRef(function LordIcon(
  { url, size = 28, colorize = "#3b82f6" }: { url: string; size?: number; colorize?: string },
  ref: any
) {
  const [iconData, setIconData] = useState<any>(null);

  useEffect(() => {
    fetch(url).then((res) => res.json()).then(setIconData);
  }, [url]);

  if (!iconData) return null;
  return <Player ref={ref} icon={iconData} size={size} colorize={colorize} />;
});

export default LordIcon;
