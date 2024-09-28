const API_BASE_URL = 'http://localhost:3000';

class MusicaService {
  async obterTodos() {
    try {
      const response = await fetch(`${API_BASE_URL}/musicas`);
      if (!response.ok) {
        throw new Error('Erro ao buscar músicas');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async cadastrar(musica) {
    try {
      const response = await fetch(`${API_BASE_URL}/musicas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(musica)
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar música');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async editar(id, musica) {
    try {
      const response = await fetch(`${API_BASE_URL}/musicas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(musica)
      });
      if (!response.ok) {
        throw new Error('Erro ao editar música');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async excluir(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/musicas/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir música');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async filtrar(termo) {
    try {
      const response = await fetch(`${API_BASE_URL}/musicas?search=${encodeURIComponent(termo)}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar músicas');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

const musicaService = new MusicaService();
export default musicaService;
