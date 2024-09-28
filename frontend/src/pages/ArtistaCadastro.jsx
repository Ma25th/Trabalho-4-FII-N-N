import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Alert, ListGroup, InputGroup, FormControl, Modal } from 'react-bootstrap';
import artistaService from '../services/ArtistaService';

function ArtistaCadastro() {
  const [validado, setValidado] = useState(false);
  const [nome, setNome] = useState("");
  const [generoMusical, setGeneroMusical] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [erroCadastro, setErroCadastro] = useState("");
  const [listaArtistas, setListaArtistas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idOriginal, setIdOriginal] = useState(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  useEffect(() => {
    listarArtistas();
  }, []);

  const listarArtistas = async () => {
    const dados = await artistaService.obterTodos();
    dados.sort((a, b) => a.nome.localeCompare(b.nome));
    setListaArtistas(dados);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidado(true);
    } else {
      try {
        if (editando) {
          await artistaService.editar(idOriginal, { nome, genero_musical: generoMusical, nacionalidade });
          setEditando(false);
          setIdOriginal(null);
          setMensagemAlerta('Artista editado com sucesso!');
        } else {
          await artistaService.cadastrar({ nome, genero_musical: generoMusical, nacionalidade });
          setMensagemAlerta('Artista cadastrado com sucesso!');
        }
        listarArtistas();
        setMostrarAlerta(true);
        setNome("");
        setGeneroMusical("");
        setNacionalidade("");
        setValidado(false);
        setErroCadastro("");
      } catch (error) {
        setErroCadastro(error.message);
      }
    }
  };

  const handleEditar = (artista) => {
    setEditando(true);
    setIdOriginal(artista.id);
    setNome(artista.nome);
    setGeneroMusical(artista.genero_musical);
    setNacionalidade(artista.nacionalidade);
  };

  const handleConfirmarExcluir = (id) => {
    setIdParaExcluir(id);
    setShowModal(true);
  };

  const handleExcluir = async () => {
    await artistaService.excluir(idParaExcluir);
    listarArtistas();
    setMensagemAlerta('Artista excluído com sucesso!');
    setMostrarAlerta(true);
    setShowModal(false);
  };

  const handleBusca = async (event) => {
    const termo = event.target.value;
    setTermoBusca(termo);
    if (termo) {
      const dados = await artistaService.filtrar(termo);
      dados.sort((a, b) => a.nome.localeCompare(b.nome));
      setListaArtistas(dados);
    } else {
      listarArtistas();
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Cadastro de Artistas</h1>
      {mostrarAlerta && (
        <Alert variant="success" onClose={() => setMostrarAlerta(false)} dismissible>
          {mensagemAlerta}
        </Alert>
      )}
      {erroCadastro && (
        <Alert variant="danger" onClose={() => setErroCadastro("")} dismissible>
          {erroCadastro}
        </Alert>
      )}
      <Form noValidate validated={validado} onSubmit={handleSubmit}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome do Artista</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira o nome do artista.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formGeneroMusical">
          <Form.Label>Gênero Musical</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Gênero Musical"
            value={generoMusical}
            onChange={(e) => setGeneroMusical(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira o gênero musical.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formNacionalidade">
          <Form.Label>Nacionalidade</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nacionalidade"
            value={nacionalidade}
            onChange={(e) => setNacionalidade(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira a nacionalidade.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          {editando ? 'Salvar Alterações' : 'Cadastrar'}
        </Button>
      </Form>

      <h2 className="mt-5">Lista de Artistas</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Buscar artistas"
          value={termoBusca}
          onChange={handleBusca}
        />
      </InputGroup>
      <ListGroup>
        {listaArtistas.map((artista) => (
          <ListGroup.Item key={artista.id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{artista.nome}</strong> - {artista.genero_musical} ({artista.nacionalidade})
            </div>
            <div>
              <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditar(artista)}>
                Editar
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleConfirmarExcluir(artista.id)}>
                Excluir
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir este artista?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleExcluir}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ArtistaCadastro;
