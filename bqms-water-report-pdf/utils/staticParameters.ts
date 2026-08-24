import { ParameterDef } from '../types/report.types';

export const STATIC_PARAMETERS: ParameterDef[] = [
  // Physical & Chemical
  { id: "pH", name: "pH", category: "PHYSICAL", unit: "—", minAcceptable: 6.0, maxAcceptable: 8.5 },
  { id: "TDS", name: "TDS", category: "PHYSICAL", unit: "mg/L", minAcceptable: 0, maxAcceptable: 500 },
  { id: "Turbidity", name: "Turbidity", category: "PHYSICAL", unit: "NTU", minAcceptable: 0, maxAcceptable: 1 },
  { id: "Sulphate", name: "Sulphate", category: "CHEMICAL", unit: "mg/L", minAcceptable: 0, maxAcceptable: 200 },
  { id: "Colour", name: "Colour", category: "PHYSICAL", unit: "Descriptor", minAcceptable: 0, maxAcceptable: 0 },
  { id: "Odour", name: "Odour", category: "PHYSICAL", unit: "Descriptor", minAcceptable: 0, maxAcceptable: 0 },
  { id: "Taste", name: "Taste", category: "PHYSICAL", unit: "Descriptor", minAcceptable: 0, maxAcceptable: 0 },
  { id: "Residual Free Chlorine", name: "Residual Free Chlorine", category: "CHEMICAL", unit: "mg/L", minAcceptable: null, maxAcceptable: 0.2 },
  { id: "Alkalinity", name: "Alkalinity", category: "CHEMICAL", unit: "mg/L", minAcceptable: 0, maxAcceptable: 200 },
  { id: "Chloride", name: "Chloride", category: "CHEMICAL", unit: "mg/L", minAcceptable: 0, maxAcceptable: 250 },

  // Microbiology
  { id: "E.coli", name: "E.coli", category: "MICROBIOLOGY", unit: "CFU/100ml", minAcceptable: 0, maxAcceptable: 0 },
  { id: "Coliform", name: "Coliform", category: "MICROBIOLOGY", unit: "CFU/100ml", minAcceptable: 0, maxAcceptable: 0 },
  { id: "Pseudomonas", name: "Pseudomonas", category: "MICROBIOLOGY", unit: "CFU/250ml", minAcceptable: 0, maxAcceptable: 0 },
  { id: "Clostridia", name: "Clostridia", category: "MICROBIOLOGY", unit: "CFU/100ml", minAcceptable: 0, maxAcceptable: 0 },
  { id: "Aerobic Microbial Count 22°C", name: "Aerobic Microbial Count 22°C", category: "MICROBIOLOGY", unit: "CFU/ml", minAcceptable: 0, maxAcceptable: 100 },
  { id: "Aerobic Microbial Count 37°C", name: "Aerobic Microbial Count 37°C", category: "MICROBIOLOGY", unit: "CFU/ml", minAcceptable: 0, maxAcceptable: 20 },
  { id: "Yeast & Mold", name: "Yeast & Mold", category: "MICROBIOLOGY", unit: "CFU/100ml", minAcceptable: 0, maxAcceptable: 0 },
];
