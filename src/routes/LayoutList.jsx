/**
 * Created by sin on 16/8/3.
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';
import MainLayout from '../layouts/MainLayout/MainLayout';

class LayoutList extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'layoutList/query',
    })
  };

  render() {
    const { location, dispatch, layoutList } = this.props;
    const { list } = layoutList;

    const columns = [{
      title: '地址',
      dataIndex: 'uri',
      key: 'uri',
      render: (text, config) => (<Link to="/layout" query={{configId: config.id}}>{text}</Link>)
    }
    , {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '关键字',
      dataIndex: 'keywords',
      key: 'keywords',
    }, {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    }];

    return (
      <MainLayout dispatch={dispatch} location={location}>
        <Table columns={columns} dataSource={list}></Table>
      </MainLayout>
    );
  }
}


function mapStateToProps({ layoutList }) {
  return { layoutList };
}

export default connect(mapStateToProps)(LayoutList);
