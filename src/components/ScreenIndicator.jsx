import React from "react";

export default function ScreenIndicator() {
  return (
    <div className="relative">
      <div className="mx-auto w-full max-w-xl">
        <div className="rounded-full bg-slate-900/90 px-6 py-2 text-center text-xs font-semibold tracking-widest text-white">
          SCREEN
        </div>
        <div className="mx-auto mt-3 h-2 w-10/12 rounded-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />
      </div>
    </div>
  );
}
