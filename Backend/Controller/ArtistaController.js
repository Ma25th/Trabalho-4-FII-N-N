const Artista = require('../Model/ArtistaModel');

exports.getAllArtistas = async (req, res) => {
    try {
        const artistas = await Artista.getAll();
        res.json(artistas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getArtistaById = async (req, res) => {
    try {
        const artista = await Artista.getById(req.params.id);
        if (artista) {
            res.json(artista);
        } else {
            res.status(404).json({ message: 'Artista não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createArtista = async (req, res) => {
    try {
        const id = await Artista.create(req.body);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateArtista = async (req, res) => {
    try {
        await Artista.update(req.params.id, req.body);
        res.json({ message: 'Artista atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteArtista = async (req, res) => {
    try {
        await Artista.delete(req.params.id);
        res.json({ message: 'Artista excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
