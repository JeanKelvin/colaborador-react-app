import React, { Component } from 'react';
import $ from 'jquery';
import { Card, Form, Table, Button, Row, Col} from 'react-bootstrap';

export class FormColaborador extends Component {

    constructor(){
        super();
        this.state = {lista: [], nome:'', cpf:'', email:'', dataNascimento:''};
        this.enviaForm = this.enviaForm.bind(this);
        this.getListaColaborador = this.getListaColaborador.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setCPF = this.setCPF.bind(this);
        this.setDataNascimento = this.setDataNascimento.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
          url:"http://localhost:8080/colaborador",
          contentType: 'application/json',
          dataType:'json',
          type:'post',
          data: JSON.stringify({nome:this.state.nome, cpf:this.state.cpf, email:this.state.email, dataNascimento:this.state.dataNascimento}),
          success: function(resposta){
            console.log(resposta);
    
            let listaAtual = this.state.lista;
            listaAtual.push(resposta);
            this.setState({lista:listaAtual});
    
          }.bind(this),
          error: function(resposta){
            console.log(resposta);
          }
        });
      }

    setNome(evento){
      this.setState({nome:evento.target.value});
    }    
    
    setEmail(evento){
      this.setState({email:evento.target.value});
    }
      
    setCPF(evento){
      this.setState({cpf:evento.target.value});
    }
    
      setDataNascimento(evento){
        this.setState({dataNascimento:evento.target.value});
      } 

    render() {
        return (
            <Form onSubmit={this.enviaForm} method="post">
            <Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" placeholder="Digite o nome" value={this.state.nome} onChange={this.setNome}/>
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Digite o email" value={this.state.email} onChange={this.setEmail}/>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>CPF</Form.Label>
                  <Form.Control type="text" placeholder="Digite o cpf" value={this.state.cpf} onChange={this.setCPF}/>
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Data nascimento</Form.Label>
                  <Form.Control type="date" placeholder="Digite o email" value={this.state.dataNascimento} onChange={this.setDataNascimento}/>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Gravar
            </Button>
          </Form>
        );
    }
}

export class TableColaborador extends Component {

    constructor() {
        super();
        this.state = {lista: []};
      }
    
    componentDidMount() {
        $.ajax({
          url:"http://localhost:8080/colaborador",
          dataType:'json',
          success:function(resposta) {
            this.setState({lista:resposta});
          }.bind(this)
         });;
    }

    render() {
        return(
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
                    this.state.lista.map(function(colaborador){
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
        );
    }
}