import { useState, useEffect } from 'react';

/**
 * Fetches data from the Spotify Web API.
 * @param {string} endpoint - The API endpoint to fetch from.
 * @param {string} method - The HTTP method to use (e.g., 'GET', 'POST').
 * @param {object} body - The request body (for POST, PUT, etc.).
 * @param {string} token - The Spotify API authorization token.
 * @returns {Promise<object>} A promise that resolves with the API response JSON.
 */
async function fetchWebApi(endpoint, method, body, token) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.status}`);
  }
  return await res.json();
}

/**
 * Fetches the current user's top tracks from the Spotify API.
 * @param {string} token - The Spotify API authorization token.
 * @returns {Promise<Array<object>>} A promise that resolves with an array of top track objects.
 */
async function getTopTracks(token) {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET', null, token
  )).items;
}


/**
 * A React hook to fetch the current user's top tracks from the Spotify API.
 * @param {string} token - The Spotify API authorization token.
 * @returns {{topTracks: Array<object> | null, loading: boolean, error: Error | null}} An object containing the top tracks, loading state, and error state.
 */
const useSpotifyTopTracks = (token) => {
  const [topTracks, setTopTracks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const tracks = await getTopTracks(token);
        setTopTracks(tracks);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [token]);

  return { topTracks, loading, error };
};

export default useSpotifyTopTracks;