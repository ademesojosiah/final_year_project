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

/**
 * Generates current date in DD/MM/YYYY format
 * @returns Current date string in DD/MM/YYYY format
 */
export function getCurrentDateString(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Calculates delivery schedule (one week after the given date)
 * @param fromDateStr - Starting date in DD/MM/YYYY format (defaults to current date)
 * @returns Delivery date string in DD/MM/YYYY format
 */
export function calculateDeliverySchedule(fromDateStr?: string): string {
  try {
    const startDate = fromDateStr ? parseDate(fromDateStr) : new Date();
    
    // Add 7 days (1 week) to the start date
    const deliveryDate = new Date(startDate);
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    
    // Format back to DD/MM/YYYY
    const day = String(deliveryDate.getDate()).padStart(2, '0');
    const month = String(deliveryDate.getMonth() + 1).padStart(2, '0');
    const year = deliveryDate.getFullYear();
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Error calculating delivery schedule:', error);
    // Fallback: return a week from now
    const fallbackDate = new Date();
    fallbackDate.setDate(fallbackDate.getDate() + 7);
    const day = String(fallbackDate.getDate()).padStart(2, '0');
    const month = String(fallbackDate.getMonth() + 1).padStart(2, '0');
    const year = fallbackDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
