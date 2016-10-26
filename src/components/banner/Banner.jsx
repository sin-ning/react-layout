/**
 * Created by sin on 16/7/22.
 */

import React, { Component, PropTypes, createElement } from 'react';
import assign from 'object-assign'
import TweenOne from 'rc-tween-one';
import BannerAnim, { Element } from 'rc-banner-anim';

import ComponentFactory from '../../ComponentFactory';

class Banner extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  static defaultProps = {
    type: 'across',
    data: {},
    height: 500,
    duration: 500,
    autoPlay: true,
    autoPlaySpeed: 5000,
  };

  render() {
    const props = assign({}, this.props);
    props.style = assign({height: props.height + 'px'}, props.style);
    const { data = {}, ...other } = props;

    let elements = data.dataGroup.map((group, index) => {
      // 必须的
      const { img } = group.required;

      let children = [];
      for (let field in group.custom) {
        let custom = group.custom[field];
        let animation = { y: 30, opacity: 0, type: 'from' };
        // children.push(createElement(TweenOne, { key: field, animation: animation }, custom.value));
        const { EditItem } = ComponentFactory.Get('LayoutEdit');
        children.push(<EditItem key={`editItem-${field}`}
                                dispatch={props.dispatch}
                                index={index}
                                field={custom}>{custom.value}</EditItem>);
      }

      return createElement(Element, { key: index, bg: img.value }, children);
    });

    return (
      <BannerAnim {...props}>
        {elements}

      </BannerAnim>
    );
  }

}


export default Banner;
