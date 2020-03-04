import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TextField } from '@poool/junipero';

import '../../styles/Search.css';
import noimg from '../../styles/img/noimg.png';
import ButtonAdd from '../fragments/ButtonAdd';
import API from '../../services/api';
import { url, img, urlApi, userId } from '../../services/content';


export default () => {
  const [state, setState] = useState({
    get: [],
    query: 'a',
    page: 1,
  });

  useEffect(() => {
    if (state.query !== undefined && state.query !== '') {

      let source = axios.CancelToken.source();

      API.loadData(
        url(0, state.query, state.page).query_tv,
        state,
        setState,
        source
      );

      return () => {
        source.cancel();
      };

    }
  }, [state.page, state.query]);

  const page = () => {

    return (
      <div>
        <Pagination>
          <Pagination.Prev
            onClick={() => {
              if (state.page === 1) {
                return;
              }
              setState({
                ...state,
                page: (state.page - 1),
              });
            }}
          />
          <Pagination.Item
            onClick={() => setState({
              ...state,
              page: 1,
            })}
          >{1}</Pagination.Item>
          <Pagination.Ellipsis disabled/>

          <Pagination.Item active>{state.current_page}</Pagination.Item>

          <Pagination.Ellipsis disabled/>
          <Pagination.Item
            onClick={() => setState({
              ...state,
              page: state.total_pages,
            })}
          >{state.total_pages}</Pagination.Item>
          <Pagination.Next
            onClick={() => {
              if (state.page === state.total_pages) {
                return;
              }
              setState({
                ...state,
                page: (state.page + 1),
              });
            }}
          />
        </Pagination>
      </div>
    );
  };


  return (

    <>
      <h2>Tv</h2>
      <TextField
        type="text"
        placeholder="NAME"
        onChange={e => setState({
          ...state,
          query: e.value,
        })}
        autoFocus
      />
      { page() }
      <ul className="ul-data">
        {
          state.get.map((elem, index) => (
            <li key={index} className="li-data">
              <div className="film">
                <Link to={`/details/tv/${elem.id}`}>
                  <Image src={ elem.poster_path ?
                    `${img}w92${elem.poster_path}` :
                    noimg } rounded />
                  <h6>{elem.name}</h6>
                </Link>
              </div>
              <ButtonAdd
                title="Add to WatchList"
                className="btn-add"
                reversed={true}
                type="success"
                url={urlApi(userId).tv}
                data={{
                  poster_path: elem.poster_path,
                  title: elem.name,
                  id_details: elem.id,
                }}
              />
            </li>
          ))
        }
      </ul>
      { page() }
    </>

  );
};
