// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";             // tu export de auth
import { getSpotifyAuthUrl } from "../services/spotifyAuth";
import SpotifyBadge from "../components/SpotifyBadge";

export default function Profile() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    // 1) Suscríbete al estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);



  // 2) Mientras Firebase decide si hay user
  if (loadingUser) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <h2>Cargando usuario…</h2>
      </div>
    );
  }

  // 3) Si NO hay usuario, redirige a login
  if (!firebaseUser) {
    return <Navigate to="/login" replace />;
  }

  // 4) Handler para iniciar el flujo de autorización PKCE de Spotify
  const handleLinkSpotify = async () => {
    try {
      const url = await getSpotifyAuthUrl();
      console.log("🔗 Spotify Auth URL:", url);
      window.location.href = url;
    } catch (err) {
      console.error("❌ Error iniciando flujo Spotify:", err);
    }
  };

  // 5) Comprueba si ya tenemos tokens cacheados
  const isSpotifyLinked = Boolean(
    localStorage.getItem("spotify_token_data")
  );

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#1c1c1e" }}
    >
      <div
        className="text-white p-5 rounded-4 position-relative"
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#000",
          boxShadow: "0 0 40px rgba(255,0,0,0.4)",
        }}
      >
        <div className="text-center mb-4">
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "900",
              color: "#e50914",
              marginBottom: 0,
            }}
          >
            👤
          </h1>
          <h2 className="fw-bold">Perfil de Usuario</h2>
        </div>

        <div className="d-flex flex-column align-items-center gap-2">
          {/* Avatar o placeholder */}
          {firebaseUser.photoURL ? (
            <img
              src={firebaseUser.photoURL}
              alt="Avatar"
              className="rounded-circle"
              style={{ width: 80, height: 80 }}
            />
          ) : (
            <div
              className="rounded-circle bg-secondary d-flex justify-content-center align-items-center"
              style={{ width: 80, height: 80, fontSize: "1.5rem" }}
            >
              {firebaseUser.displayName
                ? firebaseUser.displayName.slice(0, 2).toUpperCase()
                : "NN"}
            </div>
          )}
          <p className="mb-0 font-semibold">
            {firebaseUser.displayName || "Usuario sin nombre"}
          </p>
          <p className="text-muted small">{firebaseUser.email}</p>

          {/* Badge de estado de Spotify */}
          <div className="mt-3">
            <SpotifyBadge />
          </div>

          {/* Botón vincular / revincular */}
          <button
            type="button"               // evita comportamiento por defecto de <button> en formularios
            onClick={handleLinkSpotify}
            className="btn btn-success mt-4 w-100 rounded-pill"
          >
            {isSpotifyLinked
              ? "Re-vincular cuenta de Spotify"
              : "Vincular cuenta de Spotify"}
          </button>

           <div class name = "h-screen flex justify-cente items-center dark:bg-neutral-900">
                <button className = "bg-slate-200 px-4 py-2 round hover:bg-slate-300">
                  onClikck={handeleChangeTheme}
                  Change Theme
                </button>
              </div>



                
              
              
              

        </div>
      </div>
    </div>
  );
}
//Antes del cambio