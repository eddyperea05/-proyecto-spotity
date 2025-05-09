// src/pages/Callback.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate }            from "react-router-dom";
import { CLIENT_ID, REDIRECT_URI } from "../services/spotifyAuth";
import { cacheSpotifyTokens }     from "../services/spotifyService";

export default function Callback() {
  const [status, setStatus] = useState("Conectando con Spotify…");
  const navigate = useNavigate();
  const hasRunRef = useRef(false);

  useEffect(() => {
    // Evitamos doble ejecución
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    // LEEMOS el code y el verifier **una sola vez**
    const params       = new URLSearchParams(window.location.search);
    const code         = params.get("code");
    const codeVerifier = localStorage.getItem("spotify_code_verifier");

    // LIMPIAMOS ya el URL y el verifier para que NO estén en la 2ª pasada
    window.history.replaceState({}, "", REDIRECT_URI);
    localStorage.removeItem("spotify_code_verifier");

    if (!code || !codeVerifier) {
      setStatus("❌ Error: code o code_verifier no encontrados. Reinicia el flujo.");
      return;
    }

    (async () => {
      try {
        const body = new URLSearchParams({
          grant_type:    "authorization_code",
          code,
          redirect_uri:  REDIRECT_URI,
          client_id:     CLIENT_ID,
          code_verifier: codeVerifier,
        });

        const res  = await fetch("https://accounts.spotify.com/api/token", {
          method:  "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        });

        const data = await res.json();
        console.log("Spotify token response:", data);

        if (res.ok && data.access_token) {
          cacheSpotifyTokens(data);
          setStatus("✅ Spotify vinculado con éxito!");
          setTimeout(() => navigate("/profile"), 800);
        } else {
          console.error("Error de autenticación Spotify:", data);
          setStatus(
            data.error === "invalid_grant"
              ? "❌ Código inválido, reinicia el flujo."
              : `❌ ${data.error_description || "Falló la autenticación"}`
          );
        }
      } catch (err) {
        console.error("Error conectando a Spotify:", err);
        setStatus("❌ Error de red con Spotify.");
      }
    })();
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <h1>{status}</h1>
    </div>
  );
}
