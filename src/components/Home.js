import React from 'react';
import { Tabs, Tab } from '@poool/junipero';

import '../styles/Home.css';
import WatchListMovie from './watchlist/WatchListMovie';
import WatchListTv from './watchlist/WatchListTv';

export default () => {

  return (
    <>
      <h1>WatchList</h1>
      <Tabs>
        <Tab title="Movie"><WatchListMovie /></Tab>
        <Tab title="Tv"><WatchListTv /></Tab>
      </Tabs>
    </>
  );
};
