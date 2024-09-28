import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Alert, ListGroup, Modal } from 'react-bootstrap';
import artistaService from '../services/ArtistaService';
import musicaService from '../services/MusicaService';
import artistaMusicaService from '../services/ArtistaMusicaService';

function AssociarArtistaMusica() {
  const [artistas, setArtistas] = useState([]);
  const [musicas, setMusicas] = useState([]);
  const [musicasSelecionadas, setMusicasSelecionadas] = useState([]);
  const [artistasSelecionados, setArtistasSelecionados] = useState([]);
  const [associacoes, setAssociacoes] = useState({});
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [erro, setErro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [associacaoParaRemover, setAssociacaoParaRemover] = useState(null);

  useEffect(() => {
    carregarArtistas();
    carregarMusicas();
    carregarAssociacoes();
  }, []);

  const carregarArtistas = async () => {
    const dados = await artistaService.obterTodos();
    setArtistas(dados);
  };

  const carregarMusicas = async () => {
    const dados = await musicaService.obterTodos();
    setMusicas(dados);
  };

  const carregarAssociacoes = async () => {
    try {
      const dados = await artistaMusicaService.obterAssociacoes();
      
      const agrupadoPorMusica = {};
      dados.forEach((assoc) => {
        const musicaId = assoc.musica_id;
        if (!agrupadoPorMusica[musicaId]) {
          agrupadoPorMusica[musicaId] = {
            musicaId: musicaId,
            tituloMusica: assoc.titulo_musica,
            artistas: [],
          };
        }
        agrupadoPorMusica[musicaId].artistas.push({
          artistaId: assoc.artista_id,
          nomeArtista: assoc.nome_artista,
        });
      });
      setAssociacoes(agrupadoPorMusica);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssociar = async (event) => {
    event.preventDefault();
    if (musicasSelecionadas.length === 0 || artistasSelecionados.length === 0) {
      setErro("Por favor, selecione pelo menos uma música e pelo menos um artista.");
      return;
    }
    try {
      for (let musicaId of musicasSelecionadas) {
        await artistaMusicaService.associarArtistasAMusica(musicaId, artistasSelecionados);
      }
      setMensagemAlerta("Artistas associados às músicas selecionadas com sucesso!");
      setMostrarAlerta(true);
      setMusicasSelecionadas([]);
      setArtistasSelecionados([]);
      setErro("");
      
      carregarAssociacoes();
    } catch (error) {
      console.error(error);
      setErro("Erro ao associar artistas às músicas.");
    }
  };

  const handleSelecionarMusicas = (event) => {
    const options = event.target.options;
    const selecionadas = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selecionadas.push(options[i].value);
      }
    }
    setMusicasSelecionadas(selecionadas);
  };

  const handleSelecionarArtistas = (event) => {
    const options = event.target.options;
    const selecionados = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selecionados.push(options[i].value);
      }
    }
    setArtistasSelecionados(selecionados);
  };

  const handleConfirmarDesassociar = (artistaId, musicaId) => {
    setAssociacaoParaRemover({ artistaId, musicaId });
    setShowModal(true);
  };

  const handleDesassociar = async () => {
    const { artistaId, musicaId } = associacaoParaRemover;
    try {
      await artistaMusicaService.desassociarArtistaDeMusica(musicaId, artistaId);
      setMensagemAlerta("Associação removida com sucesso!");
      setMostrarAlerta(true);
      setShowModal(false);
      
      carregarAssociacoes();
    } catch (error) {
      console.error(error);
      setErro("Erro ao remover associação.");
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Associar Artistas a Músicas</h1>
      {mostrarAlerta && (
        <Alert variant="success" onClose={() => setMostrarAlerta(false)} dismissible>
          {mensagemAlerta}
        </Alert>
      )}
      {erro && (
        <Alert variant="danger" onClose={() => setErro("")} dismissible>
          {erro}
        </Alert>
      )}
      <Form onSubmit={handleAssociar}>
        <Form.Group controlId="formMusica">
          <Form.Label>Selecione as Músicas</Form.Label>
          <Form.Control as="select" multiple value={musicasSelecionadas} onChange={handleSelecionarMusicas}>
            {musicas.map((musica) => (
              <option key={musica.id} value={musica.id}>
                {musica.titulo}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formArtistas">
          <Form.Label>Selecione os Artistas</Form.Label>
          <Form.Control as="select" multiple value={artistasSelecionados} onChange={handleSelecionarArtistas}>
            {artistas.map((artista) => (
              <option key={artista.id} value={artista.id}>
                {artista.nome}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Associar
        </Button>
      </Form>

      <h2 className="mt-5">Associações Existentes</h2>
      {Object.values(associacoes).length === 0 ? (
        <p>Nenhuma associação encontrada.</p>
      ) : (
        Object.values(associacoes).map((musica) => (
          <div key={musica.musicaId} className="mb-4">
            <h4>Música: {musica.tituloMusica}</h4>
            <ListGroup>
              {musica.artistas.map((artista) => (
                <ListGroup.Item key={artista.artistaId} className="d-flex justify-content-between align-items-center">
                  {artista.nomeArtista}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleConfirmarDesassociar(artista.artistaId, musica.musicaId)}
                  >
                    Remover Associação
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        ))
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Remoção</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja remover esta associação?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDesassociar}>
            Remover
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AssociarArtistaMusica;
