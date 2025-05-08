import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useApi from "./hooks/useApi";
import Login from "./pages/Loging";
import Profile from "./pages/Profile";
import Callback from './pages/Callback';

function Home() {
  const [count, setCount] = useState(0);
  const { data, loading, error } = useApi("https://jsonplaceholder.typicode.com/posts/1");

  useEffect(() => {
    console.log("✅ Firebase está conectado");
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React Esta monda</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>

      <h2>🔥 Firebase Test</h2>
      <p>Abre la consola del navegador (F12) para ver si Firebase está conectado.</p>

      <h2>🌐 Ejemplo de uso de useApi</h2>
      {loading && <p>Cargando datos...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h3>Título: {data.title}</h3>
          <p>Cuerpo: {data.body}</p>
        </div>
      )}

      <Link to="/login" className="text-blue-500 underline mt-4 block">
        Ir al Login
      </Link>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}

export default App;
