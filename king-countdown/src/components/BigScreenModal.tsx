"use client";

import { useEffect, useState } from "react";

export function BigScreenModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("bigScreenSeen");
    if (!seen) setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-black p-5">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-white/80">
            Use big screen for best experience
          </p>

          <button
            className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
            onClick={() => {
              localStorage.setItem("bigScreenSeen", "1");
              setOpen(false);
            }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
