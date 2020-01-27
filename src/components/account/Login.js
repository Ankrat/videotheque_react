import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { TextField, Button } from '@poool/junipero';

const Account = () => {

  const [state, setState] = useState({
    email: '',
    passwd: '',
  });

  const submit = event => {

    event.preventDefault();

    axios.post('http://localhost:8085/auth/login', {
      email: state.email,
      password: state.passwd,
    })
      .then(res => {
        sessionStorage
          .setItem('Authorization', `Bearer ${res.data.token}`);
        sessionStorage
          .setItem('userId', res.data.userId);
        sessionStorage
          .setItem('userName', res.data.userName);
      })
      .catch(err => console.log(err));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={5}>
          <form
            className="from-sign"
            onSubmit={submit}
          >
            <div className="txt-field">
              <TextField
                boxed={true}
                placeholder="Email"
                onChange={e => setState({
                  ...state,
                  email: e.value,
                })}
              />
            </div>
            <div className="txt-field">
              <TextField
                theme="none"
                type="password"
                placeholder="Password"
                onChange={e => setState({
                  ...state,
                  passwd: e.value,
                })}
              />
            </div>
            <div className="btn-log">
              <Button
                type="primary"
                size="big"
                submit={true}
                onClick={submit}
              >Send
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>

  );

};

export default Account;
