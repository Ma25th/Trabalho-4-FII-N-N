import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand" to="/">MusicSys</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/artistas">Artistas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/musicas">Músicas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/associar">Associar Artistas e Músicas</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="mt-5 pt-4">
        <Outlet />
      </div>
    </>
  );
}

export default NavBar;
