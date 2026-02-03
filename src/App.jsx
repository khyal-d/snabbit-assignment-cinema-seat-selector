import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage";
import SeatsPage from "./pages/SeatsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/seats/:movieId" element={<SeatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
