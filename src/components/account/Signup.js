import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form } from 'react-bootstrap';

import { TextField, Button } from '@poool/junipero';

import '../../styles/Forms.css';

export default () => {

  const [state, setState] = useState({
    name: '',
    userName: '',
    passwd: '',
    passwdConf: '',
    passState: false,
    err_666: false,
  });

  const submit = event => {

    event.preventDefault();

    axios.post('http://videotheque-server.ddns.net:8085/auth/signup', {
      name: state.name,
      username: state.userName,
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

  const confPass = () => {
    if (state.passwd === state.passwdConf) {
      setState({
        ...state,
        passState: true,
      });
    } else {
      setState({
        ...state,
        passState: false,
      });
    }
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
              { state.err_666
                  ? ( <span className="err">username already exists</span> )
                  : ''
              }
            </div>
            <div className="txt-field">
              <TextField
                theme="none"
                type="password"
                placeholder="Password"
                onChange={async e => {
                  setState({
                    ...state,
                    passwd: e.value,
                    passState: e.value !== state.passwdConf
                  });
                }}
                required
              />
            </div>
            <div className="txt-field">
              <TextField
                theme="none"
                type="password"
                placeholder="Confirmation Password"
                onChange={e => {
                  setState({
                    ...state,
                    passwdConf: e.value,
                    passState: e.value !== state.passwd
                  });
                }}
                required
              />
              {
                state.passState
                  ? ( <span className="err">Wrong password</span> )
                  : ''
              }
            </div>
            <div className="btn-log">
              <Button
                type="primary"
                size="big"
                submit={true}
                tag="button"
                disabled={state.passState}
              >Send
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );

};
