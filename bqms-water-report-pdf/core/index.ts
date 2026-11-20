import { PDF_STYLES } from './PDFTheme';
import { getReportHeader } from './ReportHeader';
import { getReportInfo } from './ReportInfo';
import { getSectionHeader } from './SectionHeader';
import { getParameterTable } from './ParameterTable';
import { getSignatureSection } from './SignatureSection';
import { getRemarksSection } from './RemarksSection';
import { getReportFooter } from './Footer';
import { getWatermark } from './Watermark';
import { WaterReportData } from '../types/report.types';

export function generateReportDefinition(data: WaterReportData): any {
  const metadata = data.metadata || {};
  const batchNumber = metadata['Batch Number'] || '—';

  // 1. Group parameters by category and build tables
  const physicalTable = getParameterTable(data.rows, 'PHYSICAL');
  const chemicalTable = getParameterTable(data.rows, 'CHEMICAL');
  const microbiologyTable = getParameterTable(data.rows, 'MICROBIOLOGY');

  const content: any[] = [];

  // 1. Report Information Block (placed at the top of Page 1)
  content.push(getReportInfo(metadata));

  // 2. Physical & Chemical Parameters (Page 1)
  if (physicalTable) {
    content.push(getSectionHeader('Physical Parameters'));
    content.push(physicalTable);
  }

  if (chemicalTable) {
    content.push(getSectionHeader('Chemical Parameters'));
    content.push(chemicalTable);
  }

  // 3. Microbiological Parameters (Cleanly starts Page 2)
  if (microbiologyTable) {
    const microHeader = getSectionHeader('Microbiological Parameters') as any;
    microHeader.pageBreak = 'before';
    content.push(microHeader);
    content.push(microbiologyTable);
  }

  // 4. Authorized Signatories Section (Attached to Page 2 directly below Microbiological Parameters)
  const sigSection = getSignatureSection() as any;
  if (!microbiologyTable) {
    sigSection.pageBreak = 'before';
  }
  content.push(sigSection);

  // 5. Remarks Page (Page 3 - starts on a separate page if remarks exist)
  const remarksSection = getRemarksSection(metadata['Remarks']);
  if (remarksSection) {
    content.push(remarksSection);
  }

  return {
    pageType: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [36, 170, 36, 60], // Left, Top (170pt clears 156pt header), Right, Bottom
    header: function(currentPage: number) {
      return {
        stack: [
          getReportHeader(metadata)
        ],
        margin: [0, 0, 0, 0]
      };
    },
    background: getWatermark(),
    footer: getReportFooter(batchNumber),
    content: content,
    styles: PDF_STYLES.styles,
    defaultStyle: PDF_STYLES.defaultStyle
  };
}
