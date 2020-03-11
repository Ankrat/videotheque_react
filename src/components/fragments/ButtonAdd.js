import React, { useState } from 'react';

import { Button, Modal } from '@poool/junipero';

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
    defaultModal: false,
  });

  const closeDefaultModal = setTimeout(() => {
    state.defaultModal.close();
  }, 1000);

  return (
    <>
      <Modal
        ref={(ref) => state.defaultModal = ref}
      >{
          state.err_3
            ? (<p>Alredy in watchlist</p>)
            : (<p>It's a good show</p>)
        }
      </Modal>
      <Button
        className={className}
        reversed={reversed}
        type={type}
        onClick={async e => {
          e.preventDefault();
          // setState({
          //   ...state,
          //   err_3: false,
          // });
          API.send(url, data, state, setState);
          await state.defaultModal.open();
          await closeDefaultModal;
        }}
      >{ title }
      </Button>

    </>
  );
};
