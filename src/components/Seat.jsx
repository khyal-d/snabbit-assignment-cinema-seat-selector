import React from "react";

export default function Seat({ seat, onToggle }) {
  const { status, id } = seat;

  const base =
    "flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition select-none";

  const styles = {
    available:"border border-slate-300 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50",
    selected: "border border-pink-600 bg-pink-600 text-white hover:-translate-y-0.5 hover:bg-pink-500 hover:border-pink-500",
    occupied: "border border-pink-200 bg-pink-100 text-pink-900 cursor-not-allowed opacity-90",

  };

  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      disabled={status === "occupied"}
      aria-label={`Seat ${id} ${status}`}
      className={base + " " + styles[status]}
      title={status === "occupied" ? `${id} (Occupied)` : id}
    >
      {id}
    </button>
  );
}
