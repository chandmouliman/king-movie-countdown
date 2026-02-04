"use client";

import { useEffect, useMemo, useState } from "react";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown({ targetISO }: { targetISO: string }) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <TimeBox label="DAYS" value={String(days)} />
      <TimeBox label="HOURS" value={pad2(hours)} />
      <TimeBox label="MINUTES" value={pad2(mins)} />
      <TimeBox label="SECONDS" value={pad2(secs)} />
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 border border-white/20 rounded-xl text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs tracking-widest text-white/60">{label}</div>
    </div>
  );
}
