import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

const url = 'https://api.themoviedb.org/3/search/tv?api_key=18cb3ed1e51594213b505970b2c9a0bf&language=en-US&';


export default () => {
  const [state, setState] = useState({
    get: [],
    query: 'willow',
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
      <Form.Control type="text"
        placeholder="Normal text"
        onChange={e => setState({
          ...state,
          query: e.target.value
         })}
      />
      <ul>
        {
          state.get.map((elem, index) => (
            <li key={index}>{elem.name}</li>
          ))
        }
      </ul>
    </>

  );
}
