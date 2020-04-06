import React, { useEffect, useState } from 'react';

import { urlApi, userId } from '../../services/content';
import API from '../../services/api';

import {
  Button,
  Dropdown, DropdownToggle, DropdownMenu,
  DropdownItem, Modal, TextField } from '@poool/junipero';

export default ({ changeSegment = () => {} }) => {

  const [user, setUser] = useState(undefined);

  const [state, setState] = useState({
    fetching: false,
    segment: 'General',
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
            onClick={async () => {
              await setState({
                ...state,
                segment: 'General',
              });
              await changeSegment('General');
            }}
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
                      onClick={async e => {
                        e.preventDefault();
                        await setState({
                          ...state,
                          segment: items,
                        });
                        await changeSegment(items);
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
  );
};
