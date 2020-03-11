import React, { useState } from 'react';

import { Button, Modal } from '@poool/junipero';

import API from '../../services/api';
import oops from '../../styles/img/oops.jpg';
import add from '../../styles/img/add.jpg';

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

  return (
    <>
      <Modal
        ref={(ref) => state.defaultModal = ref}
      >{
          state.err_3
            ? (
              <div className="img-modal">
                <img src={oops}/>
                <h5>Alredy in your watchlist</h5>
                <p><i>Click to close</i></p>
              </div>
            ) : (
              <div className="img-modal">
                <img src={add}/>
                <h5>Added in your watchlist</h5>
                <p><i>Click to close</i></p>
              </div>
            )
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
        }}
      >{ title }
      </Button>

    </>
  );
};
