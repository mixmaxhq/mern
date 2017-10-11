import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '/views/app';

const Routes = (props) => {
  return (
    <Router {...props}>
      <Route path={'/'} component={App} />
    </Router>
  );
};

export default Routes;
