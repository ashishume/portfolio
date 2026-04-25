import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { ThemeProvider } from "./Context/ThemeContext";
import { hydrateBlogDataFromSsr } from "./Shared/blogData";
import { getClientSsrData, SsrDataProvider } from "./Shared/SsrDataContext";

const ssrData = getClientSsrData();
hydrateBlogDataFromSsr(ssrData);

const root = document.getElementById("root") as HTMLElement;
const app = (
  <ThemeProvider>
    <SsrDataProvider data={ssrData}>
      <App />
    </SsrDataProvider>
  </ThemeProvider>
);

if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
