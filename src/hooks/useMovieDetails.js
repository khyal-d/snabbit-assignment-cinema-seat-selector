import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api/tmdb";

export function useMovieDetails(movieId) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieId) return;

    let alive = true;

    async function run() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchMovieDetails(movieId);
        if (!alive) return;
        setMovie(data);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "Failed to load movie");
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [movieId]);

  return { movie, loading, error };
}
