import React from 'react';
import { Tabs, Tab } from '@poool/junipero';

import '../styles/List.css';
import Signup from './account/Signup';
import Login from './account/Login';

export default () => {

  return (
    <>
      <h1>Authentifcation</h1>
      <Tabs>
        <Tab title="Login"><Login /></Tab>
        <Tab title="Signup"><Signup /></Tab>
      </Tabs>
    </>
  );
};
