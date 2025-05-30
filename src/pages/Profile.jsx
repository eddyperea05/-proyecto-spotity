// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { getSpotifyAuthUrl } from "../services/spotifyAuth";
import SpotifyBadge from "../components/SpotifyBadge";
import UserStats from "../components/Profile/UserStats";
import RecentPlays from "../components/Profile/RecentPlays";
import EditProfileModal from "../components/Profile/EditProfileModal";
import { fetchUserProfile, fetchUserTopArtists, fetchUserPlaylists } from "../services/spotifyApi";


export default function Profile() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [spotifyProfile, setSpotifyProfile] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (firebaseUser && localStorage.getItem("spotify_token_data")) {
      loadSpotifyData();
    }
  }, [firebaseUser]);

  const loadSpotifyData = async () => {
    try {
      const [profile, artists, userPlaylists] = await Promise.all([
        fetchUserProfile(),
        fetchUserTopArtists(),
        fetchUserPlaylists()
      ]);
      setSpotifyProfile(profile);
      setTopArtists(artists);
      setPlaylists(userPlaylists);
    } catch (error) {
      console.error("Error loading Spotify data:", error);
    }
  };

  if (loadingUser) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <h2>Cargando usuario…</h2>
      </div>
    );
  }

  if (!firebaseUser) {
    return <Navigate to="/login" replace />;
  }

  const handleLinkSpotify = async () => {
    try {
      const url = await getSpotifyAuthUrl();
      window.location.href = url;
    } catch (err) {
      console.error("❌ Error iniciando flujo Spotify:", err);
    }
  };

  const isSpotifyLinked = Boolean(localStorage.getItem("spotify_token_data"));

 return (
  <div className="min-vh-100 p-4" style={{ backgroundColor: "#1c1c1e" }}>
    <div className="container">
      <div className="row">
        {/* Sección izquierda - Perfil */}
        <div className="col-md-4 mb-4">
          <div className="card bg-dark text-white p-4 rounded-4 shadow">
            <div className="text-center mb-3">
              {firebaseUser.photoURL ? (
                <img
                  src={firebaseUser.photoURL}
                  alt="Avatar"
                  className="rounded-circle mb-3 border border-light"
                  style={{ width: 140, height: 140, objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary d-flex justify-content-center align-items-center mx-auto mb-3 border border-light"
                  style={{ width: 140, height: 140, fontSize: "3rem" }}
                >
                  {firebaseUser.displayName?.slice(0, 2).toUpperCase() || "NN"}
                </div>
              )}
              
              <h2 className="fw-bold mb-1">
                {firebaseUser.displayName || "Usuario"}
              </h2>
              <p className="text-muted mb-4">{firebaseUser.email}</p>

              {/* Botones de acción */}
              <div className="d-grid gap-2">
                <button 
                  onClick={() => setShowEditModal(true)}
                  className="btn btn-outline-light rounded-pill py-2 d-flex align-items-center justify-content-center"
                >
                  <i className="bi bi-pencil-fill me-2"></i>
                  Editar perfil
                </button>
                
                <button
                  onClick={() => navigate('/playlists')}
                  className="btn btn-primary rounded-pill py-2 d-flex align-items-center justify-content-center"
                >
                  <i className="bi bi-collection-play-fill me-2"></i>
                  Mis playlists
                </button>

                {/* Solo el badge de Spotify */}
                <div className="mt-3 pt-2 border-top border-secondary">
                  <SpotifyBadge />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección derecha - Contenido */}
        <div className="col-md-8">
          <div className="card bg-dark text-white p-4 rounded-4 shadow h-100">
            {isSpotifyLinked && spotifyProfile ? (
              <>
                <UserStats 
                  playlists={playlists} 
                  topArtists={topArtists} 
                  profile={spotifyProfile}
                />
                
                <div className="mt-4 pt-3 border-top border-secondary">
                  <h4 className="mb-3 d-flex align-items-center">
                    <i className="bi bi-clock-history me-2"></i>
                    Tu actividad reciente
                  </h4>
                  <RecentPlays />
                </div>
              </>
            ) : (
              <div className="text-center py-5">
                <div className="mb-4">
                  <i className="bi bi-spotify fs-1 text-muted"></i>
                </div>
                <h4 className="mb-3">Conecta tu cuenta de Spotify</h4>
                <p className="text-muted mb-4">
                  Descubre tus estadísticas musicales y playlists
                </p>
                {/* ÚNICO botón de vinculación en toda la página */}
                <button
                  onClick={handleLinkSpotify}
                  className="btn btn-success rounded-pill px-4 py-2"
                >
                  <i className="bi bi-spotify me-2"></i>
                  Vincular Spotify
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Modal de edición */}
    <EditProfileModal 
      show={showEditModal}
      onHide={() => setShowEditModal(false)}
      user={firebaseUser}
    />
  </div>
);
}