import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Page from "./components/Page/Page";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
