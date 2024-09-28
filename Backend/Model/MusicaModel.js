const db = require('../Config/db');

class Musica {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM musicas');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM musicas WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { titulo, data_lancamento, duracao } = data;
        const [result] = await db.query('INSERT INTO musicas (titulo, data_lancamento, duracao) VALUES (?, ?, ?)', [titulo, data_lancamento, duracao]);
        return result.insertId;
    }

    static async update(id, data) {
        const { titulo, data_lancamento, duracao } = data;
        await db.query('UPDATE musicas SET titulo = ?, data_lancamento = ?, duracao = ? WHERE id = ?', [titulo, data_lancamento, duracao, id]);
    }

    static async delete(id) {
        await db.query('DELETE FROM musicas WHERE id = ?', [id]);
    }
}

module.exports = Musica;
