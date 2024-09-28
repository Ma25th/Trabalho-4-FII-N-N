const Musica = require('../Model/MusicaModel');

exports.getAllMusicas = async (req, res) => {
    try {
        const musicas = await Musica.getAll();
        res.json(musicas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMusicaById = async (req, res) => {
    try {
        const musica = await Musica.getById(req.params.id);
        if (musica) {
            res.json(musica);
        } else {
            res.status(404).json({ message: 'Música não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createMusica = async (req, res) => {
    try {
        const id = await Musica.create(req.body);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMusica = async (req, res) => {
    try {
        await Musica.update(req.params.id, req.body);
        res.json({ message: 'Música atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMusica = async (req, res) => {
    try {
        await Musica.delete(req.params.id);
        res.json({ message: 'Música excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
