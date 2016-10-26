/**
 * Created by sin on 16/8/5.
 */
import React, { Component, PropTypes } from 'react';

import Navbar from './Navbar';
import Container from './Container';

const DefaultLayout = ({location, dispatch, data = [], children}) => {

  return (
    <Container>
      <Navbar location={location} dispatch={dispatch} data={data}/>
      {children}
    </Container>
  );
};

export default DefaultLayout;
