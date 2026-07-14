"use client";

import { useEffect, useState } from "react";

function computeOnline(): boolean {
  const now = new Date();
  const h = now.getHours();
  const d = now.getDay();
  return d !== 0 && h >= 10 && h < 19;
}

/** Public "online" status is only ever shown during genuinely staffed hours. */
export function useChatOnline(): boolean {
  const [online, setOnline] = useState(computeOnline);

  useEffect(() => {
    const id = setInterval(() => setOnline(computeOnline()), 60_000);
    return () => clearInterval(id);
  }, []);

  return online;
}
