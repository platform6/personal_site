/**
 * Converts hours to hh:mm:ss format
 * @param {number} hours - The number of hours to format
 * @returns {string} Formatted time string in hh:mm:ss format
 */
export const formatHoursToTime = (hours) => {
  const totalSeconds = Math.round(hours * 3600);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};
