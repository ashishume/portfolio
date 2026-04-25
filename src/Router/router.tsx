import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavItems } from "../Shared/constant";
import { usePageTracking } from "../Shared/hooks/usePageTracking";
import BlogDetail from "../Pages/Blog/BlogDetail";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsOfService from "../Pages/TermsOfService";

export const RouterContent = () => {
  // Track page views on route changes
  usePageTracking();

  return (
    <Routes>
      {NavItems.map(({ label, route, Element }) => {
        return (
          <Route
            key={label}
            path={route}
            element={<Element />}
          />
        );
      })}
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
    </Routes>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
};

export default Router;
