import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ArtistaCadastro from './pages/ArtistaCadastro';
import MusicaCadastro from './pages/MusicaCadastro';
import AssociarArtistaMusica from './pages/AssociarArtistaMusica';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="mt-5 pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artistas" element={<ArtistaCadastro />} />
          <Route path="/musicas" element={<MusicaCadastro />} />
          <Route path="/associar" element={<AssociarArtistaMusica />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h1 className="text-center mt-5">Bem-vindo ao Sistema de Gerenciamento de Artistas e Músicas</h1>;
}

export default App;
