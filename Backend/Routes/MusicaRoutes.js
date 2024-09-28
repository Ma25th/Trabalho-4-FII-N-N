const express = require('express');
const router = express.Router();
const MusicaController = require('../Controller/MusicaController');

router.get('/musicas', MusicaController.getAllMusicas);
router.get('/musicas/:id', MusicaController.getMusicaById);
router.post('/musicas', MusicaController.createMusica);
router.put('/musicas/:id', MusicaController.updateMusica);
router.delete('/musicas/:id', MusicaController.deleteMusica);

module.exports = router;
