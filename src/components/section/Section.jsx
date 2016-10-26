/**
 * Created by sin on 16/8/25.
 *
 * This Component define and with html5 to <Section> equally
 */

import React, { Component, PropTypes, createElement } from 'react';
import assign from 'object-assign';

import styles from './Section.less';

import { EditItem } from '../../components/layout/LayoutEdit';
import { _elementClient } from '../../util/DistanceCalcs';

class Section extends Component {

  constructor() {
    super(...arguments);
    const { location, dispatch } = this.props;

    const {data, children} =  this.buildPropsData(this.props, location, dispatch);

    this.state.height = data['height'].value;
    this.state.data = data;
    this.state.children = children;
  }

  static propTypes = {
    component: PropTypes.string,
    data: PropTypes.object.isRequired,

    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.string,
    backgroundRepeat: PropTypes.bool,
    backgroundCover: PropTypes.bool,
  };

  static defaultProps = {
    component: 'section',
    className: '',
    height: 500,
    defaultClassName: styles.section,
  };

  state = {
    height: 0,
    width: 0,
    data: null,
    children: null,
  };

  resize = () => {
    const windowClient = _elementClient(document.documentElement);
    this.setState({
      height: windowClient.h,
      width: windowClient.w,
    });
  };

  buildPropsData(props, location, dispatch) {
    const {data} = props;
    let newData = {};
    let children = [];
    if (data && data.dataGroup) {
      data.dataGroup.map((group, index) => {

        // custom attribute
        for (let field in group.custom) {
          let custom = group.custom[field];
          children.push(createElement(EditItem, {dispatch: dispatch, location: location, key: `section-item-${field}`, index: index, field: custom}));
        }
        newData = {...newData, ...group['required']};
      });
    }
    return {data: newData, children: children};
  }

  componentDidMount() {
    const { data } = this.state;

    if (data && data.entireScreen.value == 'true') {
      window.addEventListener('resize', this.resize, false);

      // resize
      this.resize();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location, dispatch } = this.props;

    const {data, children} =  this.buildPropsData(nextProps, location, dispatch);

    this.state.height = data['height'].value;
    this.state.data = data;
    this.state.children = children;
    this.setState(this.state);

    // resize
    if (data && data.entireScreen.value == 'true') {
      this.resize();
    }
  }

  componentWillUnmount() {
    const { data } = this.state;
    if (data && data.entireScreen.value == 'true') {
      window.removeEventListener('resize', this.resize, false)
    }
  }

  render() {
    const { component, defaultClassName } = this.props;
    const { data, children, width, height } = this.state;
    const { backgroundColor, backgroundImage, backgroundRepeat, backgroundCover } = data;
    const className = `${defaultClassName} ${this.props.className}`;

    const style = {...this.props.style, ...{
      width: `${width == 0 ? 'auto' : width}px`,
      height: `${height}px`,
      backgroundColor: backgroundColor.value ? backgroundColor.value : 'transparent',
      backgroundImage: backgroundImage.value ? `url(${backgroundImage.value})` : 'none',
      backgroundSize: backgroundCover.value == 'true' ? 'cover' : 'initial',
      backgroundRepeat: backgroundRepeat.value == 'true' ? 'repeat' : 'no-repeat',
    }};

    return createElement(component, {className: className, style: style}, children);
  }
}

export default Section;
