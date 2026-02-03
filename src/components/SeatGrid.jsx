import React, { useMemo } from "react";
import Seat from "./Seat";
import { ROWS } from "../utils/constants";

function LegendDot({ label, className }) {
  return (
    <div className="flex items-center gap-2">
      <span className={"inline-block h-3 w-3 rounded-sm " + className} />
      <span>{label}</span>
    </div>
  );
}

export default function SeatGrid({ seats, onToggleSeat }) {
  const grouped = useMemo(() => {
    const map = new Map();
    for (const r of ROWS) map.set(r, []);
    for (const s of seats) map.get(s.row).push(s);
    for (const r of ROWS) map.get(r).sort((a, b) => a.number - b.number);
    return map;
  }, [seats]);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-center">
        <div className="inline-flex flex-col gap-2">
          {ROWS.map((row) => (
            <div key={row} className="flex items-center gap-2">
              <div className="w-6 text-center text-xs font-semibold text-slate-600">{row}</div>
              <div className="grid grid-cols-8 gap-2">
                {grouped.get(row).map((seat) => (
                  <Seat key={seat.id} seat={seat} onToggle={onToggleSeat} />
                ))}
              </div>
            </div>
          ))}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700">
            <LegendDot label="Available" className="border border-slate-300 bg-white" />
            <LegendDot label="Selected" className="bg-pink-600" />
            <LegendDot label="Occupied" className="bg-pink-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
