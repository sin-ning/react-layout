/**
 * Created by sin on 16/9/8.
 */

import React, { Component, PropTypes, createElement } from 'react';
import { Row, Col } from 'antd';
import assign from 'object-assign';
import { EditItem } from '../../components/layout/LayoutEdit';

import styles from './Card.less';

class Card extends Component {





  render() {
    const { data, location, dispatch } = this.props;
    let {height, leftSpan, rightSpan, backgroundColor} = data.dataGroup[0].required;
    leftSpan = parseInt(leftSpan.value);
    rightSpan = parseInt(rightSpan.value);

    let leftChildren = [];
    for (const key in data.dataGroup[1].custom) {
      const custom = data.dataGroup[1].custom[key];
      leftChildren.push(createElement(EditItem, {dispatch: dispatch, location: location, key: `card-left-${key}-${1}`, index: 1, field: custom}));
    }

    let rightChildren = [];
    for (const key in data.dataGroup[2].custom) {
      const custom = data.dataGroup[2].custom[key];
      rightChildren.push(createElement(EditItem, {dispatch: dispatch, location: location, key: `card-right-${key}-${2}`, index: 2, field: custom}));
    }

    let styles = {
      display: 'block',
      backgroundColor: backgroundColor.value ? backgroundColor.value : 'transparent',
      height: height.value ? height.value : 'auto',
    };


    let leftStyles = {};
    {
      const {height, backgroundColor} = data.dataGroup[1].required;
      leftStyles = {
        backgroundColor: backgroundColor.value ? backgroundColor.value : 'transparent',
        height: height.value ? height.value : 'auto',
      };
    }

    let rightStyles = {};
    {
      const {height, backgroundColor} = data.dataGroup[2].required;
      rightStyles = {
        backgroundColor: backgroundColor.value ? backgroundColor.value : 'transparent',
        height: height.value ? height.value : 'auto',
      };
    }

    return (
      <card className={styles.card} style={styles}>
        <Row>
          <Col style={leftStyles} sm={leftSpan} md={leftSpan} lg={leftSpan}>
            { leftChildren }
          </Col>
          <Col style={rightStyles} sm={rightSpan} md={rightSpan} lg={rightSpan}>
            { rightChildren }
          </Col>
        </Row>
      </card>
    );
  }
}

export default Card;
