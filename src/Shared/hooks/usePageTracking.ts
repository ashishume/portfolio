import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../Services/GoogleAnalytics";

/**
 * Hook to track page views on route changes
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    trackPageView(location.pathname + location.search);
  }, [location]);
};
