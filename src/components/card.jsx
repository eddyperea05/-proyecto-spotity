import React from "react";

export default function Card({ title, description, imageUrl }) {
  return (
    <div className="card shadow-sm mb-4" style={{ width: "18rem" }}>
      <img 
        src={imageUrl} 
        className="card-img-top" 
        alt={title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title text-truncate">{title}</h5>
        <p className="card-text text-muted">{description}</p>
        <button className="btn btn-primary w-100">
          Escuchar Ahora
        </button>
      </div>
    </div>
  );
}
