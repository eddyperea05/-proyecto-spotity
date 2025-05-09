import React from "react";

export default function Card({ title, description, imageUrl }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img className="card-img-top" src={imageUrl} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href="#" className="btn btn-primary">
          Escuchar Ahora (Esto un no funciona aun)
        </a>
      </div>
    </div>
  );
}
