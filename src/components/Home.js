import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Tabs, Tab } from '@poool/junipero';

import '../styles/Home.css';

export default () => {

  return (
    <>
      <h1>WatchList</h1>
      <Tabs>
        <Tab title="Movie"></Tab>
        <Tab title="Tv"></Tab>
      </Tabs>
    </>
  );
};
