import React, { useState, useEffect } from 'react';
import {
  Tabs, Tab, Button,
  Dropdown, DropdownToggle, DropdownMenu,
  DropdownItem, Toggle } from '@poool/junipero';
import { Image } from 'react-bootstrap';

import axios from 'axios';
import { urlApi, userId, AuthStr } from '../../services/content';
import API from '../../services/api';

import SearchFormMovie from './SearchFormMovie';
import SearchFormTv from './SearchFormTv';

import '../../styles/Search.css';
import userImg from '../../styles/img/userImg.png';

const userName = sessionStorage.getItem('userName');
// const userImg = sessionStorage.getItem('userImg');

export default () => {

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    API.getUser(urlApi(userId).user, setUser);
  }, []);

  const adultUpdate = async (bool) => {
    await axios.put(urlApi(userId).user, {
      adult: bool,
    }, {
      headers: { Authorization: AuthStr },
    });
  };

  return (
    <>
      <div>
        <h1>Search</h1>
        { AuthStr && user ?
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
                  <DropdownItem
                    className="logout-btn"
                  >
                    <Button
                      reversed={true}
                      type="primary"
                    >Parameter
                    </Button>
                  </DropdownItem>
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
                      uncheckedLabel="Adult"
                      checkedLabel="Adult"
                      checked={user.adult || false}
                      onChange={(value, valid) =>
                        adultUpdate(value.checked)}
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
      </div>
      <Tabs>
        <Tab title="Movie">
          <SearchFormMovie
            segments={
              user
                ? user.segments
                : []
            }
          />
        </Tab>
        <Tab title="Tv"><SearchFormTv /></Tab>
      </Tabs>
    </>
  );
};
