const db = require('../Config/db');

class ArtistaMusica {
    static async associate(artistaId, musicaId) {
        await db.query('INSERT INTO artista_musica (artista_id, musica_id) VALUES (?, ?)', [artistaId, musicaId]);
    }

    static async dissociate(artistaId, musicaId) {
        await db.query('DELETE FROM artista_musica WHERE artista_id = ? AND musica_id = ?', [artistaId, musicaId]);
    }

    static async getArtistsByMusic(musicaId) {
        const [rows] = await db.query(
            `SELECT a.* FROM artistas a
             INNER JOIN artista_musica am ON a.id = am.artista_id
             WHERE am.musica_id = ?`, [musicaId]);
        return rows;
    }

    static async getMusicsByArtist(artistaId) {
        const [rows] = await db.query(
            `SELECT m.* FROM musicas m
             INNER JOIN artista_musica am ON m.id = am.musica_id
             WHERE am.artista_id = ?`, [artistaId]);
        return rows;
    }

    static async getAllAssociations() {
        const [rows] = await db.query(
            `SELECT am.artista_id, am.musica_id, a.nome AS nome_artista, m.titulo AS titulo_musica
             FROM artista_musica am
             INNER JOIN artistas a ON am.artista_id = a.id
             INNER JOIN musicas m ON am.musica_id = m.id`
        );
        return rows;
    }
}

module.exports = ArtistaMusica;
