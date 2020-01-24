import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { TextField, Button } from '@poool/junipero';

import '../../styles/Forms.css';

export default () => {

  const [state, setState] = useState({
    name: '',
    userName: '',
    email: '',
    passwd: '',
  });

  const submit = event => {

    event.preventDefault();

    axios.post('http://localhost:8085/auth/signup', {
      name: state.name,
      userName: state.userName,
      email: state.email,
      passwd: state.passwd,
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={5}>
          <Form
            className="from-sign"
            onSubmit={submit}
          >
            <div className="txt-field">
              <TextField
                boxed={true}
                placeholder="Name"
              />
            </div>
            <div className="txt-field">
              <TextField
                placeholder="User Name"
              />
            </div>
            <div className="txt-field">
              <TextField
                boxed={true}
                placeholder="Email"
              />
            </div>
            <div className="txt-field">
              <TextField
                theme="none"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="btn-log">
              <Button
                type="primary"
                size="big"
                submit={true}
              >Send
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );

};
