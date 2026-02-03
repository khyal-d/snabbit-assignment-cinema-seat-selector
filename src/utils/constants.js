export const ROWS = ["A", "B", "C", "D", "E", "F"];
export const COLS = [1, 2, 3, 4, 5, 6, 7, 8];
export const PRICE_PER_SEAT = 12;

export const LS_KEYS = {
  selectedMovieId: "cinema:selectedMovieId",
  occupiedPrefix: "cinema:occupiedSeats:",
};

export function occupiedKey(movieId) {
  return `${LS_KEYS.occupiedPrefix}${movieId}`;
}
