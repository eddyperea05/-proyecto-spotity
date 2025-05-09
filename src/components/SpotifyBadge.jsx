// src/components/SpotifyBadge.jsx
import { useEffect, useState } from "react";
import { getSpotifyAccessToken, clearSpotifyTokens } from "../services/spotifyService";

export default function SpotifyBadge() {
  const [status, setStatus] = useState("checking"); // checking | connected | disconnected | error
  const [spotifyUser, setSpotifyUser] = useState(null);

  useEffect(() => {
    const fetchSpotifyUser = async () => {
      const token = await getSpotifyAccessToken();
      if (!token) {
        setStatus("disconnected");
        return;
      }

      try {
        const res = await fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          // Token caducado o inválido
          clearSpotifyTokens();
          setStatus("disconnected");
        } else if (res.status === 403) {
          // Permisos insuficientes
          console.error("Error 403: Permisos insuficientes. Verifica los scopes.");
          setStatus("error");
        } else if (res.ok) {
          const data = await res.json();
          setSpotifyUser(data);
          setStatus("connected");
        } else {
          const errorData = await res.json();
          console.error("Error al obtener datos de Spotify:", errorData);
          setStatus("error");
        }
      } catch (err) {
        console.error("Error en la solicitud a Spotify:", err);
        setStatus("error");
      }
    };

    fetchSpotifyUser();
  }, []);

  if (status === "checking") {
    return (
      <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">
        ⏳ Verificando Spotify...
      </span>
    );
  }

  if (status === "connected" && spotifyUser) {
    const avatarUrl = spotifyUser.images?.[0]?.url || "";
    const displayName = spotifyUser.display_name || "Usuario desconocido";
    const email = spotifyUser.email || "Correo no disponible";

    return (
      <div className="flex flex-col items-center gap-2">
        <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800 border border-green-300">
          🎵 Spotify conectado
        </span>
        <div className="flex flex-col items-center">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Spotify Avatar"
              className="w-20 h-20 rounded-full"
            />
          )}
          <p className="text-sm font-medium">{displayName}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </div>
    );
  }

  if (status === "disconnected") {
    return (
      <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800 border border-red-300">
        ❌ Spotify no vinculado
      </span>
    );
  }

  if (status === "error") {
    return (
      <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
        ⚠️ Error al validar Spotify
      </span>
    );
  }

  return null;
}
