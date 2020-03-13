import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import { TextField, Button } from '@poool/junipero';

const Account = () => {

  const [state, setState] = useState({
    email: '',
    passwd: '',
    err_1: false,
    err_2: false,
  });

  const submit = event => {

    event.preventDefault();

    axios.post('https://videotheque-server.ddns.net:8085/auth/login', {
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
        window.location = '/home';
      })
      .catch(err => {
        if (err.response.data.code === 1) {
          setState({
            ...state,
            err_2: false,
            err_1: true,
          });
        } else if (err.response.data.code === 2) {
          setState({
            ...state,
            err_1: false,
            err_2: true,
          });
        }
      });


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
                placeholder="Email"
                onChange={e => setState({
                  ...state,
                  email: e.value,
                })}
                required
              />
              { state.err_1 ?
                ( <span className="err">User Unknown</span> ) :
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
              { state.err_2 ?
                ( <span className="err">Wrong Password</span> ) :
                ''
              }
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
          </form>
        </Col>
      </Row>
    </Container>

  );

};

export default Account;
