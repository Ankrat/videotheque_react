import React, { useState } from 'react';

import { Button } from '@poool/junipero';

import API from '../../services/api';

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
          API.send(url, data, state, setState);
        }}
      >{ title }
      </Button>
      { state.err_3 ? 'Alredy in Watchlist !' : '' }
    </>
  );
};
