// src/spotifyAuth.js

export const CLIENT_ID = "b6ade35c8dd148af96d03f54990b141a";
export const REDIRECT_URI = `${window.location.origin}/callback`;
const SCOPES = [
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "user-top-read",
];

// Convierte un ArrayBuffer a base64 URL-safe
function base64URLEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Genera un random string para code_verifier
function generateRandomString(length = 128) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, dec => dec.toString(36)).join("").slice(0, length);
}

// Hashea el code_verifier para obtener code_challenge
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64URLEncode(digest);
}

// Exporta la URL de autorización de Spotify (PKCE)
export async function getSpotifyAuthUrl() {
  const codeVerifier = generateRandomString();
  localStorage.setItem("spotify_code_verifier", codeVerifier);

  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const params = new URLSearchParams({
    response_type:         "code",
    client_id:             CLIENT_ID,
    scope:                 SCOPES.join(" "),
    redirect_uri:          REDIRECT_URI,
    code_challenge_method: "S256",
    code_challenge:        codeChallenge,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}
