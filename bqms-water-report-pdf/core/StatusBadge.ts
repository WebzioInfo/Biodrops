import { PDF_COLORS } from './PDFTheme';

export function getStatusBadge(status: string) {
  const cleanStatus = (status || '').trim().toUpperCase();
  
  let color = PDF_COLORS.neutral;
  let text = status || '—';
  let isItalic = false;
  let isBold = true;

  if (cleanStatus === 'PASS' || cleanStatus === 'APPROVED' || cleanStatus === 'WITHIN LIMIT' || cleanStatus === 'WITHIN LIMITS') {
    color = PDF_COLORS.pass;
    text = cleanStatus === 'PASS' ? '✔ PASS' : (cleanStatus === 'WITHIN LIMITS' || cleanStatus === 'WITHIN LIMIT' ? '✓ PASS' : status);
  } else if (cleanStatus === 'FAIL' || cleanStatus === 'REJECTED' || cleanStatus === 'ABOVE LIMIT' || cleanStatus === 'ABOVE LIMITS' || cleanStatus === 'ABOVE MAXIMUM') {
    color = PDF_COLORS.fail;
    text = cleanStatus === 'FAIL' ? '✘ FAIL' : status;
  } else if (cleanStatus === 'BELOW LIMIT' || cleanStatus === 'BELOW LIMITS' || cleanStatus === 'BELOW MINIMUM' || cleanStatus === 'WARNING') {
    color = PDF_COLORS.warning;
    text = status;
  } else if (cleanStatus === 'NOT TESTED' || cleanStatus === 'NOT ENTERED') {
    color = PDF_COLORS.neutral;
    text = status || 'NOT TESTED';
    isItalic = true;
    isBold = false;
  } else if (cleanStatus === '—' || cleanStatus === '' || cleanStatus === 'NULL' || cleanStatus === 'UNDEFINED') {
    color = PDF_COLORS.neutral;
    text = '—';
    isItalic = false;
    isBold = false;
  } else {
    color = PDF_COLORS.neutral;
    text = status;
    isBold = false;
  }

  return {
    text,
    color,
    bold: isBold,
    italic: isItalic,
    fontSize: 7,
    alignment: 'center'
  };
}
