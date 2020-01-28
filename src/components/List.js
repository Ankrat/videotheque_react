import React from 'react';
import {
  Tabs, Tab, Button,
  Dropdown, DropdownToggle, DropdownMenu,
  DropdownItem, Toggle } from '@poool/junipero';
import { Image } from 'react-bootstrap';

import '../styles/List.css';
import WatchListMovie from './watchlist/WatchListMovie';
import WatchListTv from './watchlist/WatchListTv';
import userImg from '../styles/img/userImg.png';

const AuthStr = sessionStorage.getItem('Authorization');
const userName = sessionStorage.getItem('userName');
// const userImg = sessionStorage.getItem('userImg');

export default () => {

  return (
    <>
      <h1>WatchList</h1>
      { AuthStr ?
        (
          <div className="redirect-log-btn">
            <Dropdown theme="none" placement="bottom-end">
              <DropdownToggle>
                <Button theme="none" type="primary" className="log-btn">
                  <Image
                    src={ `${userImg}` }
                    className="user-img"
                    roundedCircle/>
                  <p>{ userName }</p>
                </Button>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem><a>Parameter</a></DropdownItem>
                <DropdownItem>
                  <Toggle
                    className="logout-btn"
                    theme="none"
                    uncheckedLabel="En"
                    checkedLabel="Fr"
                  />
                </DropdownItem>
                <DropdownItem>
                  <Toggle
                    className="logout-btn"
                    theme="none"
                    uncheckedLabel="Dark mode"
                    checkedLabel="Dark mode"
                  />
                </DropdownItem>
                <DropdownItem
                  className="logout-btn"
                >
                  <Button
                    reversed={true}
                    type="danger"
                    onClick={() => {
                      sessionStorage.clear();
                      window.location = '/';
                    }}
                  >Disconnect
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
      <Tabs>
        <Tab title="Movie"><WatchListMovie /></Tab>
        <Tab title="Tv"><WatchListTv /></Tab>
      </Tabs>
    </>
  );
};
