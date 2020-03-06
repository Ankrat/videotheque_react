import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image,
  Collapse, Accordion, Card } from 'react-bootstrap';
import { Button } from '@poool/junipero';


import '../../styles/Details.css';
import API from '../../services/api';
import ButtonAdd from '../fragments/ButtonAdd';
import { url, img, urlApi, userId } from '../../services/content';

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
    API.details(
      url(props.match.params.id).id_tv,
      setState
    );
  }, [props.match.params.id]);

  return (

    <div
      className="background"
      style={{backgroundImage:
        `url(${img}original/${state.get.backdrop_path})`}}>
      <Container className="details">
        <Row>
          <Col>
            <Image
              className="img-details"
              src={`${img}w500/${state.get.poster_path}`}
              rounded />
          </Col>
          <Col>
            <ButtonAdd
              title="Add to WatchList"
              className="btn-add"
              reversed={true}
              type="success"
              url={urlApi(userId).tv}
              data={{
                poster_path: state.get.poster_path,
                title: state.get.name,
                id_details: state.get.id,
              }}
            />
          </Col>
        </Row>
        <h2>{state.get.original_name}</h2>
        <p>{state.get.first_air_date} /
          {state.get.episode_run_time + ''} min /
          {state.genres.map((elem, index) => (
            elem.name + ' '
          ))
          }</p>
        <p>{state.country + ''}</p>
        <h2>SYNOPSIS ET DÉTAILS</h2>
        <p>{state.get.overview}</p>
        <h2><Button
          type="primary"
          onClick={() => setState({
            ...state,
            open_details: !state.open_details,
          })}
        >Plus d'info...</Button></h2>

        <Collapse in={state.open_details}>
          <Accordion defaultActiveKey="0">
            {
              state.seasons.map((elem, index) => (
                <Card key={index} className="color-background">
                  <Card.Header>
                    <Accordion.Toggle
                      as={Button}
                      type="primary"
                      theme="none"
                      eventKey={index}>
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
};
