const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


const artistaRoutes = require('./Routes/ArtistaRoutes');
const musicaRoutes = require('./Routes/MusicaRoutes');
const artistaMusicaRoutes = require('./Routes/ArtistaMusicaRoutes');


app.use(express.json());
app.use(cors());


app.use(artistaRoutes);
app.use(musicaRoutes);
app.use(artistaMusicaRoutes);


app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
