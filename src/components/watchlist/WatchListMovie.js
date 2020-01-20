import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Button } from '@poool/junipero';


import '../../styles/Details.css';


const url = 'http://localhost:8085/api/watchlist';


export default (props) => {
  const [state, setState] = useState({
    get: {},
    fetching: true,
  });

  useEffect(() => {
    details();
  }, []);

  const details = () => {
    axios.get(`${url}`)
      .then(response => {
        setState({
          get: response.data,
          fetching: false });
      }).catch(err => console.log(err));
  };

  const getMovie = () => {
    
  };

  return (

    <>
      {console.log(state.get.data)}
    </>

  );
};
