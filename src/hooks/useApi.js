import { useState, useEffect } from 'react';

const useApi = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWithRetry = async (retryCount = 0) => {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        // Get the retry-after header or default to 1 second
        const retryAfter = parseInt(response.headers.get('Retry-After')) || 1;
        
        if (retryCount < 3) { // Maximum 3 retries
          // Wait for the specified time
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          // Retry the request
          return fetchWithRetry(retryCount + 1);
        }
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchWithRetry();
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};

export default useApi;