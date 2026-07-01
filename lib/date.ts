/**
 * Parses an ISO date string (YYYY-MM-DD) into a Date object in the local timezone,
 * avoiding any UTC/timezone shift issues.
 */
export function parseISODate(dateStr: string | null | undefined): Date | null {
  if (!dateStr) return null;
  const match = dateStr.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  }
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1; // 0-indexed
  const day = parseInt(match[3], 10);
  return new Date(year, month, day);
}

/**
 * Parses a shelf life string to extract the number of months.
 * Defaults to 6 months if parsing fails or input is empty.
 */
export function parseShelfLifeMonths(shelfLifeStr: string | null | undefined): number {
  if (!shelfLifeStr) return 6;
  
  const cleanStr = shelfLifeStr.trim().toLowerCase();
  
  // Year match
  const yearMatch = cleanStr.match(/(\d+)\s*year/);
  if (yearMatch) {
    return parseInt(yearMatch[1], 10) * 12;
  }
  
  // Month match
  const monthMatch = cleanStr.match(/(\d+)\s*month/);
  if (monthMatch) {
    return parseInt(monthMatch[1], 10);
  }
  
  // Check for pure number
  const numMatch = cleanStr.match(/^\d+$/);
  if (numMatch) {
    return parseInt(cleanStr, 10);
  }
  
  return 6;
}

/**
 * Adds a specified number of months to a Date object, handling
 * leap years and month-end overflows correctly.
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date.getTime());
  const originalDay = result.getDate();
  result.setMonth(result.getMonth() + months);
  
  // If the target month has fewer days than originalDay,
  // JS setMonth overflows into the next month. We adjust to the end of the correct month.
  if (result.getDate() < originalDay) {
    result.setDate(0);
  }
  
  return result;
}

/**
 * Formats a Date object into "Month Day, Year" format (e.g., January 1, 2027).
 */
export function formatReadableDate(date: Date | null): string {
  if (!date) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Main helper to calculate dynamic Expiry and Best Before info.
 */
export function calculateExpiryInfo(
  mfgDateStr: string | null | undefined,
  apiShelfLife: string | null | undefined
): { shelfLife: string; bestBefore: string } {
  // Resolve Shelf Life display string
  const resolvedShelfLife = apiShelfLife && apiShelfLife.trim() !== "" ? apiShelfLife : "6 Months";
  
  // Parse Manufacturing Date
  const mfgDate = parseISODate(mfgDateStr);
  if (!mfgDate) {
    return {
      shelfLife: resolvedShelfLife,
      bestBefore: "—",
    };
  }
  
  // Parse Months and Calculate Best Before
  const months = parseShelfLifeMonths(resolvedShelfLife);
  const bestBeforeDate = addMonths(mfgDate, months);
  
  return {
    shelfLife: resolvedShelfLife,
    bestBefore: formatReadableDate(bestBeforeDate),
  };
}
