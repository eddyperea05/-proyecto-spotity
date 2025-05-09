import { useState, useEffect } from 'react';
import {
  getSpotifyAccessToken,
  clearSpotifyTokens
} from '../services/spotifyService';

const INITIAL_STATUS = 'checking'; // checking | connected | disconnected | error

export default function useSpotifyUser() {
  const [status, setStatus] = useState(INITIAL_STATUS);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const token = await getSpotifyAccessToken();
      if (!token) {
        setStatus('disconnected');
        return;
      }

      try {
        const res = await fetch('https://api.spotify.com/v1/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        switch (res.status) {
          case 401:
            clearSpotifyTokens();
            setStatus('disconnected');
            break;
          case 403:
            console.warn('Forbidden: check your Spotify scopes');
            setStatus('error');
            break;
          default:
            if (res.ok) {
              const data = await res.json();
              setUser(data);
              setStatus('connected');
            } else {
              const err = await res.json();
              console.error('Spotify API error:', err);
              setStatus('error');
            }
        }
      } catch (err) {
        console.error('Network error while fetching Spotify user:', err);
        setStatus('error');
      }
    }

    fetchUser();
  }, []);

  return { status, user };
}
