import React, { useState } from 'react';

import { Button, Modal } from '@poool/junipero';
import API from '../../services/api';

export default ({
  title = 'Title',
  className = 'btn-add',
  reversed = true,
  type = 'success',
  url,
  Click = () => {},
}) => {

  const [state, setState] = useState({
    defaultModal: false,
  });

  return (
    <>
      <Button
        title="Delete"
        className="btn-add button"
        reversed={true}
        type="danger"
        onClick={() => {
          state.defaultModal.open();
        }

        }
      >Delete</Button>
      <Modal
        ref={(ref) => state.defaultModal = ref}
      >
        <Button
          className={className}
          reversed={reversed}
          type={type}
          onClick={async e => {
            e.preventDefault();
            await API.remove(url);
            await state.defaultModal.close();
            await setTimeout(() => Click(), 100);
          }}
        >{ title }</Button>
      </Modal>
    </>
  );
};
