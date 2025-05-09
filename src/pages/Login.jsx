import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Iniciar Sesión</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
              </form>
              <div className="text-center mt-3">
                <Link to="/" className="text-decoration-none">Volver al inicio</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 