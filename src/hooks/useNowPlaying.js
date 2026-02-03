import { useEffect, useState } from "react";
import { fetchNowPlaying } from "../api/tmdb";

export function useNowPlaying() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchNowPlaying();
        if (!alive) return;
        setMovies(data.results || []);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "Failed to load movies");
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, []);

  return { movies, loading, error };
}
