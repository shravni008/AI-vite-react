import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Now these imports will work because we exported them from App.jsx!
import { LandingPage, LenAi } from "./App.jsx";
import Work from "./Work.jsx"; // Check if your file is Work.jsx or work.jsx

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LenAi" element={<LenAi />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
