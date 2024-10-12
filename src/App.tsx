import * as React from "react";
import PermanentDrawerLeft from "./components/Navbar/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import MoviesPage from "./pages/movies";
import TVSeriesPage from "./pages/tvseries";
import EntityDetail from "./pages/entityDetail";

export default function App() {
  return (
    <BrowserRouter>
      <PermanentDrawerLeft>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv-series" element={<TVSeriesPage />} />
          <Route path="/:type/:id" element={<EntityDetail />} />
        </Routes>
      </PermanentDrawerLeft>
    </BrowserRouter>
  );
}
