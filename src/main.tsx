import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/darkMode/theme-provider.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById("root")!).render(
  <>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </>,
);
