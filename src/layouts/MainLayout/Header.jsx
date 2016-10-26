import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';

function getMenuKeyFromUrl(pathname) {
  let key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
  } catch (e) {}
  return key;
}

function Header({ location }) {
  return (
    <Menu
      selectedKeys={[getMenuKeyFromUrl(location.pathname)]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="users">
        <Link to="/users"><Icon type="bars" />Users</Link>
      </Menu.Item>
      <Menu.Item key="layout">
        <Link to="/layout"><Icon type="layout" />Layout</Link>
      </Menu.Item>
      <Menu.Item key="layoutList">
        <Link to="/layoutList"><Icon type="layoutList" />LayoutList</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
