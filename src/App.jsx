import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useApi from './hooks/useApi';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import "./App.css";

// Páginas
import Login from './pages/Loging';
import Loading from './pages/Loading';
import Profile from './pages/Profile';
import Callback from './pages/Callback';
import Playlists from "./components/Playlists";

function Home() {
  const [count, setCount] = useState(0);
  const { data, loading, error } = useApi("https://jsonplaceholder.typicode.com/posts/1");

  useEffect(() => {
    console.log("✅ Firebase está conectado");
  }, []);

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center mb-4">
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1 className="text-center mb-4">Spotify Clone</h1>
          
          <div className="card mb-4">
            <div className="card-body">
              <button 
                className="btn btn-primary mb-3" 
                onClick={() => setCount((count) => count + 1)}
              >
                Count is {count}
              </button>
              <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h2 className="card-title">🌐 Ejemplo de uso de useApi</h2>
              {loading && (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="alert alert-danger" role="alert">
                  Error: {error.message}
                </div>
              )}
              {data && (
                <div>
                  <h3>Título: {data.title}</h3>
                  <p>Cuerpo: {data.body}</p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-4">
            <Link to="/login" className="btn btn-outline-primary me-2">
              Ir al Login
            </Link>
            <Link to="/profile" className="btn btn-outline-secondary">
              Ver Perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="*" element={
        <div className="container mt-5 text-center">
          <h1>404 - Página no encontrada</h1>
          <Link to="/" className="btn btn-primary mt-3">
            Volver al inicio
          </Link>
        </div>
      } />
    </Routes>
  );
}

export default App;
