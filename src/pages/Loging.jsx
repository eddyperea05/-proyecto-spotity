import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, facebookProvider } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getSpotifyAuthUrl } from "../services/spotifyAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = isNewUser
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);
        navigate("/loading");

    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/loading");

    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/loading");

    } catch (err) {
      setError(err.message);
    }
  };

  const handleSpotifyLogin = async () => {
    try {
      const url = await getSpotifyAuthUrl();
      window.location.href = url;
    } catch (err) {
      setError("Error iniciando sesión con Spotify");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#1c1c1e",
        backgroundImage: "radial-gradient(ellipse at center, #000 0%, #111 100%)",
      }}
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
          <h1 style={{ fontSize: "4rem", fontWeight: "900", color: "#e50914", marginBottom: "0" }}>R</h1>
          <h2 className="fw-bold">Ingresar al cuartel</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 position-relative">
            <label htmlFor="email" className="form-label text-light">
              Correo electrónico
              <span
                className="ms-2 text-secondary"
                data-bs-toggle="tooltip"
                title="Ingresa aquí tu correo registrado en el cuartel"
                style={{ cursor: "help" }}
              >
                ⓘ
              </span>
            </label>
            <input
              type="email"
              id="email"
              className="form-control bg-dark text-white border border-secondary"
              placeholder="ejemplo@equipo-rocket.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4 position-relative">
            <label htmlFor="password" className="form-label text-light">
              Contraseña
              <span
                className="ms-2 text-secondary"
                data-bs-toggle="tooltip"
                title="Tu contraseña secreta para acceder al cuartel Rocket"
                style={{ cursor: "help" }}
              >
                ⓘ
              </span>
            </label>
            <input
              type="password"
              id="password"
              className="form-control bg-dark text-white border border-secondary"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 fw-bold py-2 rounded-pill"
          >
            {isNewUser ? "Unirme" : "Ingresar"}
          </button>
        </form>

        <div className="text-center my-3 text-muted">─ O ─</div>

        <div className="d-grid gap-2">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-dark border border-secondary text-white d-flex align-items-center justify-content-center gap-2"
          >
            <i className="bi bi-google"></i> Infiltrarse con Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="btn btn-dark border border-secondary text-white d-flex align-items-center justify-content-center gap-2"
          >
            <i className="bi bi-facebook"></i> Infiltrarse con Facebook
          </button>
          <button
            onClick={handleSpotifyLogin}
            className="btn btn-dark border border-secondary text-white d-flex align-items-center justify-content-center gap-2"
          >
            <i className="bi bi-spotify"></i> Infiltrarse con Spotify
          </button>
        </div>

        <p className="text-center mt-4">
          {isNewUser ? "¿Ya tienes cuenta?" : "¿Aún no tienes cuenta?"}{" "}
          <button
            onClick={() => setIsNewUser(!isNewUser)}
            className="btn btn-link text-danger p-0 fw-bold"
          >
            {isNewUser ? "Inicia sesión" : "Unirse al cuartel"}
          </button>
        </p>

        {error && (
          <div className="alert alert-danger mt-3 text-center small">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
