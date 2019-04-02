/*import React, { Component } from 'react';
import {Form} from 'react-bootstrap';


export default class SelectBox extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var setores = this.props.listaSetor.map(function (setor) {
            return <option key={setor.id} value={setor.descricao} selected={setor.id}>{setor.descricao}</option>
        });

        return (
            <Form.Group>
                <Form.Label>Selecione o setor</Form.Label>
                  <Form.Control as="select" multiple={false} name="setor" onChange={this.setSetor}>
                    <option defaultValue=""></option>
                    {setores}
                </Form.Control>
            </Form.Group>
        );
    }
}*/