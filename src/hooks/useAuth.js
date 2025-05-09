// src/hooks/useAuth.js
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  authWithGoogle,
  authWithFacebook,
} from "../firebase/providers";
import { getSpotifyAuthUrl } from "../utils/spotifyAuth";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const navigate               = useNavigate();

  const handleEmailLogin = useCallback(
    async (email, password) => {
      setLoading(true);
      setError("");
      const resp = await loginUser(email, password);
      setLoading(false);
      if (!resp.ok) {
        setError(resp.errorMessage);
      } else {
        navigate("/loading");
      }
    },
    [navigate]
  );

  const handleGoogleLogin = useCallback(async () => {
    setLoading(true);
    setError("");
    const resp = await authWithGoogle();
    setLoading(false);
    if (!resp.ok) {
      setError(resp.errorMessage);
    } else {
      navigate("/loading");
    }
  }, [navigate]);

  const handleFacebookLogin = useCallback(async () => {
    setLoading(true);
    setError("");
    const resp = await authWithFacebook();
    setLoading(false);
    if (!resp.ok) {
      setError(resp.errorMessage);
    } else {
      navigate("/loading");
    }
  }, [navigate]);

  const handleSpotifyLogin = useCallback(async () => {
    setError("");
    try {
      const url = await getSpotifyAuthUrl();
      window.location.href = url;
    } catch (err) {
      setError("Error iniciando sesión con Spotify");
    }
  }, []);

  return {
    loading,
    error,
    handleEmailLogin,
    handleGoogleLogin,
    handleFacebookLogin,
    handleSpotifyLogin,
  };
}
