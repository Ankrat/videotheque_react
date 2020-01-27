import React from 'react';
import { Tabs, Tab, Button } from '@poool/junipero';

import '../styles/List.css';
import WatchListMovie from './watchlist/WatchListMovie';
import WatchListTv from './watchlist/WatchListTv';

const AuthStr = sessionStorage.getItem('Authorization');

export default () => {

  return (
    <>
      <h1>WatchList</h1>
      { AuthStr ?
        ( <Button
          className="redirect-log-btn"
          reversed={true}
          type="danger"
          onClick={() => {
            sessionStorage.clear();
            window.location = '/';
          }}
        >Disconnect
        </Button> ) :
        ( <Button
          className="redirect-log-btn"
          type="primary"
          onClick={() => window.location = '/'}
        >Login
        </Button> )
      }
      <Tabs>
        <Tab title="Movie"><WatchListMovie /></Tab>
        <Tab title="Tv"><WatchListTv /></Tab>
      </Tabs>
    </>
  );
};
