import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import '../styles/App.css';
import Home from './Home';
import List from './List';
import MovieDetails from './search/MovieDetails';
import TvDetails from './search/TvDetails';
import Search from './search/Search';

function App(props) {

  return (
    <>
      <Nav justify variant="tabs">
        <NavLink
          activeClassName="page"
          className="nav-link nav-custom"
          variant="primary"
          to="/home"
        >WatchList
        </NavLink>

        <NavLink
          activeClassName="page"
          className="nav-link nav-custom"
          variant="primary"
          to="/search"
        >Search
        </NavLink>
      </Nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={List} />
        <Route path="/search" component={Search} />
        <Route path="/details/movie/:id" component={MovieDetails} />
        <Route path="/details/tv/:id" component={TvDetails} />
      </Switch>
    </>
  );
}

export default App;
