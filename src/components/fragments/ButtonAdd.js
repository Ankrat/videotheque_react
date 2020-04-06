import React, { useState } from 'react';

import { Button, Modal, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from '@poool/junipero';

import API from '../../services/api';
import oops from '../../styles/img/oops.jpg';
import add from '../../styles/img/add.jpg';

export default ({
  title = 'Title',
  className = 'btn-add',
  reversed = true,
  type = 'success',
  data = {},
  segments = [],
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
      <Dropdown theme="none">
        <DropdownToggle>
          <Button
            className={className}
            reversed={reversed}
            type={type}
          >
            { title }
          </Button>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={async e => {
              e.preventDefault();

              API.send(url, data, null, state, setState);
              await state.defaultModal.open();
            }}
          >
            <a>General</a>
          </DropdownItem>
          {
            segments.map((item, index) => (
              <DropdownItem
                key={index}
                onClick={async e => {
                  e.preventDefault();

                  API.send(url, data, item, state, setState);
                  await state.defaultModal.open();
                }}
              >
                <a>{item}</a>
              </DropdownItem>
            ))
          }
        </DropdownMenu>
      </Dropdown>


    </>
  );
};
