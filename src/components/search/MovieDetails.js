import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Button } from '@poool/junipero';


import '../../styles/Details.css';
import { url, img } from '../../services/content';


export default (props) => {
  const [state, setState] = useState({
    get: {},
    genres: [],
    country: [],
    fetching: true,
  });

  useEffect(() => {
    details(props.match.params.id);
  }, [props.match.params.id]);

  const details = (id) => {
    axios.get(url(id).id_movie)
      .then(response => {
        setState({
          get: response.data,
          genres: response.data.genres,
          country: response.data.production_countries,
          fetching: false });
      }).catch(err => console.log(err));
  };

  return (

    <div
      className="background"
      style={{backgroundImage: `url(${img}original${state.get.backdrop_path})`,
        height: '100vh'}}>
      <Container className="details">
        <Row>
          <Col>
            <Image
              className="img-details"
              src={`${img}w500/${state.get.poster_path}`}
              rounded />
          </Col>
          <Col>
            <Button
              className="btn-add"
              reversed={true}
              type="success"
            >Add to WatchList</Button>
            <Button
              className="btn-add"
              reversed={true}
              type="warning"
            >Add to Fav</Button>
          </Col>
        </Row>
        <h2>{state.get.original_title}</h2>
        <p>{state.get.release_date} / {state.get.runtime} min / {
          state.genres.map((elem, index) => (
            elem.name + ' '
          ))
        }</p>
        <p>{state.country.map((elem, index) => (
          elem.name
        ))}</p>
        <h2>SYNOPSIS ET DÉTAILS</h2>
        <p>{state.get.overview}</p>
      </Container>
    </div>

  );
};
