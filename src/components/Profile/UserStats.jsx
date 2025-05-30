import { FaHeadphones, FaMusic, FaHeart } from 'react-icons/fa';

export default function UserStats({ playlists, topArtists, profile }) {
  // Extraer géneros principales de los artistas top
  const genres = [...new Set(
    topArtists.flatMap(artist => artist.genres).slice(0, 5)
  )];

  return (
    <div>
      <h3 className="mb-4">Tus estadísticas</h3>
      
      <div className="row">
        {/* Playlists */}
        <div className="col-md-6 mb-4">
          <div className="bg-black rounded-3 p-3 h-100">
            <div className="d-flex align-items-center mb-2">
              <FaMusic className="text-success me-2" />
              <h5 className="mb-0">Playlists</h5>
            </div>
            <h2 className="fw-bold">{playlists.total || 0}</h2>
            <p className="text-muted small mb-0">Playlists en tu biblioteca</p>
          </div>
        </div>

        {/* Seguidores */}
        <div className="col-md-6 mb-4">
          <div className="bg-black rounded-3 p-3 h-100">
            <div className="d-flex align-items-center mb-2">
              <FaHeart className="text-danger me-2" />
              <h5 className="mb-0">Seguidores</h5>
            </div>
            <h2 className="fw-bold">{profile.followers?.total || 0}</h2>
            <p className="text-muted small mb-0">Personas que te siguen</p>
          </div>
        </div>

        {/* Artistas top */}
        <div className="col-md-6 mb-4">
          <div className="bg-black rounded-3 p-3 h-100">
            <div className="d-flex align-items-center mb-2">
              <FaHeadphones className="text-primary me-2" />
              <h5 className="mb-0">Artistas top</h5>
            </div>
            <div className="d-flex flex-wrap gap-2 mt-3">
              {topArtists.slice(0, 5).map(artist => (
                <span key={artist.id} className="badge bg-secondary rounded-pill">
                  {artist.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Géneros favoritos */}
        <div className="col-md-6 mb-4">
          <div className="bg-black rounded-3 p-3 h-100">
            <h5 className="mb-3">Géneros favoritos</h5>
            <div className="d-flex flex-wrap gap-2">
              {genres.length > 0 ? (
                genres.map((genre, index) => (
                  <span key={index} className="badge bg-success rounded-pill">
                    {genre}
                  </span>
                ))
              ) : (
                <p className="text-muted small">No hay géneros disponibles</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}