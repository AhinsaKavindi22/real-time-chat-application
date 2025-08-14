/**
 * Formats a date into a 24-hour time string (HH:mm format)
 * @param {Date|string|number} date - The date to format. Can be a Date object, timestamp, or date string
 * @returns {string} Formatted time string in 24-hour format (e.g., "14:30")
 */
export function formatMessgeTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",    // Display hours in 2 digits (e.g., "14" instead of "2")
        minute: "2-digit",  // Display minutes in 2 digits (e.g., "05" instead of "5")
        hour12: false,      // Use 24-hour format instead of AM/PM
    })
}