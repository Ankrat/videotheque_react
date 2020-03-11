import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image } from 'react-bootstrap';

import '../../styles/Details.css';
import API from '../../services/api';
import ButtonAdd from '../fragments/ButtonAdd';
import { url, img, urlApi, userId } from '../../services/content';

export default (props) => {
  const [state, setState] = useState({
    get: {},
    genres: [],
    country: [],
    fetching: true,
  });

  useEffect(() => {
    API.details(
      url(props.match.params.id).id_movie,
      setState
    );
  }, [props.match.params.id]);

  return (
    <div
      className="background"
      style={{backgroundImage:
        `url(${img}original${state.get.backdrop_path})`}}
    >
      <Container className="details">
        <Row>
          <Col>
            <Image
              className="img-details"
              src={`${img}w500/${state.get.poster_path}`}
              rounded
            />
          </Col>
          <Col>
            {
              userId
                ? (
                  <ButtonAdd
                    title="Add to WatchList"
                    className="btn-add"
                    reversed={true}
                    type="success"
                    url={urlApi(userId).movie}
                    data={{
                      poster_path: state.get.poster_path,
                      title: state.get.title,
                      id_details: state.get.id,
                    }}
                  />
                ) : ''
            }
          </Col>
        </Row>
        <div className="details-content">
          <h2>
            {
              state.get.original_title
            }{
              state.get.belongs_to_collection
                ? ` (${state.get.belongs_to_collection.name})`
                : ''
            }
          </h2>
          <p><span>Release date:</span> {state.get.release_date}</p>
          <p><span>Runtime:</span> {state.get.runtime} min</p>
          <p><span>Genres:</span> {
            state.genres.map((elem, index) => (
              elem.name + ' / '
            ))
          }
          </p>
          <p><span>Country:</span> {
            state.country.map((elem, index) => (
              elem.name
            ))
          }
          </p>
          <h2>Synopsis & Details</h2>
          <p>{state.get.overview}</p>
        </div>
      </Container>
    </div>

  );
};
