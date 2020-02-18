import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TextField } from '@poool/junipero';

import '../../styles/Search.css';
import noimg from '../../styles/img/noimg.png';
import ButtonAdd from '../fragments/ButtonAdd';
import { url, img, urlApi, userId } from '../../services/content';
import API from '../../services/api';


export default () => {

  const [user, setUser] = useState(undefined);

  const [state, setState] = useState({
    get: [],
    query: 'a',
    page: 1,
  });

  useEffect(() => {
    API.getUser(urlApi(userId).user, setUser);

    if (state.query !== undefined && state.query !== '' && user !== undefined) {

      let source = axios.CancelToken.source();

      API.loadData(
        url(0, state.query, state.page, user.adult).query_movie,
        state,
        setState,
        source
      );

      return () => {
        source.cancel();
      };


    }
  }, [state.page, state.query]);

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
      <ul className="ul-data">
        {
          state.get.map((elem, index) => (
            <li key={`elem${index}`} className="li-data">
              <div className="film">
                <Link to={`/details/movie/${elem.id}`}>
                  <Image
                    className="img-data"
                    src={ elem.poster_path
                      ? `${img}w92${elem.poster_path}`
                      : noimg }
                    rounded />
                  <h6>{elem.title}</h6>
                </Link>
                { elem.adult ? '🔞' : '' }
              </div>
              <ButtonAdd
                title="Add to WatchList"
                className="btn-add"
                reversed={true}
                type="success"
                url={urlApi(userId).movie}
                data={{
                  poster_path: elem.poster_path,
                  title: elem.title,
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
