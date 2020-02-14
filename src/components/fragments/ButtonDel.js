import React from 'react';

import { Button } from '@poool/junipero';
import API from '../../services/api';

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

  return (
    <Button
      className={className}
      reversed={reversed}
      type={type}
      onClick={e => {
        e.preventDefault();
        API.remove(url);
        onClick();
      }}
    >{ title }</Button>
  );
};
