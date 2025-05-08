import { SPOTIFY_AUTH_URL } from "../spotifyAuth";

export default function Profile() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">👤 Perfil de usuario</h1>
      <p className="mb-6">Componente en construcción</p>

      <a
        href={SPOTIFY_AUTH_URL}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Vincular cuenta de Spotify
      </a>
    </div>
  );
}
