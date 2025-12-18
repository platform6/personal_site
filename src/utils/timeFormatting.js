/**
 * Converts hours to hh:mm:ss format or "00 h 00 m 00 sec" format
 * @param {number} hours - The number of hours to format
 * @param {boolean} useLabels - If true, returns "00 h 00 m 00 sec" format; otherwise "hh:mm:ss"
 * @returns {string} Formatted time string
 */
export const formatHoursToTime = (hours, useLabels = false) => {
  const totalSeconds = Math.round(hours * 3600);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (useLabels) {
    if (h === 0) {
      return `${String(m).padStart(2, '0')} m ${String(s).padStart(2, '0')} s`;
    } else {
      return `${String(h).padStart(2, '0')} h ${String(m).padStart(2, '0')} m ${String(s).padStart(2, '0')} s`;
    }
  }

  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

/**
 * Converts hours to structured time data for rendering
 * @param {number} hours - The number of hours to format
 * @returns {Object} Object with hours, minutes, seconds as separate properties
 */
export const formatHoursToStructured = (hours) => {
  const totalSeconds = Math.round(hours * 3600);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return {
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
    hasHours: h > 0,
  };
};
