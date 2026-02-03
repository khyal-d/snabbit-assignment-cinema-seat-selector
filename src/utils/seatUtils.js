import { COLS, ROWS } from "./constants";
import { readJSON, writeJSON } from "./storage";
import { occupiedKey } from "./constants";

/**
 * Generates 6x8 seat objects.
 * occupiedSeatIds => status = "occupied"
 * otherwise => status = "available"
 */
export function generateSeats(occupiedSeatIds) {
  const occupied = new Set(occupiedSeatIds);
  const seats = [];

  for (const row of ROWS) {
    for (const number of COLS) {
      const id = `${row}${number}`;
      seats.push({
        id,
        row,
        number,
        status: occupied.has(id) ? "occupied" : "available",
      });
    }
  }
  return seats;
}

/**
 * If no occupied seats exist for the movie, create a random set once,
 * persist it, and return it.
 */
export function ensureRandomOccupiedForMovie(movieId) {
  const key = occupiedKey(movieId);
  const existing = readJSON(key, null);
  if (Array.isArray(existing)) return existing;

  const allIds = [];
  for (const r of ROWS) for (const c of COLS) allIds.push(`${r}${c}`);

  const occupiedCount = 8;
  const chosen = new Set();
  while (chosen.size < occupiedCount) {
    const idx = Math.floor(Math.random() * allIds.length);
    chosen.add(allIds[idx]);
  }

  const occupiedSeatIds = Array.from(chosen);
  writeJSON(key, occupiedSeatIds);
  return occupiedSeatIds;
}
