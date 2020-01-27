import React from 'react';
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

  const send = () => {
    axios.post(`${url}${userId}`, {
      img: data.img,
      title: data.title,
      id_details: data.id_details,
    }, {
      headers: { Authorization: AuthStr },
    })
      .then(res => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Button
      className={className}
      reversed={reversed}
      type={type}
      onClick={e => {
        e.preventDefault();
        send();
      }}
    >{ title }</Button>
  );
};
