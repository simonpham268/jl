/**
 * Date utility functions
 */

/**
 * Format date as DD/MM/YYYY hh:mm AM/PM
 * @param date - Date to format (defaults to now)
 * @returns Formatted date string
 */
export function formatDateLogged(date: Date = new Date()): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${day}/${month}/${year} ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

/**
 * Format date as DD/MM/YYYY
 * @param date - Date to format (defaults to now)
 * @returns Formatted date string
 */
export function formatDate(date: Date = new Date()): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Format time as hh:mm AM/PM
 * @param date - Date to format (defaults to now)
 * @returns Formatted time string
 */
export function formatTime(date: Date = new Date()): string {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}
