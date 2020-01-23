import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { TextField, Button } from '@poool/junipero';

export default () => {

  return (

    <Container>
      <Row className="justify-content-md-center">
        <Col xs={5}>
          <div className="from-sign">
            <div className="txt-field">
              <TextField
                boxed={true}
                placeholder="First name"
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
          </div>
        </Col>
      </Row>
    </Container>

  );

};
