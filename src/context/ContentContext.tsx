import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getContent,
  initContent,
  saveContent,
  resetContentToDefault,
  subscribeToContent,
  syncFromFirestore,
  syncToFirestore,
} from "../lib/contentStore";
import type { DefaultSiteContent, PageSEO } from "../lib/defaultSiteContent";

interface ContentContextValue {
  content: DefaultSiteContent;
  updateContent: (updated: Partial<DefaultSiteContent>) => void;
  updateSEO: (pageKey: string, seo: Partial<PageSEO>) => void;
  resetDefaults: () => void;
  syncFromCloud: () => Promise<{ success: boolean; message: string }>;
  syncToCloud: () => Promise<{ success: boolean; message: string }>;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<DefaultSiteContent>(() => initContent());

  useEffect(() => {
    // Re-init on client mount to load stored values from localStorage
    setContent(initContent());
    const unsubscribe = subscribeToContent((newContent) => {
      setContent({ ...newContent });
    });
    return unsubscribe;
  }, []);

  const updateContent = (updated: Partial<DefaultSiteContent>) => {
    saveContent(updated);
  };

  const updateSEO = (pageKey: string, seo: Partial<PageSEO>) => {
    const existing = content.seo[pageKey] || {
      title: "",
      description: "",
      keywords: "",
    };
    saveContent({
      seo: {
        ...content.seo,
        [pageKey]: {
          ...existing,
          ...seo,
        },
      },
    });
  };

  const resetDefaults = () => {
    resetContentToDefault();
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        updateSEO,
        resetDefaults,
        syncFromCloud: syncFromFirestore,
        syncToCloud: syncToFirestore,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    // Graceful fallback if rendered outside provider (e.g. static tests)
    return {
      content: getContent(),
      updateContent: (updated) => saveContent(updated),
      updateSEO: () => {},
      resetDefaults: () => resetContentToDefault(),
      syncFromCloud: async () => ({ success: false, message: "No provider" }),
      syncToCloud: async () => ({ success: false, message: "No provider" }),
    };
  }
  return ctx;
}
