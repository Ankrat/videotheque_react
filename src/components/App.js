import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import '../styles/App.css';
import Home from './Home';
import MovieDetails from './MovieDetails';
import TvDetails from './TvDetails';
import Search from './Search';

function App(props) {

  const [nav, setNav] = useState({
    color: 'page',
    page: '',
  });

  return (
    <>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item
          className={nav.page ? nav.color : ''}>
          <Link
            className="nav-link"
            variant="primary"
            to="/">Home
          </Link>
        </Nav.Item>
        <Nav.Item
          className={nav.page ? '' : nav.color}>
          <Link
            className="nav-link"
            variant="primary"
            to="/search">Search
          </Link>
        </Nav.Item>
      </Nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route path="/details/movie/:id" component={MovieDetails} />
        <Route path="/details/tv/:id" component={TvDetails} />
      </Switch>
    </>
  );
}

export default App;
