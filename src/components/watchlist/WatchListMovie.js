import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  classNames,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from '@poool/junipero';

import '../../styles/Details.css';
import ButtonDel from '../fragments/ButtonDel';

// const apiKey = '?api_key=18cb3ed1e51594213b505970b2c9a0bf&language=en-US';
const url = 'http://localhost:8085/api/watchlist-mv/';

const img = 'https://image.tmdb.org/t/p/';

const AuthStr = sessionStorage.getItem('Authorization');

const userId = sessionStorage.getItem('userId');

export default (props) => {
  const [state, setState] = useState({
    films: [],
    fetching: true,
    delete: true,
    statusChange: false,
  });

  useEffect(() => {
    if (AuthStr !== null) {
      details();
    }
  }, [state.statusChange, state.delete]);

  const details = () => {
    axios.get(`${url}${userId}`, {
      headers: { Authorization: AuthStr },
    })
      .then(response => {
        setState({
          films: response.data.data || [],
          fetching: false,
        });
      }).catch(err => {
        console.log(err);
      });
  };

  const statusView = (_id, status) => {
    axios.put(`${url}${_id}`, {
      status: status,
    },
    { headers: { Authorization: AuthStr },
    })
      .then(res => console.log(res))
      .catch(err => console.error(err));

    setState({
      ...state,
      statusChange: !state.statusChange,
    });
  };

  const render = () => {
    if (!state.fetching) {
      return (
        state.films.map((items, index) => (
          <li key={index}>
            <Link to={`/details/movie/${items.movie_id}`}>
              <Image src={`${img}w92${items.img}`} rounded />
              {items.title}
            </Link>
            <Dropdown>
              <DropdownToggle
                className={classNames(
                  'state',
                  `state-${items.status}`
                )}
              >
                {
                  items.status === 'to_see'
                    ? 'To See'
                    : items.status === 'watching'
                      ? 'Watching'
                      : 'Seen'
                }
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Button
                    variant="link"
                    className="state"
                    onClick={ () => statusView(items._id, 'to_see') }
                  >To See</Button>
                </DropdownItem>
                <DropdownItem>
                  <Button
                    variant="link"
                    className="state"
                    onClick={ () => statusView(items._id, 'watching') }
                  >Watching</Button>
                </DropdownItem>
                <DropdownItem>
                  <Button
                    variant="link"
                    className="state"
                    onClick={ () => statusView(items._id, 'seen') }
                  >Seen</Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <ButtonDel
              title="Delete"
              className="btn-add"
              reversed={true}
              type="danger"
              dataId={items._id}
              userId={userId}
              url="http://localhost:8085/api/watchlist-mv"
              onClick={() => setState({
                fetching: true,
                delete: !state.delete,
              })}
            />
          </li>
        ))
      );
    }
  };

  return (
    <ul>{
      render()
    }</ul>
  );
};
