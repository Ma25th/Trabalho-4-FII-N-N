const db = require('../Config/db');

class Artista {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM artistas');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM artistas WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { nome, genero_musical, nacionalidade } = data;
        const [result] = await db.query('INSERT INTO artistas (nome, genero_musical, nacionalidade) VALUES (?, ?, ?)', [nome, genero_musical, nacionalidade]);
        return result.insertId;
    }

    static async update(id, data) {
        const { nome, genero_musical, nacionalidade } = data;
        await db.query('UPDATE artistas SET nome = ?, genero_musical = ?, nacionalidade = ? WHERE id = ?', [nome, genero_musical, nacionalidade, id]);
    }

    static async delete(id) {
        await db.query('DELETE FROM artistas WHERE id = ?', [id]);
    }
}

module.exports = Artista;