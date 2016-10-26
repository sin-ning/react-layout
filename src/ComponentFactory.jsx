/**
 * Created by sin on 16/7/22.
 *
 * React 组件转换, key 转换
 */
const path = require('path');
import React, { Component, PropTypes, cloneElement ,createElement, createFactory } from 'react';

const ComponentFactory = {
  ['Factory'](toolName, config, child) {
    const toolNameIndexOf = toolName.indexOf("-");
    if (toolNameIndexOf != -1) {
      toolName = toolName.substring(0, toolNameIndexOf);
    }
    return createElement(ComponentFactory.data[toolName], config, child);
  },
  ['Get'](toolName) {
    return ComponentFactory.data[toolName];
  },
  data: {
    Banner: require('./components/banner/Banner'),
    Card: require('./components/card/Card'),
    Navbar: require('./layouts/defaultLayout/Navbar'),
    Footer: require('./layouts/defaultLayout/Footer'),
    LayoutEdit: require('./components/layout/LayoutEdit'),
    Section: require('./components/section/Section'),
  }
};

export default ComponentFactory;
