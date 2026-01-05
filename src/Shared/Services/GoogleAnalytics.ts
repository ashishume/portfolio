// Google Analytics utility functions
// Note: Google Analytics is initialized in index.html head section

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: {
        page_path?: string;
        page_title?: string;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

// Store the tracking ID (from index.html)
const GA_TRACKING_ID = "G-PL27FYTMST";

/**
 * Track page view
 */
export const trackPageView = (path: string, title?: string) => {
  if (!window.gtag) {
    return;
  }

  window.gtag("config", GA_TRACKING_ID, {
    page_path: path,
    page_title: title || document.title,
  });
};

/**
 * Track custom events
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!window.gtag) {
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
