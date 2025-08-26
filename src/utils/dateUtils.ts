/**
 * Utility functions for date handling in the order management system
 */

/**
 * Parses a date string in DD/MM/YYYY format and returns a Date object
 * @param dateStr - Date string in format "DD/MM/YYYY" (e.g., "26/08/2025")
 * @returns Date object
 */
export function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/");
  return new Date(`${year}-${month}-${day}`);
}

/**
 * Formats a date for display using the locale's date format
 * @param dateStr - Date string in DD/MM/YYYY format
 * @returns Formatted date string for display
 */
export function formatDateForDisplay(dateStr: string): string {
  try {
    return parseDate(dateStr).toLocaleDateString();
  } catch (error) {
    console.error('Error parsing date:', dateStr, error);
    return dateStr; // Return original string if parsing fails
  }
}

/**
 * Sorts orders by dateIssued in descending order (newest first)
 * @param orders - Array of orders to sort
 * @returns Sorted array of orders
 */
export function sortOrdersByDateIssued<T extends { dateIssued: string }>(orders: T[]): T[] {
  return [...orders].sort((a, b) => {
    try {
      const dateA = parseDate(a.dateIssued);
      const dateB = parseDate(b.dateIssued);
      return dateB.getTime() - dateA.getTime(); // Descending order (newest first)
    } catch (error) {
      console.error('Error sorting orders by date:', error);
      return 0; // Keep original order if sorting fails
    }
  });
}
