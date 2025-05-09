
// Configuración de Spotify
export const CLIENT_ID = "b6ade35c8dd148af96d03f54990b141a";
export const REDIRECT_URI = `${window.location.origin}/callback`;
const SCOPES = [
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "user-top-read",
];


if (!CLIENT_ID || !REDIRECT_URI) {
  throw new Error("❌ CLIENT_ID o REDIRECT_URI no están definidos.");
}

/**
 * Convierte un ArrayBuffer a base64 URL-safe
 * @param {ArrayBuffer} buffer
 * @returns {string} Base64 URL-safe
 */
function base64URLEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Genera un random string para code_verifier
 * @param {number} length 
 * @returns {string} 
 */
function generateRandomString(length = 128) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, dec => dec.toString(36)).join("").slice(0, length);
}

/**
 
 * @param {string} codeVerifier
 * @returns {Promise<string>} 
 */
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64URLEncode(digest);
}

/**
 * Genera la URL de autorización de Spotify 
 * @returns {Promise<string>} 
 */
export async function getSpotifyAuthUrl() {
  const codeVerifier = generateRandomString();
  localStorage.setItem("spotify_code_verifier", codeVerifier);

  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES.join(" "),
    redirect_uri: REDIRECT_URI,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}
