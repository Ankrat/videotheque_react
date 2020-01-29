import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { classNames } from '@poool/junipero';

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
  });

  useEffect(() => {
    if (AuthStr !== null) {
      details();
    }
  }, [state.delete]);

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

  const render = () => {
    if (!state.fetching) {
      return (
        state.films.map((items, index) => (
          <li key={index}>
            <Link to={`/details/movie/${items.movie_id}`}>
              <Image src={`${img}w92${items.img}`} rounded />
              {items.title}
            </Link>
            {console.log(items)}
            <a
              className={classNames(
                'state',
                `state-${items.status}`
              )}
            >{
                items.status === 'to_see'
                  ? 'To See'
                  : items.status === 'in_progress'
                    ? 'In Progress'
                    : 'Done'
              }
            </a>
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
