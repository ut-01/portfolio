/**
 * Ensures data fetching takes at least a minimum duration
 * This keeps the loader visible for a smooth UX
 *
 * @param {Function} fetchFn - Async function that fetches data
 * @param {number} minDuration - Minimum duration in milliseconds (default: 1500ms)
 * @returns {Promise} - Resolves with the fetched data after minimum duration
 */
export const withMinimumDelay = async (fetchFn, minDuration = 1500) => {
  const minDelay = new Promise(resolve => setTimeout(resolve, minDuration));
  const [result] = await Promise.all([fetchFn(), minDelay]);
  return result;
};

/**
 * Fetches multiple data sources with minimum delay
 * Ensures all fetches complete and minimum duration is met
 *
 * @param {Array<Function>} fetchFunctions - Array of async fetch functions
 * @param {number} minDuration - Minimum duration in milliseconds (default: 1500ms)
 * @returns {Promise<Array>} - Array of results from each fetch function
 */
export const fetchWithMinimumDelay = async (fetchFunctions, minDuration = 1500) => {
  const minDelay = new Promise(resolve => setTimeout(resolve, minDuration));
  const results = await Promise.all([...fetchFunctions.map(fn => fn()), minDelay]);
  // Remove the minDelay result (last item) and return only data
  return results.slice(0, -1);
};
