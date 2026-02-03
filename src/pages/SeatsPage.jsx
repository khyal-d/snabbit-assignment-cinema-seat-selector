import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import SectionCard from "../components/SectionCard";
import ScreenIndicator from "../components/ScreenIndicator";
import SeatGrid from "../components/SeatGrid";
import BookingSummary from "../components/BookingSummary";
import Toast from "../components/Toast";

import { PRICE_PER_SEAT, occupiedKey } from "../utils/constants";
import { readJSON, writeJSON } from "../utils/storage";
import { ensureRandomOccupiedForMovie, generateSeats } from "../utils/seatUtils";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { tmdbImage } from "../api/tmdb";

export default function SeatsPage() {
  const { movieId } = useParams(); // string
  const { movie, loading, error } = useMovieDetails(movieId);

  const [seats, setSeats] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!movieId) return;
    const occupiedSeatIds = ensureRandomOccupiedForMovie(movieId);
    setSeats(generateSeats(occupiedSeatIds));
  }, [movieId]);

  const selectedSeatIds = useMemo(() => {
    return seats.filter((s) => s.status === "selected").map((s) => s.id).sort();
  }, [seats]);

  const total = useMemo(() => selectedSeatIds.length * PRICE_PER_SEAT, [selectedSeatIds]);

  function toggleSeat(seatId) {
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id !== seatId) return s;
        if (s.status === "occupied") return s;
        return { ...s, status: s.status === "selected" ? "available" : "selected" };
      })
    );
  }

  function bookNow() {
    if (!movieId) return;

    const currentOccupied = new Set(readJSON(occupiedKey(movieId), []));
    for (const id of selectedSeatIds) currentOccupied.add(id);

    writeJSON(occupiedKey(movieId), Array.from(currentOccupied));

    setSeats((prev) => prev.map((s) => (s.status === "selected" ? { ...s, status: "occupied" } : s)));

    setToast(
      `${selectedSeatIds.length} seat(s) booked for ${movie?.title || "your movie"}: ${selectedSeatIds.join(", ")}`
    );

    // window.clearTimeout(bookNow._t);
    // bookNow._t = window.setTimeout(() => setToast(""), 3000);
  }

  const canBook = selectedSeatIds.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link to="/" className="text-sm font-semibold text-pink-700 hover:underline">
              ← Back to movies
            </Link>
            <h1 className="mt-2 text-2xl font-bold snabbit-text">Select seats</h1>
            <p className="mt-1 text-sm text-slate-600">
              Pick your seats and confirm booking.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-sm text-slate-600">Loading movie…</div>
        ) : error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <SectionCard
                title="Movie"
                subtitle={movie ? `${movie.title} • ${movie.release_date?.slice(0, 4) || ""}` : ""}
                right={
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    ${PRICE_PER_SEAT}/seat
                  </span>
                }
              >
                {movie ? (
                  <div className="flex gap-4">
                    <div className="h-32 w-24 overflow-hidden rounded-xl bg-slate-100">
                      {movie.poster_path ? (
                        <img
                          src={tmdbImage(movie.poster_path, "w342")}
                          alt={movie.title}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm text-slate-700 line-clamp-3">
                        {movie.overview || "No description available."}
                      </div>
                      <div className="mt-2 text-xs text-slate-500">
                        ⭐ {movie.vote_average?.toFixed(1) || "—"} •{" "}
                        {movie.runtime ? `${movie.runtime} min` : "—"}
                      </div>
                    </div>
                  </div>
                ) : null}
              </SectionCard>

              <SectionCard title="Seats" subtitle="Click to toggle seats. Occupied seats are disabled.">
                <div className="space-y-5">
                  <ScreenIndicator />
                  <SeatGrid seats={seats} onToggleSeat={toggleSeat} />
                </div>
              </SectionCard>
            </div>

            <div className="space-y-6">
              <SectionCard title="Booking summary" subtitle="Updates instantly as you select seats.">
                <BookingSummary
                  selectedSeats={selectedSeatIds}
                  total={total}
                  movieTitle={movie?.title || ""}
                  canBook={canBook}
                  onBook={bookNow}
                />
              </SectionCard>
            </div>
          </div>
        )}
      </div>

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}
