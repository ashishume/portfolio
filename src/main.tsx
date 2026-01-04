import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { ThemeProvider } from "./Context/ThemeContext";
import { initGA } from "./Shared/Services/GoogleAnalytics";

// Initialize Google Analytics
const trackingId = "G-PL27FYTMST";
if (trackingId) {
  initGA(trackingId);
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>
  // </React.StrictMode>
);
