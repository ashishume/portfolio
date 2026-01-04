// Google Analytics utility functions

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

// Store the tracking ID after initialization
let gaTrackingId: string | null = null;

/**
 * Initialize Google Analytics
 */
export const initGA = (trackingId: string) => {
  if (!trackingId) {
    console.warn("Google Analytics tracking ID is not set");
    return;
  }

  // Store tracking ID for use in other functions
  gaTrackingId = trackingId;

  // Load the Google Analytics script
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script1);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag as any;

  gtag("js", new Date());
  gtag("config", trackingId, {
    page_path: window.location.pathname,
  });
};

/**
 * Track page view
 */
export const trackPageView = (path: string, title?: string) => {
  // Use the stored tracking ID from initialization
  const trackingId = gaTrackingId || import.meta.env.VITE_GA_TRACKING_ID;

  if (!trackingId || !window.gtag) {
    if (!trackingId) {
      console.warn("Google Analytics tracking ID is not set");
    }
    return;
  }

  window.gtag("config", trackingId, {
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
