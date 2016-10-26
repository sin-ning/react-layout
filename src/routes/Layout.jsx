/**
 * Created by sin on 16/7/20.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Input } from 'antd';
import styles from './Layout.less';
import LayoutMore from '../components/layout/LayoutMore';
import LayoutMenu from '../components/layout/LayoutMenu';
import LayoutTools from '../components/layout/LayoutTools';
import LayoutConfig from '../components/layout/LayoutConfig';
import LayoutContainer from '../components/layout/LayoutContainer';
import LayoutAttribute from '../components/layout/LayoutAttribute';


import {} from '../util/DistanceCalcs';

class Layout extends Component {

  static childContextTypes = {
    edit: PropTypes.bool,
    openEdit: PropTypes.bool,
  };

  getChildContext() {
    return {
      edit: true,
      openEdit: true,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
    this.scrollTop = 0;
    this.scrollState = 'show'; // show hide
  }

  onScroll = () => {
    const { dispatch } = this.props;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > this.scrollTop) {
      if (this.scrollState != 'hide') {
        this.scrollState = 'hide';
        dispatch({
          type: 'layout/closeEditMenu',
        });
        dispatch({
          type: 'layout/closeTools',
        });
      }
    }
    else {
      if (this.scrollState != 'show') {
        this.scrollState = 'show';
        dispatch({
          type: 'layout/showEditMenu',
        });
        dispatch({
          type: 'layout/showTools',
        });
      }
    }
    this.scrollTop = scrollTop;
  };


  handleLayoutConfigOk(config) {
    const { dispatch } = this.props;
    const { renderList } = this.props.layout;

    dispatch({
      type: 'layout/save',
      data: {
        ...config,
        layoutConfigs: renderList,
      }
    })
  }

  handleLayoutCancel() {
    const { dispatch } = this.props;
    dispatch({
      type: 'layout/config/hide',
    })
  }

  onCreate() {
    const { dispatch } = this.props;
    dispatch({
      type: 'layout/config/show',
    })
  };

  componentWillMount() {
    const { location, dispatch } = this.props;
    let configId = location.query.configId;
    if (configId != undefined) {
      dispatch({
        type: 'layout/queryConfig',
        data: {
          configId: configId
        }
      })
    }
  }

  render() {
    const { location, dispatch, layout } = this.props;
    const { editMenu, showTools, renderList, toolList,
      edit, editAttr, config, layoutConfig, more, moreShow, moreTitle } = layout;
    return(
      <div>
        <LayoutTools dispatch={dispatch}
                     toolList={toolList}
                     showTools={showTools}></LayoutTools>

        <LayoutMenu dispatch={dispatch}
                    onCreate={this.onCreate.bind(this)}
                    editMenu={editMenu}></LayoutMenu>

        <LayoutAttribute dispatch={dispatch}
                         editAttr={editAttr} edit={edit}></LayoutAttribute>

        <LayoutContainer dispatch={ dispatch }
                         location={location}
                         edit={edit}
                         layoutConfig={layoutConfig}
                         renderList={ renderList }></LayoutContainer>

        <LayoutConfig dispatch={ dispatch }
                      handleOk={ this.handleLayoutConfigOk.bind(this) }
                      handleCancel={ this.handleLayoutCancel.bind(this) }
                      layoutConfig={ layoutConfig }
                      config={ config }></LayoutConfig>
      </div>
    );
  }
}

Layout.propTypes = {};

function mapStateToProps({ layout }) {
  console.log('arguments', layout);

  return { layout };
}

export default connect(mapStateToProps)(Layout);

