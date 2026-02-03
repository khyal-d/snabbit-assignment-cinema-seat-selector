import React from "react";
import { PRICE_PER_SEAT } from "../utils/constants";

export default function BookingSummary({ selectedSeats, total, movieTitle, onBook, canBook }) {
  const seatList = selectedSeats.length ? selectedSeats.join(", ") : "—";

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1">
        <div className="text-sm font-semibold snabbit-text">Live Summary</div>

        <div className="text-sm text-slate-700">
          <span className="font-semibold snabbit-text">
            {selectedSeats.length}
          </span>{" "}
          Seats Selected
        </div>

        <div className="text-sm text-slate-700">
          Seats:{" "}
          <span className="font-semibold">
            {seatList}
          </span>
        </div>

        <div className="text-sm text-slate-700">
          Total:{" "}
          <span className="font-semibold snabbit-text">
            ${total.toFixed(2)}
          </span>
        </div>

        <div className="pt-2 text-xs text-slate-500">
          Price: ${PRICE_PER_SEAT} per seat
          {movieTitle ? <span className="mx-2 text-slate-300">•</span> : null}
          {movieTitle ? <span>Movie: {movieTitle}</span> : null}
        </div>
      </div>

      <button
        type="button"
        disabled={!canBook}
        onClick={onBook}
        className={
          "w-full rounded-xl px-4 py-3 text-sm font-semibold transition " +
          (canBook
            ? "bg-pink-600 text-white hover:bg-pink-500"
            : "bg-slate-200 text-slate-500 cursor-not-allowed")
        }
      >
        Book Now
      </button>

      <p className="text-xs text-slate-500">
        Booking will convert selected seats to{" "}
        <span className="font-semibold">occupied</span> and persist after refresh.
      </p>
    </div>
  );
}
