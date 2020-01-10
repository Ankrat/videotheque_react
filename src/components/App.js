import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';

import '../styles/App.css';
import SearchFormMovie from './SearchFormMovie';
import SearchFormTv from './SearchFormTv';
import Home from './Home';
import MovieDetails from './MovieDetails';
import TvDetails from './TvDetails';

function App(props) {

  return (
    <>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Link className="nav-link" variant="primary" to='/'>Home</Link>
        </Nav.Item>
        <NavDropdown
          title="Dropdown"
          id="nav-dropdown">
            <Link className="nav-link" variant="primary" to='/movie'>Movie</Link>
            <Link className="nav-link" variant="primary" to='/tv'>Tv</Link>
        </NavDropdown>
      </Nav>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/movie' component={SearchFormMovie} />
        <Route path='/details/movie/:id' component={MovieDetails} />
        <Route path='/details/tv/:id' component={TvDetails} />
        <Route path='/tv' component={SearchFormTv} />
      </Switch>
    </>
  )
}

export default App;
