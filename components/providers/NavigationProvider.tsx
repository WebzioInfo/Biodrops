"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface NavigationContextType {
  isNavigating: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  executeAsync: <T>(asyncFn: () => Promise<T>) => Promise<T>;
}

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
  startLoading: () => {},
  stopLoading: () => {},
  executeAsync: async (fn) => await fn(),
});

export const useNavigationLoader = () => useContext(NavigationContext);

function NavigationTracker({ onPageChange }: { onPageChange: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // When Next.js App Router completes route rendering, stop loader
    onPageChange();
  }, [pathname, searchParams, onPageChange]);

  return null;
}

export default function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [, startTransition] = useTransition();

  const startLoading = useCallback(() => setIsNavigating(true), []);
  const stopLoading = useCallback(() => setIsNavigating(false), []);

  const executeAsync = useCallback(async <T,>(asyncFn: () => Promise<T>): Promise<T> => {
    startLoading();
    try {
      return await asyncFn();
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    // Intercept clicks on internal navigation links
    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

      const isExternal =
        target.getAttribute("target") === "_blank" ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:");

      if (!isExternal && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        const currentPath = window.location.pathname;
        const targetPath = href.split("?")[0].split("#")[0];

        if (targetPath && targetPath !== currentPath) {
          startTransition(() => {
            setIsNavigating(true);
          });
        }
      }
    };

    const handleFormSubmit = () => {
      startLoading();
    };

    document.addEventListener("click", handleAnchorClick, true);
    document.addEventListener("submit", handleFormSubmit, true);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      document.removeEventListener("submit", handleFormSubmit, true);
    };
  }, [startLoading]);

  return (
    <NavigationContext.Provider
      value={{
        isNavigating,
        startLoading,
        stopLoading,
        executeAsync,
      }}
    >
      <React.Suspense fallback={null}>
        <NavigationTracker onPageChange={stopLoading} />
      </React.Suspense>
      {/* Children rendered directly without mutating DOM wrappers to prevent full-tree re-renders */}
      {children}
    </NavigationContext.Provider>
  );
}
