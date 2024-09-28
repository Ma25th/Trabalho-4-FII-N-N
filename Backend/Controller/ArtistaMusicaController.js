const ArtistaMusica = require('../Model/ArtistaMusicaModel');

exports.associateArtistaToMusica = async (req, res) => {
    try {
        const { artistaIds } = req.body; 
        const musicaId = req.params.id;

        for (let artistaId of artistaIds) {
            await ArtistaMusica.associate(artistaId, musicaId);
        }

        res.json({ message: 'Artistas associados à música com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.dissociateArtistaFromMusica = async (req, res) => {
    try {
        const { artistaId } = req.body;
        const musicaId = req.params.id;

        await ArtistaMusica.dissociate(artistaId, musicaId);

        res.json({ message: 'Artista desassociado da música com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getArtistsByMusic = async (req, res) => {
    try {
        const artistas = await ArtistaMusica.getArtistsByMusic(req.params.id);
        res.json(artistas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMusicsByArtist = async (req, res) => {
    try {
        const musicas = await ArtistaMusica.getMusicsByArtist(req.params.id);
        res.json(musicas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllAssociations = async (req, res) => {
    try {
        const associations = await ArtistaMusica.getAllAssociations();
        res.json(associations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
