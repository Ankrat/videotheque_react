import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {
  classNames,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from '@poool/junipero';

import '../../styles/Details.css';
import ButtonDel from '../fragments/ButtonDel';
import { AuthStr, userId, urlApi, img } from '../../services/content';
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
        urlApi(userId).tv,
        state,
        setState
      );
    }
  }, [state.statusChange, state.delete]);

  const statusView = (_id, status) => {
    axios.put(urlApi(_id).tv, {
      general_status: status,
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
            state.get.map((items, index) => (
              <li key={index} className="li-data">
                <div className="film">
                  <Link to={`/details/tv/${items.tv.id_details}`}>
                    <Image src={`${img}w92${items.tv.poster_path}`} rounded />
                    <h6>{items.tv.title}</h6>
                  </Link>
                </div>
                <div className="control">
                  <Dropdown>
                    <DropdownToggle
                      className={classNames(
                        'state',
                        `state-${items.general_status}`
                      )}
                    >
                      {
                        items.general_status === 'to_see'
                          ? 'To See'
                          : items.general_status === 'watching'
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
                    className="btn-add"
                    reversed={true}
                    type="danger"
                    url={urlApi(items._id).tv}
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
  );
};
