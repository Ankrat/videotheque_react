import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image, Collapse, Button, Accordion, Card } from 'react-bootstrap';

import '../styles/Details.css';


const url = 'https://api.themoviedb.org/3/tv/';
const img = 'https://image.tmdb.org/t/p/';


export default (props) => {
  const [state, setState] = useState({
    get: {},
    genres: [],
    country: [],
    seasons: [],
    fetching: true,
    open_details: false,
    open_season: false,
  });

  useEffect(() => {
      details(props.match.params.id);
  }, [props.match.params.id]);

  const details = (id) => {
    axios.get(`${url}${id}?api_key=18cb3ed1e51594213b505970b2c9a0bf&language=fr`)
      .then(response => {
          setState({
            get: response.data,
            genres: response.data.genres,
            country: response.data.origin_country,
            seasons: response.data.seasons,
            fetching: false });
      }).catch(err => console.log(err));
  };


  return (

    <div
      className="background"
      style={{backgroundImage: `url(${img}original/${state.get.backdrop_path})`, height: '100vh'}}>
      <Container>
        <Row>
          <Col>
            <Image className="img-details" src={`${img}w500/${state.get.poster_path}`} rounded />
          </Col>
          <Col>
            <Button className="btn-add" variant="outline-success">Add to WatchList</Button>
            <Button className="btn-add" variant="outline-warning">Add to Fav</Button>
          </Col>
        </Row>
        <h2>{state.get.original_name}</h2>
        <p>{state.get.first_air_date} / {state.get.episode_run_time + ""} min / {
            state.genres.map((elem, index) => (
              elem.name + " "
            ))
        }</p>
        <p>{state.country + ""}</p>
        <h2>SYNOPSIS ET DÉTAILS</h2>
        <p>{state.get.overview}</p>
        <h2><Button
          variant="outline-info"
          onClick={() => setState({
            ...state,
            open_details: !state.open_details
          })}
          >Plus d'info...</Button></h2>

        <Collapse in={state.open_details}>
          <Accordion defaultActiveKey="0">
            {
              state.seasons.map((elem, index) => (
                <Card key={index} className="color-background">
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                      {elem.name}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={index}>
                    <Card.Body>
                      <Image src={`${img}w92/${elem.poster_path}`} rounded />
                      <p>Date: {elem.air_date}</p>
                      <p>Episodes: {elem.episode_count}</p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))
            }
          </Accordion>


        </Collapse>

      </Container>
    </div>

  );
}
