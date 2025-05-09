// src/services/spotifyService.js
const STORAGE_KEY = "spotify_token_data";

/**
 * Guarda los tokens en localStorage junto con su expiración (ms desde epoch)
 */
export function cacheSpotifyTokens({ access_token, refresh_token, expires_in }) {
  const expires_at = Date.now() + expires_in * 1000;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ access_token, refresh_token, expires_at })
  );
}

/**
 * Limpia los tokens de localStorage
 */
export function clearSpotifyTokens() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Obtiene un access_token válido (renueva si ya expiró).
 * @returns {Promise<string|null>}
 */
export async function getSpotifyAccessToken() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  const { access_token, refresh_token, expires_at } = JSON.parse(raw);

  // Si el token sigue siendo válido, lo devolvemos
  if (Date.now() < expires_at - 60000) {
    return access_token;
  }

  // Si el token expiró, intentamos renovarlo
  try {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      client_id: "b6ade35c8dd148af96d03f54990b141a",
    });

    const resp = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const data = await resp.json();
    if (!data.access_token) {
      // Si falla, limpiamos y devolvemos null
      clearSpotifyTokens();
      return null;
    }

    // Cacheamos de nuevo (nota: Spotify solo devuelve refresh_token en la primera vez)
    cacheSpotifyTokens({
      access_token: data.access_token,
      refresh_token: data.refresh_token || refresh_token,
      expires_in: data.expires_in,
    });

    return data.access_token;
  } catch (err) {
    console.error("Error al renovar el token de Spotify:", err);
    clearSpotifyTokens();
    return null;
  }
}
