import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {
  classNames,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from '@poool/junipero';

import '../../styles/Details.css';
import ButtonDel from '../fragments/ButtonDel';
import { AuthStr, userId, urlApi, img} from '../../services/content';
import API from '../../services/api';

export default (props) => {
  const [state, setState] = useState({
    get: [],
    fetching: true,
    delete: false,
    statusChange: false,
    slice: 20,
    defaultModal: false,
  });

  useEffect(() => {
    if (AuthStr !== null) {
      API.getIdItems(
        urlApi(userId).movie,
        state,
        setState
      );
    }
  }, [state.statusChange, state.delete]);

  const statusView = (_id, status) => {
    axios.put(urlApi(_id).movie, {
      status: status,
    },
    { headers: { Authorization: AuthStr },
    })
      .then(res =>
        setState({
          ...state,
          statusChange: !state.statusChange,
        }))
      .catch(err => console.error(err));
  };

  return (
    <>
      <ul className="ul-data">
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
              state.get.slice(0, state.slice).map((items, index) => (
                <li key={index} className="li-data">
                  <div className="film">
                    <Link to={`/details/movie/${items.movie.id_details}`}>
                      <Image
                        src={`${img}w92${items.movie.poster_path}`}
                        rounded
                      />
                      <h6>
                        {
                          items.movie.title.length >= 25
                            ? items.movie.title.substr(0, 25) + '...'
                            : items.movie.title
                        }
                      </h6>
                    </Link>
                  </div>
                  <div className="control">
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
                      title="Confirm"
                      className="btn-add button"
                      reversed={true}
                      type="danger"
                      url={urlApi(items._id).movie}
                      Click={() => setState({
                        ...state,
                        delete: !state.delete,
                      })}
                    />
                  </div>
                </li>

              ))
            )
        }
      </ul>
      {
        state.get.length > 20
          ? (
            <div className="button-pagination">
              {
                state.slice === undefined
                  ? (
                    <Button
                      variant="info"
                      onClick={() => setState({
                        ...state,
                        slice: 20,
                      })}
                    >Close all
                    </Button>
                  ) : (
                    <Button
                      variant="info"
                      onClick={() => setState({
                        ...state,
                        slice: undefined,
                      })}
                    >Show all
                    </Button>
                  )
              }
            </div>
          ) : ''
      }
    </>

  );
};
