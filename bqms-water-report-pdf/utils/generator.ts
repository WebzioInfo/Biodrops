import { generateReportDefinition } from '../core';
import { WaterReportData, WaterReportInputContract } from '../types/report.types';
import { formatReportDataFromContract } from './formatters';

/**
 * Normalizes input (contract or raw table data) into WaterReportData
 */
function normalizeReportData(input: WaterReportData | WaterReportInputContract): WaterReportData {
  if ('headers' in input && 'rows' in input) {
    return input as WaterReportData;
  }
  return formatReportDataFromContract(input as WaterReportInputContract);
}

/**
 * Returns the raw PDFMake document definition object.
 */
export function getWaterReportDocumentDefinition(input: WaterReportData | WaterReportInputContract): any {
  const data = normalizeReportData(input);
  return generateReportDefinition(data);
}

/**
 * SERVER-SIDE: Generates the PDF as a binary Buffer (for Next.js API Routes, Server Actions, or Node scripts).
 */
export async function generateWaterReportPdfBuffer(input: WaterReportData | WaterReportInputContract): Promise<Buffer> {
  const pdfMakeModule = await import('pdfmake/build/pdfmake');
  const pdfFontsModule = await import('pdfmake/build/vfs_fonts');

  const pm = (pdfMakeModule.default || pdfMakeModule) as any;
  const pf = (pdfFontsModule.default || pdfFontsModule) as any;

  if (pm && pf) {
    const vfsObj = pf.pdfMake ? pf.pdfMake.vfs : pf;
    pm.vfs = pm.vfs || {};
    Object.assign(pm.vfs, vfsObj);

    pm.fonts = pm.fonts || {};
    Object.assign(pm.fonts, {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      }
    });

    if (typeof global !== 'undefined') {
      // @ts-ignore
      global.pdfMake = pm;
      // @ts-ignore
      global.pdfMake.vfs = pm.vfs;
      // @ts-ignore
      global.pdfMake.fonts = pm.fonts;
    }
  }

  const documentDefinition = getWaterReportDocumentDefinition(input);
  const pdfDocGenerator = pm.createPdf(
    documentDefinition,
    undefined,
    pm.fonts,
    pm.vfs
  );

  const buffer = await pdfDocGenerator.getBuffer();
  return buffer;
}

/**
 * CLIENT-SIDE: Generates and automatically triggers download of the PDF in the browser.
 */
export async function downloadWaterReportPdf(
  input: WaterReportData | WaterReportInputContract,
  filename?: string
): Promise<void> {
  const pdfMakeModule = await import('pdfmake/build/pdfmake');
  const pdfFontsModule = await import('pdfmake/build/vfs_fonts');

  const pdfMake = (pdfMakeModule.default || pdfMakeModule) as any;
  const pdfFonts = (pdfFontsModule.default || pdfFontsModule) as any;

  if (pdfMake && pdfFonts && pdfFonts.pdfMake) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  const data = normalizeReportData(input);
  const documentDefinition = generateReportDefinition(data);

  const batchNo = data.metadata?.['Batch Number'] || data.metadata?.['Sample Code'] || 'report';
  const outName = filename || `water_report_${batchNo}.pdf`;

  pdfMake.createPdf(documentDefinition).download(outName);
}
