/**
 * Created by sin on 16/7/20.
 */

import React, { Component, PropTypes, createElement, createFactory } from 'react';
import { Button, Affix } from 'antd';
import TweenOne from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import QueueAnim from 'rc-queue-anim';
import styles from './LayoutContainer.less';

import { Factory } from '../../ComponentFactory';

/// 组件
import LayoutEdit from '../layout/LayoutEdit';

class LayoutContainer extends Component {

  static propTypes = {
    edit: PropTypes.bool.isRequired,
    renderList: PropTypes.array.isRequired,
  };

  render() {
    const { dispatch, location, edit, renderList = [], layoutConfig = {}} = this.props;

    let renderLayout = renderList.map((tool, index) => {
      const { cmName } = tool;
      let toolElement = Factory(cmName, { key: index, dispatch: dispatch, location: location, data: tool }, null);

      return <LayoutEdit dispatch={dispatch}
                         location={location}
                         layoutConfig={layoutConfig}
                         key={`${index}`}
                         edit={ edit }
                         data={tool}
                         renderIndex={index}>
        { toolElement }
      </LayoutEdit>;
    });

    return (
      <div>
        { renderLayout }
      </div>
    );
  }
}


export default LayoutContainer;

