import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../styles/Home.css';

export default () => {

  return (
    <>
      <Container>
        <Row>
          <Col md={12}><h1>Hello !</h1></Col>
        </Row>
      </Container>
    </>
  );
};
