const API_BASE_URL = 'http://localhost:3000';

class ArtistaService {
  async obterTodos() {
    try {
      const response = await fetch(`${API_BASE_URL}/artistas`);
      if (!response.ok) {
        throw new Error('Erro ao buscar artistas');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async cadastrar(artista) {
    try {
      const response = await fetch(`${API_BASE_URL}/artistas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artista)
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar artista');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async editar(id, artista) {
    try {
      const response = await fetch(`${API_BASE_URL}/artistas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artista)
      });
      if (!response.ok) {
        throw new Error('Erro ao editar artista');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async excluir(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/artistas/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir artista');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async filtrar(termo) {
    try {
      const response = await fetch(`${API_BASE_URL}/artistas?search=${encodeURIComponent(termo)}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar artistas');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

const artistaService = new ArtistaService();
export default artistaService;
