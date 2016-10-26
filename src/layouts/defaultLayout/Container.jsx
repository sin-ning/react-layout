/**
 * Created by sin on 16/8/5.
 */
import React, { Component, PropTypes, createElement } from 'react';
import assign from 'object-assign'


const alignConfig = {
  // left: {textAlign: 'left', margin: '0px 0px auto 0px'},
  // right: {textAlign: 'right', margin: '0px 0px 0px auto'},
  // center: {textAlign: 'center', margin: '0px auto'},
  left: {margin: '0px 0px auto 0px'},
  right: {margin: '0px 0px 0px auto'},
  center: {margin: '0px auto'},
};

const textAlignConfig = {
  left: {margin: '0px 0px auto 0px'},
  right: {margin: '0px 0px 0px auto'},
  center: {margin: '0px auto'},
};

class Container extends Component {

  static propTypes = {
    type: PropTypes.string,
    align: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.number,
    padding: PropTypes.string,
  };

  static defaultProps = {
    type: 'default', // default full
    width: 1200,
    fullWidth: '100%',
    padding: '10px',
    component: 'div',
    align: 'left',
  };

  render() {
    const props = assign({}, this.props);
    const { component, type, width, fullWidth, padding, align, ...other } = this.props;

    props.style = assign({
      width: type == 'full' ? fullWidth : `${width}px`,
      padding: padding,
      ...alignConfig[align],
    }, props.style);

    return createElement(component, props);
  }
}

export default Container;
