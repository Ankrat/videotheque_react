import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TextField } from '@poool/junipero';

import '../../styles/Search.css';
import noimg from '../../styles/img/noimg.png';
import ButtonAdd from '../fragments/ButtonAdd';


const url = 'https://api.themoviedb.org/3/search/tv?api_key=' +
            '18cb3ed1e51594213b505970b2c9a0bf&language=en-US&';
const img = 'https://image.tmdb.org/t/p/';

export default () => {
  const [state, setState] = useState({
    get: [],
    query: 'a',
    page: 1,
  });
  useEffect(() => {
    if (state.query !== undefined && state.query !== '') {
      search(state.query, state.page);
    }
  }, [state.page, state.query]);

  const search = (query, page) => {

    if (state.query !== undefined) {
      axios.get(`${url}query=${query}&page=${page}`)
        .then(response => {
          setState({
            ...state,
            get: response.data.results,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (

    <>
      <h2>Tv</h2>
      <TextField
        type="text"
        boxed={true}
        placeholder="NAME"
        onChange={e => setState({
          ...state,
          query: e.value,
        })}
        autoFocus
      />
      <ul>
        {
          state.get.map((elem, index) => (
            <li key={index}>
              <Link to={`/details/tv/${elem.id}`}>
                <Image src={ elem.poster_path ?
                  `${img}w92${elem.poster_path}` :
                  noimg } rounded />
                {elem.name}
              </Link>
              <ButtonAdd
                title="Add to WatchList"
                className="btn-add"
                reversed={true}
                type="success"
                url="http://localhost:8085/api/watchlist-tv/"
                data={{
                  img: elem.poster_path,
                  title: elem.name,
                  id_details: elem.id,
                }}
              />
            </li>
          ))
        }
      </ul>
    </>

  );
};
