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
        <Tab title="Login"><Signup /></Tab>
        <Tab title="Signup"><Login /></Tab>
      </Tabs>
    </>
  );
};
