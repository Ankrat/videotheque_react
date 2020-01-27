import React from 'react';
import { Tabs, Tab, Button } from '@poool/junipero';

import SearchFormMovie from './SearchFormMovie';
import SearchFormTv from './SearchFormTv';

import '../../styles/Search.css';

const AuthStr = sessionStorage.getItem('Authorization');
const userName = sessionStorage.getItem('userName');

export default () => {
  return (
    <>
      <div>
        <h1>Search</h1>
        { AuthStr ?
          (
            <div className="redirect-log-btn">
              <p>{ userName }</p>
              <Button
                reversed={true}
                type="danger"
                onClick={() => {
                  sessionStorage.clear();
                  window.location = '/';
                }}
              >Disconnect
              </Button>
            </div>
          ) :
          (
            <Button
              className="redirect-log-btn"
              type="primary"
              onClick={() => window.location = '/'}
            >Login
            </Button>
          )
        }
      </div>
      <Tabs>
        <Tab title="Movie"><SearchFormMovie /></Tab>
        <Tab title="Tv"><SearchFormTv /></Tab>
      </Tabs>
    </>
  );
};
