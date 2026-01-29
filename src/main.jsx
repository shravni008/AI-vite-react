import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// FIX: Import LandingPage and LenAi from LenAi.jsx, not App.jsx
import { LandingPage, LenAi } from "./LenAi.jsx";
// FIX: Ensure case sensitivity matches your file (work.jsx)
import Work from "./work.jsx";

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
