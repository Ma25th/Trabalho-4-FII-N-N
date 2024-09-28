const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Importar as rotas
const artistaRoutes = require('./Routes/ArtistaRoutes');
const musicaRoutes = require('./Routes/MusicaRoutes');
const artistaMusicaRoutes = require('./Routes/ArtistaMusicaRoutes');

// Middlewares
app.use(express.json());
app.use(cors());

// Registrar as rotas sem o prefixo '/api'
app.use(artistaRoutes);
app.use(musicaRoutes);
app.use(artistaMusicaRoutes);

// Middleware para lidar com rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
