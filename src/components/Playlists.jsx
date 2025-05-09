import { useState } from "react";
import useApi from "../hooks/useApi";
import ListCards from "./listCards";

function Playlists() {
  const urlBase = "https://api.spotify.com/v1";
  const token =
    "BQCerTXFXg_tVJ5aZkR6TRah1i5XbYso35W61ewwQesFDx-slBM1Y6yZsnSF-Oez2KaU6LMWdSJ3BiZFUJOAUavYjWNKpSHEALH5_whKmwJbWvKXqSbIdsFgfe1K2DSjridXj-cAwt8";
  const { data, loading, error } = useApi(`${urlBase}/me/playlists?limit=5`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div className="min-vh-100 bg-light">
      <main className="container py-4">
        <div className="row">
          <div className="col-12">
            <h1 className="display-4 mb-4">Playlists</h1>
            {loading && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {error && (
              <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">¡Atención!</h4>
                <p>No se pudieron cargar las playlists. Por favor, intenta de nuevo más tarde.</p>
              </div>
            )}
            {data && (
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Your Playlists</h5>
                  <p className="card-text">
                    Total Playlists: {data.items.length}
                  </p>
                </div>
              </div>
            )}
            <ListCards />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Playlists; 