import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@poool/junipero';

import '../../styles/Search.css';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=' +
            '18cb3ed1e51594213b505970b2c9a0bf&language=en-US&';
const img = 'https://image.tmdb.org/t/p/';

export default () => {
  const [state, setState] = useState({
    get: [],
    query: 'a',
    page: 1,
  });
  useEffect(() => {
    if (state.query !== undefined) {
      search(state.query, state.page);
    }
  }, [state.page, state.query]);

  const search = (query, page) => {

    axios.get(`${url}query=${query}&page=${page}&include_adult=false`)
      .then(response => {
        setState({ get: response.data.results });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

    <>
      <h2>Movie</h2>
      <TextField
        boxed={true}
        type="text"
        placeholder="NAME"
        onChange={e => setState({
          ...state,
          query: e.value,
        })}
        onSubmit={e => {
          e.preventDefault();

        }}
        autoFocus
      />
      <ul>
        {
          state.get.map((elem, index) => (
            <li key={index}>
              <Link to={`/details/movie/${elem.id}`}>
                {console.log(<Image src={`${img}w92${elem.poster_path}`} rounded />)}
                {elem.title}
              </Link>
              <Button
                className="btn-add"
                reversed={true}
                type="success"
              >Add to WatchList</Button>
              <Button
                className="btn-add"
                reversed={true}
                type="warning"
              >Add to Fav</Button>
            </li>
          ))
        }
      </ul>
    </>

  );
};
