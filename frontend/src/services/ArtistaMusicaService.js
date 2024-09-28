const API_BASE_URL = 'http://localhost:3000';

class ArtistaMusicaService {
  async associarArtistasAMusica(musicaId, artistaIds) {
    try {
      const response = await fetch(`${API_BASE_URL}/musicas/${musicaId}/artistas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artistaIds })
      });
      if (!response.ok) {
        throw new Error('Erro ao associar artistas à música');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async desassociarArtistaDeMusica(musicaId, artistaId) {
    try {
      const response = await fetch(`${API_BASE_URL}/musicas/${musicaId}/artistas`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artistaId })
      });
      if (!response.ok) {
        throw new Error('Erro ao desassociar artista da música');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async obterAssociacoes() {
    try {
      const response = await fetch(`${API_BASE_URL}/associacoes`);
      if (!response.ok) {
        throw new Error('Erro ao obter associações');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async obterArtistasPorMusica(musicaId) {
    try {
      const response = await fetch(`${API_BASE_URL}/musicas/${musicaId}/artistas`);
      if (!response.ok) {
        throw new Error('Erro ao obter artistas da música');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async obterMusicasPorArtista(artistaId) {
    try {
      const response = await fetch(`${API_BASE_URL}/artistas/${artistaId}/musicas`);
      if (!response.ok) {
        throw new Error('Erro ao obter músicas do artista');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

const artistaMusicaService = new ArtistaMusicaService();
export default artistaMusicaService;
