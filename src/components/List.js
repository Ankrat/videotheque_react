import React, { useEffect, useState } from 'react';

import SegmentSelector from './fragments/SegmentSelector';
import { urlApi, userId, AuthStr } from '../services/content';
import API from '../services/api';

import {
  Tabs, Tab, Button,
  Dropdown, DropdownToggle, DropdownMenu,
  DropdownItem, Toggle } from '@poool/junipero';
import { Image } from 'react-bootstrap';

import '../styles/List.css';
import WatchListMovie from './watchlist/WatchListMovie';
import WatchListTv from './watchlist/WatchListTv';
import SegmentMovie from './segment/SegmentMovie';
import SegmentTv from './segment/SegmentTv';
import userImg from '../styles/img/userImg.png';

const userName = sessionStorage.getItem('userName');
// const userImg = sessionStorage.getItem('userImg');



export default () => {

  const [user, setUser] = useState(undefined);

  const [state, setState] = useState({
    fetching: false,
    SegmentMovie: 'Watchlist',
  });

  useEffect(() => {
    API.getUser(urlApi(userId).user, setUser, setState, state);
  }, []);
  
  return (
    <>
      <SegmentSelector
        changeSegment={segment => setState({
          ...state,
          SegmentMovie: segment,
        })}
      />
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
        <Tab title="Movie">
          <WatchListMovie segment={state.SegmentMovie} />
        </Tab>
        <Tab title="Tv"><WatchListTv /></Tab>
      </Tabs>

    </>
  );
};
