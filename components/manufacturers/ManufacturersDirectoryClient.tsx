"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { fetchAquoraManufacturers, AquoraManufacturerDto } from "@/services/aquoraPublicApi";
import ManufacturerHero from "./ManufacturerHero";
import ManufacturerGrid from "./ManufacturerGrid";

export default function ManufacturersDirectoryClient() {
  const [manufacturers, setManufacturers] = useState<AquoraManufacturerDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;
    let active = true;

    fetchAquoraManufacturers({ pageSize: 100 }, controller.signal)
      .then((items) => {
        if (!active) return;
        setManufacturers(items || []);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!active) return;
        if (err instanceof Error && err.name === "AbortError") return;
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load certified manufacturing partners right now."
        );
      })
      .finally(() => {
        if (active && abortRef.current === controller) {
          setLoading(false);
          abortRef.current = null;
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [refreshTick]);

  const handleRetry = useCallback(() => {
    setLoading(true);
    setError(null);
    setRefreshTick((t) => t + 1);
  }, []);

  return (
    <>
      <ManufacturerHero partnerCount={!loading && !error ? manufacturers.length : undefined} />
      <ManufacturerGrid
        manufacturers={manufacturers}
        loading={loading}
        error={error}
        onRetry={handleRetry}
      />
    </>
  );
}

