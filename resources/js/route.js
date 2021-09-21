import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch,
  } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

  function App() {
    return (
        <div>
            <Switch>
                <Route path='/home' exact component={Dashboard} />
                <Route path='/hometest' exact component={Home} />
            </Switch>
        </div>
    );
}

  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('example'))
