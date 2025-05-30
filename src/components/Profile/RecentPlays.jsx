import { useEffect, useState } from 'react';
import { fetchRecentPlays } from '../../services/spotifyApi';

export default function RecentPlays() {
  const [recentPlays, setRecentPlays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecentPlays = async () => {
      try {
        const plays = await fetchRecentPlays();
        setRecentPlays(plays);
      } catch (error) {
        console.error("Error loading recent plays:", error);
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem("spotify_token_data")) {
      loadRecentPlays();
    }
  }, []);

  if (loading) {
    return <div className="text-center py-3">Cargando actividad reciente...</div>;
  }

  if (!recentPlays.length) {
    return <p className="text-muted">No hay actividad reciente para mostrar</p>;
  }

  return (
    <div className="list-group">
      {recentPlays.slice(0, 5).map((item, index) => (
        <div key={index} className="list-group-item bg-black text-white border-dark mb-2 rounded-3">
          <div className="d-flex align-items-center">
            <img 
              src={item.track.album.images[0]?.url} 
              alt={item.track.name}
              className="rounded me-3"
              style={{ width: 50, height: 50 }}
            />
            <div>
              <h6 className="mb-0">{item.track.name}</h6>
              <small className="text-muted">
                {item.track.artists.map(a => a.name).join(', ')}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}