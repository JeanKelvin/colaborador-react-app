import React, { Component } from 'react';
import $ from 'jquery';
import { Card, Form, Table, Button, Row, Col} from 'react-bootstrap';

class App extends Component {

  constructor() {
    super();
    this.state = {listaColaborador: [], listaSetor: [], nome:'', cpf:'', email:'', dataNascimento:'', setorId:''};
    this.enviaForm = this.enviaForm.bind(this);
    this.getListaColaborador = this.getListaColaborador.bind(this);
  }

  componentDidMount() {
    this.getListaColaborador();
    this.getListaSetor();
  }

  getListaColaborador() {
    $.ajax({
      url:"http://localhost:8080/colaborador",
      dataType:'json',
      success:function(resposta) {
        this.setState({listaColaborador:resposta});
      }.bind(this)
    });
  }

  getListaSetor() {
    $.ajax({
      url:"http://localhost:8080/setor",
      dataType:'json',
      success:function(resposta) {
        this.setState({listaSetor:resposta});
      }.bind(this)
    });
  }

  salvaAlteracao(nomeInput, evento) {
    let campoSendoAlterado = {};
    campoSendoAlterado[nomeInput] = evento.target.value;
    this.setState(campoSendoAlterado);
    console.log(campoSendoAlterado)
  }

  enviaForm(evento) {
    evento.preventDefault();
    $.ajax({
      url:"http://localhost:8080/colaborador",
      contentType: 'application/json',
      dataType:'json',
      type:'post',
      data: JSON.stringify({nome:this.state.nome, 
        cpf:this.state.cpf, 
        email:this.state.email, 
        dataNascimento:new Date(this.state.dataNascimento),
        setorId:this.state.setorId}),
      success: function(resposta){
        console.log(resposta);

        let listaAtual = this.state.listaColaborador;
        listaAtual.push(resposta);
        this.setState({listaColaborador:listaAtual});

      }.bind(this),
      error: function(resposta){
        console.log(resposta);
      }
    });
  }

  render() {
    var setores = this.state.listaSetor.map(function (setor) {
      return <option key={setor.id} value={setor.id}>{setor.descricao}</option>
    });
    
    return (
      <Card>
        <Card.Header>Cadastrar Colaborador</Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Form onSubmit={this.enviaForm} method="post">
            <Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" placeholder="Digite o nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this,'nome')}/>
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Digite o email" value={this.state.email} onChange={this.salvaAlteracao.bind(this,'email')}/>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>CPF</Form.Label>
                  <Form.Control type="text" placeholder="Digite o cpf" value={this.state.cpf} onChange={this.salvaAlteracao.bind(this,'cpf')}/>
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Data nascimento</Form.Label>
                  <Form.Control type="date" placeholder="Digite o email" value={this.state.dataNascimento} onChange={this.salvaAlteracao.bind(this,'dataNascimento')}/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Selecione o setor</Form.Label>
                    <Form.Control as="select" multiple={false} name="setor" value={this.state.setorId} onChange={this.salvaAlteracao.bind(this,'setorId')}>
                      <option defaultValue=""></option>
                      {setores}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Gravar
            </Button>
          </Form>
          <br></br>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Data Nascimento</th>
                <th>Setor</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.listaColaborador.map(function(colaborador){
                  return (
                    <tr key={colaborador.id}>
                      <td>{colaborador.nome}</td>
                      <td>{colaborador.cpf}</td>
                      <td>{colaborador.email}</td>
                      <td>{colaborador.dataNascimento}</td>
                      <td>{colaborador.setor != null ? colaborador.setor.descricao : null}</td>
                    </tr>
                  );
                })
              }
            </tbody>
        </Table>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
    </Card>    
    );
  }
}

export default App;
