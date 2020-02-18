import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  classNames,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from '@poool/junipero';

import '../../styles/Details.css';
import ButtonDel from '../fragments/ButtonDel';
import { AuthStr, userId, urlApi, img} from '../../services/content';
import API from '../../services/api';

export default (props) => {
  const [state, setState] = useState({
    get: [],
    fetching: true,
    delete: true,
    statusChange: false,
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

    setState({
      ...state,
      statusChange: !state.statusChange,
    });
  };


  return (

    <ul>
      {!state.fetching
        ? (
          state.get.map((items, index) => (
            <li key={index}>
              <Link to={`/details/movie/${items.movie.id_details}`}>
                <Image src={`${img}w92${items.movie.poster_path}`} rounded />
                {items.movie.title}
              </Link>
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
                title="Delete"
                className="btn-add"
                reversed={true}
                type="danger"
                url={urlApi(items._id).movie}
                onClick={() => setState({
                  fetching: true,
                  delete: !state.delete,
                })}
              />
            </li>

          ))
        ) : (
          <>
            <p>nope</p>
          </>
        )
      }
    </ul>

  );
};
