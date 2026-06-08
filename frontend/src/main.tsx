import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { AppProvider } from "./AppProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <NextUIProvider>
        {/* Dark Mode */}
        <div className="min-w-screen flex min-h-screen items-center justify-center bg-background text-foreground dark">
          <App />
        </div>
      </NextUIProvider>
    </AppProvider>
  </StrictMode>,
);
