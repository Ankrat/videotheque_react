import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form } from 'react-bootstrap';

import { TextField, Button } from '@poool/junipero';

import '../../styles/Forms.css';

export default () => {

  const [state, setState] = useState({
    name: '',
    userName: '',
    email: '',
    passwd: '',
    err_666: false,
  });

  const submit = event => {

    event.preventDefault();

    axios.post('https://videotheque-server.ddns.net:8085/auth/signup', {
      name: state.name,
      username: state.userName,
      email: state.email,
      password: state.passwd,
    })
      .then(res => window.location = '/')
      .catch(err => {
        if (err.response.data.code === 666) {
          setState({
            ...state,
            err_666: true,
          });
        }
      });

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
                placeholder="Name"
                onChange={e => setState({
                  ...state,
                  name: e.value,
                })}
                required
              />
            </div>
            <div className="txt-field">
              <TextField
                placeholder="User Name"
                onChange={e => setState({
                  ...state,
                  userName: e.value,
                })}
                required
              />
            </div>
            <div className="txt-field">
              <TextField
                placeholder="Email"
                onChange={e => setState({
                  ...state,
                  email: e.value,
                })}
                required
              />
              { state.err_666 ?
                ( <span className="err">email already exists</span> ) :
                ''
              }
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
                required
              />
            </div>
            <div className="btn-log">
              <Button
                type="primary"
                size="big"
                submit={true}
                tag="button"
              >Send
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );

};
