import React from 'react';
import axios from 'axios';

import { Button } from '@poool/junipero';

const AuthStr = sessionStorage.getItem('Authorization');

export default ({
  title = 'Title',
  className = 'btn-add',
  reversed = true,
  type = 'success',
  dataId,
  userId,
  url,
  onClick = () => {},
}) => {

  const remove = () => {
    axios.delete(`${url}/${dataId}`, {
      headers: { Authorization: AuthStr },
      user_id: userId,
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
        remove();
        onClick();
      }}
    >{ title }</Button>
  );
};
