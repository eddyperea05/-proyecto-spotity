// src/pages/Loading.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Loading.css"; // Asegúrate de tener este archivo CSS

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/profile"), 5000);
    return () => clearTimeout(t);
  }, [navigate]);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://tenor.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
    return () => document.body.removeChild(s);
  }, []);

  return (
    <div className="loading-page">
      <p className="loading-text">Infiltrando misiones…</p>
      <div className="gif-container">
        <div
          className="tenor-gif-embed"
          data-postid="5321435"
          data-share-method="host"
          data-aspect-ratio="1.45349"
          data-width="100%"
        >
          <a href="https://tenor.com/view/pokemon-james-jessie-prepare-for-trouble-and-make-it-double-gif-5321435">
            Pokemon James GIF
          </a>{" "}
          from <a href="https://tenor.com/search/pokemon-gifs">Pokemon GIFs</a>
        </div>
      </div>
    </div>
  );
}
