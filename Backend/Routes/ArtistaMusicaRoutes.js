const express = require('express');
const router = express.Router();
const ArtistaMusicaController = require('../Controller/ArtistaMusicaController');


router.post('/musicas/:id/artistas', ArtistaMusicaController.associateArtistaToMusica);


router.delete('/musicas/:id/artistas', ArtistaMusicaController.dissociateArtistaFromMusica);


router.get('/musicas/:id/artistas', ArtistaMusicaController.getArtistsByMusic);


router.get('/artistas/:id/musicas', ArtistaMusicaController.getMusicsByArtist);


router.get('/associacoes', ArtistaMusicaController.getAllAssociations);

module.exports = router;
