/**
 * Currency parsing utilities
 * Converts formatted currency strings (with £, commas, parentheses) to numeric values
 */

/**
 * Parse currency text to numeric value
 * Handles: £1,234.56, (1234.56), negative values with - or ()
 * @param text - Formatted currency string (e.g., "£-600.00", "(600)")
 * @returns Numeric value (negative if indicated)
 */
export function parseCurrencyValue(text: string): number {
  const isNegative =
    text.includes('-') || (text.startsWith('(') && text.endsWith(')'));
  const cleaned = text.replace(/[£,\s\-()/]/g, '');
  const value = parseFloat(cleaned) || 0;
  return isNegative ? -value : value;
}
