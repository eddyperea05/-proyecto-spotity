const CLIENT_ID = "b6ade35c8dd148af96d03f54990b141a";
const REDIRECT_URI = `${window.location.origin}/callback`;


const SCOPES = [
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "user-top-read",
];

export const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${encodeURIComponent(SCOPES.join(" "))}&show_dialog=true`;
console.log(SPOTIFY_AUTH_URL);

