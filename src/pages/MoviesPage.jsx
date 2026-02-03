import React from "react";
import { useNavigate } from "react-router-dom";
import { useNowPlaying } from "../hooks/useNowPlaying";
import { tmdbImage } from "../api/tmdb";

export default function MoviesPage() {
  const { movies, loading, error } = useNowPlaying();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold snabbit-text">Now Playing</h1>
        <p className="mt-1 text-sm text-slate-600">
          Pick a movie to continue to seat selection.
        </p>

        {loading ? (
          <div className="mt-6 text-sm text-slate-600">Loading movies…</div>
        ) : error ? (
          <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {movies.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => navigate(`/seats/${m.id}`)}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="aspect-[2/3] w-full bg-slate-100">
                  {m.poster_path ? (
                    <img
                      src={tmdbImage(m.poster_path, "w342")}
                      alt={m.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>

                <div className="p-3">
                  <div className="line-clamp-1 font-semibold snabbit-text">
                    {m.title}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    ⭐ {m.vote_average?.toFixed(1) || "—"} •{" "}
                    {m.release_date ? m.release_date.slice(0, 4) : "—"}
                  </div>

                  <div className="mt-2 inline-flex rounded-full bg-pink-50 px-2 py-0.5 text-[11px] font-semibold text-pink-700">
                    Select
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
