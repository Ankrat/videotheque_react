import React from 'react';
import { Tabs, Tab } from '@poool/junipero';

import SearchFormMovie from './SearchFormMovie';
import SearchFormTv from './SearchFormTv';

import '../styles/Search.css';

export default () => {
  return (
    <>
      <Tabs>
        <Tab title="Movie"><SearchFormMovie /></Tab>
        <Tab title="Tv"><SearchFormTv /></Tab>
      </Tabs>
    </>
  );
};
