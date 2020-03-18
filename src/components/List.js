import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { urlApi, userId, AuthStr } from '../services/content';
import API from '../services/api';

import {
  Tabs, Tab, Button,
  Dropdown, DropdownToggle, DropdownMenu,
  DropdownItem, Toggle, Modal, TextField } from '@poool/junipero';
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
    segment: 'WatchList',
    newSegment: '',
    indexSegment: null,
    segmentOnClick: '',
    defaultModal: false,
    secondModal: false,
    submit: false,
  });

  useEffect(() => {
    API.getUser(urlApi(userId).user, setUser, setState, state);
  }, [state.submit]);


  const adultUpdate = async (bool) => {
    await axios.put(urlApi(userId).user, {
      adult: bool,
    }, {
      headers: { Authorization: AuthStr },
    });
  };

  const submit = async event => {
    event.preventDefault();

    await API.createSegment(
      urlApi(userId).userSegment,
      state.newSegment,
      state,
      setState
    );
  };

  const upSegment = async event => {
    event.preventDefault();

    await API.updateSegment(
      urlApi(userId).userSegment,
      {
        index: state.indexSegment,
        newSegment: state.newSegment,
      },
      state,
      setState
    );
  };

  const rmSegment = async event => {
    await API.removeSegment(
      urlApi(userId).userSegment,
      state.indexSegment,
      state,
      setState
    );
  };

  return (
    <>
      <div className="drop-segments">
        {/* Added Modal */}
        <Modal
          ref={(ref) => state.defaultModal = ref}
        >
          <form
            className="from-sign"
            onSubmit={submit}
          >
            <TextField
              placeholder="Segment Name"
              onChange={e => setState({
                ...state,
                newSegment: e.value,
              })}
            />
            <Button
              type="primary"
              size="big"
              submit={true}
              tag="button"
            >Send
            </Button>
          </form>
        </Modal>
        {/* control Modal */}
        <Modal
          ref={(ref) => state.secondModal = ref}
        >
          <form
            className="from-sign"
            onSubmit={upSegment}
          >
            <TextField
              placeholder="Segment Name"
              value={state.segmentOnClick}
              onChange={e => setState({
                ...state,
                newSegment: e.value,
              })}
            />
            <Button
              type="primary"
              size="big"
              submit={true}
              tag="button"
            >Send
            </Button>
          </form>
          <Button
            type="primary"
            size="big"
            tag="button"
            onClick={() => rmSegment()}
          >Delete
          </Button>
        </Modal>
        {/* END Modal */}
        <Dropdown>
          <DropdownToggle><h1>{state.segment} ◊</h1></DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={e => setState({
                ...state,
                segment: 'WatchList',
              })}
            >
              <a>WatchList</a>
            </DropdownItem>
            {
              state.fetching
                ? user.segments.map((items, index) => (
                  <DropdownItem
                    key={index}
                  >
                    <div className="segment-control">
                      <a
                        onClick={e => {
                          e.preventDefault();
                          setState({
                            ...state,
                            segment: items,
                          });
                        }}
                      >{items}</a>
                      <a
                        onClick={e => {
                          e.preventDefault();
                          state.secondModal.open();
                          setState({
                            ...state,
                            indexSegment: index,
                            segmentOnClick: items,
                          });
                        }}
                      >⚙</a>
                    </div>
                  </DropdownItem>
                ))
                : ''
            }
            {
              state.fetching
                ? user.segments.length === 5
                  ? ''
                  : (
                    <DropdownItem
                      onClick={() => state.defaultModal.open()}
                    >
                      <a>Add Segment</a>
                    </DropdownItem>
                  )
                : ''
            }
          </DropdownMenu>
        </Dropdown>
      </div>
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
      {
        state.segment === 'WatchList'
          ? (
            <Tabs>
              <Tab title="Movie"><WatchListMovie /></Tab>
              <Tab title="Tv"><WatchListTv /></Tab>
            </Tabs>
          ) : (
            <Tabs>
              <Tab title="Movie"><SegmentMovie type={state.segment} /></Tab>
              <Tab title="Tv"><SegmentTv type={state.segment} /></Tab>
            </Tabs>
          )
      }
    </>
  );
};
