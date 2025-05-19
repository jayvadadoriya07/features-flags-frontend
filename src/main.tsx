import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FlagsmithProvider } from "flagsmith/react";
import flagsmith from "flagsmith";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FlagsmithProvider
      options={{
        environmentID: "EPiSsEztK6kVv8jcvCiL46",
        api: "http://0.0.0.0:8000/api/v1/",
      }}
      flagsmith={flagsmith}
    >
      <App />
    </FlagsmithProvider>
  </StrictMode>
);
