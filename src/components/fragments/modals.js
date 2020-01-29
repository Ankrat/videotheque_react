import React from 'react';
import Rodal from 'rodal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';

import '../../styles/fragments/modals.css';
import 'rodal/lib/rodal.css';
import checked from '../../styles/img/checked.gif';

export default (
  state = false,
  onClose,
) => {
console.log(state);
  return (
    <div>
      <Rodal
        visible={state}
        onClose={onClose}
        animation="zoom"
        duration={500}
        width={320}
      >
        <div>
          <Image
            className="gif-check"
            src={checked}
            roundedCircle
          />
        </div>
      </Rodal>
    </div>
  );

};
