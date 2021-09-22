import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/home' exact component={Dashboard} />
      </Switch>
    </div>
  );
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('example'))
