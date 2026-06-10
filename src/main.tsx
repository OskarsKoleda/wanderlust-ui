import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import geistLatin from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";

import "./fonts.css";
import "./index.css";
import App from "./App.tsx";

if (!document.querySelector("[data-preload-geist]")) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "font";
  link.type = "font/woff2";
  link.href = geistLatin;
  link.crossOrigin = "anonymous";
  link.dataset.preloadGeist = "";
  document.head.appendChild(link);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
