import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';

import HomePage from './HomePage';
import NotFound from './NotFound';
import Users from './Users';
import Layout from './Layout';
import LayoutView from './LayoutView';
import LayoutList from './LayoutList';
import DefaultLayout from '../layouts/defaultLayout/DefaultLayout';

function Routes({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={HomePage} />
      <Route path="users" component={Users} />
      <Route path="layout" component={Layout} />
      <Route path="layout/:configId" component={Layout} />
      <Route path="layoutList" component={LayoutList} />
      <Route path="notFound" component={NotFound} />
      <Route path="*" component={LayoutView} />
    </Router>
  );
}

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
