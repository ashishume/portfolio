import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { ThemeProvider } from "./Context/ThemeContext";
import { initGA } from "./Shared/Services/GoogleAnalytics";
import { initializeBlogPosts } from "./Shared/blogData";

// Initialize Google Analytics
const trackingId = "G-PL27FYTMST";
if (trackingId) {
  initGA(trackingId);
}

// Pre-fetch blog posts from GitHub (non-blocking)
initializeBlogPosts();

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
