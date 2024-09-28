const express = require('express');
const router = express.Router();
const ArtistaMusicaController = require('../Controller/ArtistaMusicaController');

// Associar artistas a uma música
router.post('/musicas/:id/artistas', ArtistaMusicaController.associateArtistaToMusica);

// Desassociar um artista de uma música
router.delete('/musicas/:id/artistas', ArtistaMusicaController.dissociateArtistaFromMusica);

// Obter artistas de uma música
router.get('/musicas/:id/artistas', ArtistaMusicaController.getArtistsByMusic);

// Obter músicas de um artista
router.get('/artistas/:id/musicas', ArtistaMusicaController.getMusicsByArtist);

module.exports = router;
