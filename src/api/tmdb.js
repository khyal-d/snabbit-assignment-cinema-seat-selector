const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE = "https://api.themoviedb.org/3";

export function tmdbImage(path, size = "w342") {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export async function fetchNowPlaying() {
  const url = `${BASE}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB now_playing failed: ${res.status}`);
  return res.json();
}

export async function fetchMovieDetails(movieId) {
  const url = `${BASE}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB movie details failed: ${res.status}`);
  return res.json();
}
