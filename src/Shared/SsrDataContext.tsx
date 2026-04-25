/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext } from "react";
import type { IBlog } from "./blogData";

export interface SeoData {
  title: string;
  description: string;
  canonicalPath: string;
  type?: "website" | "article";
}

export interface SsrData {
  blogPosts?: IBlog[];
  blogContentBySlug?: Record<string, string | null>;
  statusCode?: number;
  seo?: SeoData;
}

declare global {
  interface Window {
    __SSR_DATA__?: SsrData;
  }
}

const SsrDataContext = createContext<SsrData>({});

export function SsrDataProvider({
  children,
  data,
}: {
  children: ReactNode;
  data?: SsrData;
}) {
  return (
    <SsrDataContext.Provider value={data || {}}>
      {children}
    </SsrDataContext.Provider>
  );
}

export function useSsrData(): SsrData {
  return useContext(SsrDataContext);
}

export function getClientSsrData(): SsrData {
  if (typeof window === "undefined") {
    return {};
  }

  return window.__SSR_DATA__ || {};
}
