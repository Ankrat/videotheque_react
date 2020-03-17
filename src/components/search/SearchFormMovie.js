import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TextField } from '@poool/junipero';
import Loader from 'react-loader-spinner';

import '../../styles/Search.css';
import noimg from '../../styles/img/noimg.png';
import ButtonAdd from '../fragments/ButtonAdd';
import { url, img, urlApi, userId } from '../../services/content';
import API from '../../services/api';


export default () => {

  // const [user, setUser] = useState(undefined);

  const [state, setState] = useState({
    get: [],
    query: 'a',
    page: 1,
    current_page: 1,
    total_pages: 5,
    fetching: true,
  });

  useEffect(() => {
    // API.getUser(urlApi(userId).user, setUser);

    if (state.query !== undefined && state.query !== '') {

      let source = axios.CancelToken.source();

      API.loadData(
        url(0, state.query, state.page).query_movie,
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
      <h2>Movie</h2>
      <div className="search">
        <TextField
          type="text"
          className="search-field"
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
      </div>
      {
        state.fetching
          ? (
            <div className="spinner-custom">
              <Loader
                type="CradleLoader"
                color="#00BFFF"
                height={100}
                width={100}
              />
            </div>
          ) : (
            <>
              { page() }
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
                          <h6>
                            {
                              elem.title.length >= 25
                                ? elem.title.substr(0, 25) + '...'
                                : elem.title
                            }
                          </h6>
                        </Link>
                        { elem.adult ? '🔞' : '' }
                      </div>
                      {
                        userId
                          ? (
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
                          ) : ''
                      }
                    </li>
                  ))
                }
              </ul>
              { page() }
            </>
          )
      }

    </>
  );
};
