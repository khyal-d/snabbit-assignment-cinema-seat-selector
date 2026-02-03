import React from "react";

export default function MovieSelector({ movies, selectedMovieId, onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {movies.map((m) => {
        const active = m.id === selectedMovieId;
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={
              "rounded-xl border p-4 text-left transition " +
              (active
                ? "border-pink-600 bg-pink-600 text-white"
                : "border-slate-200 bg-white hover:border-pink-300 hover:bg-pink-50")
            }
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold">{m.title}</div>
                <div className={"mt-1 text-sm " + (active ? "text-slate-200" : "text-slate-600")}>
                  {m.genre} · {m.runtime} · {m.rating}
                </div>
              </div>
              <span
                className={
                  "rounded-full px-2 py-1 text-xs font-medium " +
                  (active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-700")
                }
              >
                Now Playing
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
