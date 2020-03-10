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
    secondModal: false,
  });

  const closeDefaultModal = setTimeout(() => {
    state.defaultModal.close();
  }, 1000);

  const closeSecondModal = setTimeout(() => {
    state.secondModal.close();
  }, 1000);

  return (
    <>
      <Modal
        ref={(ref) => state.defaultModal = ref}
      >Alredy in watchlist</Modal>

      <Modal
        ref={(ref) => state.secondModal = ref}
      >It's a good Show 👌</Modal>
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
          if (state.err_3) {
            await state.defaultModal.open();
            await closeDefaultModal;
          } else {
            await state.secondModal.open();
            await closeSecondModal;
          }

        }}
      >{ title }
      </Button>

    </>
  );
};
