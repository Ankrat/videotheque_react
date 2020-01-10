import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../styles/Search.css';


const url = 'https://api.themoviedb.org/3/search/tv?api_key=18cb3ed1e51594213b505970b2c9a0bf&language=en-US&';
const img = 'https://image.tmdb.org/t/p/';

export default () => {
  const [state, setState] = useState({
    get: [],
    query: 'a',
    page: 1,
  })
  useEffect(() => {
    search(state.query, state.page);
  }, [state.page, state.query]);

  const search = (query, page) => {

    if (state.query !== undefined) {
      axios.get(`${url}query=${query}&page=${page}`)
        .then(response => {
          setState({ get: response.data.results });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (

    <>
      <h2>Tv</h2>
      <Form.Control type="text"
        placeholder="Normal text"
        onChange={e => setState({
          ...state,
          query: e.target.value
         })}
        autoFocus
      />
      <ul>
        {
          state.get.map((elem, index) => (
            <li key={index}>
              <Link to={`/details/tv/${elem.id}`}>
                <Image src={`${img}w92${elem.poster_path}`} rounded />
                {elem.name}
            </Link>
            </li>
          ))
        }
      </ul>
    </>

  );
}
