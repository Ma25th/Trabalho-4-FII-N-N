import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Alert, ListGroup, InputGroup, FormControl, Modal } from 'react-bootstrap';
import musicaService from '../services/MusicaService';

function MusicaCadastro() {
  const [validado, setValidado] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [dataLancamento, setDataLancamento] = useState("");
  const [duracao, setDuracao] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [erroCadastro, setErroCadastro] = useState("");
  const [listaMusicas, setListaMusicas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idOriginal, setIdOriginal] = useState(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState(null);

  useEffect(() => {
    listarMusicas();
  }, []);

  const listarMusicas = async () => {
    const dados = await musicaService.obterTodos();
    dados.sort((a, b) => a.titulo.localeCompare(b.titulo));
    setListaMusicas(dados);
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
          await musicaService.editar(idOriginal, {
            titulo,
            data_lancamento: dataLancamento,
            duracao,
          });
          setEditando(false);
          setIdOriginal(null);
          setMensagemAlerta('Música editada com sucesso!');
        } else {
          await musicaService.cadastrar({
            titulo,
            data_lancamento: dataLancamento,
            duracao,
          });
          setMensagemAlerta('Música cadastrada com sucesso!');
        }
        listarMusicas();
        setMostrarAlerta(true);
        setTitulo("");
        setDataLancamento("");
        setDuracao("");
        setValidado(false);
        setErroCadastro("");
      } catch (error) {
        setErroCadastro(error.message);
      }
    }
  };

  const handleEditar = (musica) => {
    setEditando(true);
    setIdOriginal(musica.id);
    setTitulo(musica.titulo);
    setDataLancamento(musica.data_lancamento);
    setDuracao(musica.duracao);
  };

  const handleConfirmarExcluir = (id) => {
    setIdParaExcluir(id);
    setShowModal(true);
  };

  const handleExcluir = async () => {
    await musicaService.excluir(idParaExcluir);
    listarMusicas();
    setMensagemAlerta('Música excluída com sucesso!');
    setMostrarAlerta(true);
    setShowModal(false);
  };

  const handleBusca = async (event) => {
    const termo = event.target.value;
    setTermoBusca(termo);
    if (termo) {
      const dados = await musicaService.filtrar(termo);
      dados.sort((a, b) => a.titulo.localeCompare(b.titulo));
      setListaMusicas(dados);
    } else {
      listarMusicas();
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Cadastro de Músicas</h1>
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
        <Form.Group controlId="formTitulo">
          <Form.Label>Título da Música</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira o título da música.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDataLancamento">
          <Form.Label>Data de Lançamento</Form.Label>
          <Form.Control
            required
            type="date"
            value={dataLancamento}
            onChange={(e) => setDataLancamento(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira a data de lançamento.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDuracao">
          <Form.Label>Duração (HH:MM:SS)</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="00:03:30"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, insira a duração da música no formato HH:MM:SS.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          {editando ? 'Salvar Alterações' : 'Cadastrar'}
        </Button>
      </Form>

      <h2 className="mt-5">Lista de Músicas</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Buscar músicas"
          value={termoBusca}
          onChange={handleBusca}
        />
      </InputGroup>
      <ListGroup>
        {listaMusicas.map((musica) => (
          <ListGroup.Item key={musica.id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{musica.titulo}</strong> - {musica.data_lancamento} ({musica.duracao})
            </div>
            <div>
              <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditar(musica)}>
                Editar
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleConfirmarExcluir(musica.id)}>
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
        <Modal.Body>Tem certeza de que deseja excluir esta música?</Modal.Body>
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

export default MusicaCadastro;
