import React, { useState } from 'react';
import axios from 'axios';

import { Button } from '@poool/junipero';

const AuthStr = sessionStorage.getItem('Authorization');

const userId = sessionStorage.getItem('userId');

export default ({
  title = 'Title',
  className = 'btn-add',
  reversed = true,
  type = 'success',
  data = {},
  url,
}) => {

  const [state, setState] = useState({
    err_3: false,
  });

  const send = async () => {

    try {
      const response = await axios.post(`${url}${userId}`, {
        img: data.img,
        title: data.title,
        id_details: data.id_details,
      }, {
        headers: { Authorization: AuthStr },
      });
      if (response.data.code === 3) {
        setState({
          ...state,
          err_3: true,
        });
      }
    } catch (e) {
      if (e.response.data.code === 3) {
        setState({
          ...state,
          err_3: true,
        });
      }
    }
  };

  return (
    <>
      <Button
        className={className}
        reversed={reversed}
        type={type}
        onClick={e => {
          e.preventDefault();
          setState({
            ...state,
            err_3: false,
          });
          send();
        }}
      >{ title }
      </Button>
      { state.err_3 ? 'Alredy in Watchlist !' : '' }
    </>
  );
};
