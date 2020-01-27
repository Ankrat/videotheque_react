import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../../styles/Details.css';
import ButtonDel from '../fragments/ButtonDel';


// const apiKey = '?api_key=18cb3ed1e51594213b505970b2c9a0bf&language=en-US';
const url = 'http://localhost:8085/api/watchlist-tv/';

const img = 'https://image.tmdb.org/t/p/';

const AuthStr = sessionStorage.getItem('Authorization');

const userId = sessionStorage.getItem('userId');

export default (props) => {
  const [state, setState] = useState({
    get: {},
    fetching: true,
    delete: true,
  });

  useEffect(() => {
    details();
  }, [state.delete]);

  const details = () => {
    axios.get(`${url}${userId}`, {
      headers: { Authorization: AuthStr },
    })
      .then(response => {
        setState({
          get: response.data,
          fetching: false });
      }).catch(err => console.log(err));
  };

  const render = () => {
    if (!state.fetching) {
      return (
        state.get.data.map((items, index) => (
          <li key={index}>
            <Link to={`/details/tv/${items.id_details}`}>
              <Image src={`${img}w92${items.img}`} rounded />
              {items.title}
            </Link>
            <ButtonDel
              title="Delete"
              className="btn-add"
              reversed={true}
              type="danger"
              data={items._id}
              url="http://localhost:8085/api/watchlist-tv/"
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
