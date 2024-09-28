const express = require('express');
const router = express.Router();
const ArtistaController = require('../Controller/ArtistaController');

router.get('/artistas', ArtistaController.getAllArtistas);
router.get('/artistas/:id', ArtistaController.getArtistaById);
router.post('/artistas', ArtistaController.createArtista);
router.put('/artistas/:id', ArtistaController.updateArtista);
router.delete('/artistas/:id', ArtistaController.deleteArtista);

module.exports = router;
