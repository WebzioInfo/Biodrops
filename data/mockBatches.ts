export interface WaterQualityReport {
  phLevel: string;
  tds: string;
  uvSterilized: boolean;
  ozoneTreated: boolean;
  microbiologyStatus: string;
}

export interface BatchDetails {
  batchNumber: string;
  manufacturer: {
    name: string;
    location: string;
    dateOfManufacturing: string;
  };
  expiry: {
    bestBefore: string;
    shelfLife: string;
  };
  licenses: {
    fssai: string;
    bis: string;
    bqms: string;
  };
  reports: WaterQualityReport;
}

export const mockBatches: Record<string, BatchDetails> = {
  "BD-2026-06A": {
    batchNumber: "BD-2026-06A",
    manufacturer: {
      name: "Biofix Technology LLP",
      location: "MC Building, Bypass Road, Kondotty, Kerala 673638",
      dateOfManufacturing: "June 1, 2026",
    },
    expiry: {
      bestBefore: "December 1, 2026",
      shelfLife: "6 Months from Date of Manufacturing",
    },
    licenses: {
      fssai: "Lic No. 11322010000XXX",
      bis: "CM/L - XXXXXXX",
      bqms: "BQMS Certified Facility",
    },
    reports: {
      phLevel: "7.4",
      tds: "45 ppm",
      uvSterilized: true,
      ozoneTreated: true,
      microbiologyStatus: "Clear (No Coliform/E.Coli detected)",
    },
  },
  "BD-2026-06B": {
    batchNumber: "BD-2026-06B",
    manufacturer: {
      name: "Biofix Technology LLP",
      location: "MC Building, Bypass Road, Kondotty, Kerala 673638",
      dateOfManufacturing: "June 2, 2026",
    },
    expiry: {
      bestBefore: "December 2, 2026",
      shelfLife: "6 Months from Date of Manufacturing",
    },
    licenses: {
      fssai: "Lic No. 11322010000XXX",
      bis: "CM/L - XXXXXXX",
      bqms: "BQMS Certified Facility",
    },
    reports: {
      phLevel: "7.3",
      tds: "42 ppm",
      uvSterilized: true,
      ozoneTreated: true,
      microbiologyStatus: "Clear (No Coliform/E.Coli detected)",
    },
  },
  "AQ-2026-08C": {
    batchNumber: "AQ-2026-08C",
    manufacturer: {
      name: "Aqua Pure Waters",
      location: "Industrial Estate, Palakkad, Kerala 678001",
      dateOfManufacturing: "August 10, 2026",
    },
    expiry: {
      bestBefore: "February 10, 2027",
      shelfLife: "6 Months from Date of Manufacturing",
    },
    licenses: {
      fssai: "Lic No. 11321010000YYY",
      bis: "CM/L - YYYYYYY",
      bqms: "BQMS Certified Facility",
    },
    reports: {
      phLevel: "7.2",
      tds: "38 ppm",
      uvSterilized: true,
      ozoneTreated: true,
      microbiologyStatus: "Clear (No Coliform/E.Coli detected)",
    },
  },
};
