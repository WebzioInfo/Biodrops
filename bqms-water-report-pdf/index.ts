/**
 * BQMS Water Quality Report PDF Module
 * Complete, self-contained export package for Biodrops.
 */

// Core generator
export { generateReportDefinition } from './core';
export { PDF_COLORS, PDF_FONTS, PDF_STYLES } from './core/PDFTheme';
export { getReportHeader } from './core/ReportHeader';
export { getReportInfo } from './core/ReportInfo';
export { getSectionHeader } from './core/SectionHeader';
export { getParameterTable, METHOD_MAP } from './core/ParameterTable';
export { getStatusBadge } from './core/StatusBadge';
export { getSignatureSection } from './core/SignatureSection';
export { getRemarksSection } from './core/RemarksSection';
export { getReportFooter } from './core/Footer';
export { getWatermark } from './core/Watermark';

// Assets
export { PDF_IMAGES } from './assets/images';

// Types & Data Contracts
export * from './types/report.types';

// High-level utilities
export {
  generateWaterReportPdfBuffer,
  downloadWaterReportPdf,
  getWaterReportDocumentDefinition
} from './utils/generator';

export { formatReportDataFromContract } from './utils/formatters';
export { STATIC_PARAMETERS } from './utils/staticParameters';
