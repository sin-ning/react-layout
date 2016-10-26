/**
 * Created by sin on 16/8/1.
 */

import React, { Component, PropTypes, createElement } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Link, Element } from 'rc-scroll-anim';
import styles from './LayoutView.less';
import { Factory } from '../ComponentFactory';

const TweenOneGroup = TweenOne.TweenOneGroup;

class LayoutView extends Component {

  constructor() {
    super(...arguments);
  }

  static propTypes = {
    layoutView: PropTypes.object.isRequired,
  };

  static defaultProps = {
    layoutView: {}
  };

  state = {
    show: true,
    delay: 100,
  };

  static childContextTypes = {
    queueSwitch: PropTypes.func,
  };

  getChildContext() {
    return {
      queueSwitch: () => {
        this.setState({
          delay: this.state.delay == 100 ? 101 : 100,
        });
      },
    };
  };

  componentWillMount() {
    const { dispatch, params } = this.props;
    dispatch({
      type: 'layoutView/config/query',
      data: {
        uri: params.splat
      }
    });
  }

  componentWillUnmount() {
    console.info('componentWillUnmount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatch } = this.props;
    let thisParams = this.props.params;
    let nextParams = nextProps.params;
    if (thisParams.splat != nextParams.splat) {
      dispatch({
        type: 'layoutView/config/query',
        data: {
          uri: nextParams.splat
        }
      });
    }

    if (nextProps.layoutView.notFound) {
      browserHistory.push('notFound');
      return false;
    }
    return true;
  }

  setHeader() {
    const { title, keywords, description } = this.props.layoutView;
    if (title) {
      document.title = title;
    }
  }

  onFocus(e) {
    if (this.oldPoints) {
      e.target.style.backgroundColor = "rgb(12, 180, 232)";
      this.oldPoints.style.backgroundColor = "#fff";
    }
    e.target.style.backgroundColor = "rgb(12, 180, 232)";
    this.oldPoints = e.target;
  }

  render() {
    this.setHeader();
    console.info('render', this.state.show);

    const { notFound, uri, title, keywords, description, layoutConfigs } = this.props.layoutView;
    let delay = 0;
    let navbarLayoutConfigs = null;
    let sideEdgePoints = [];
    let renderLayoutConfigs = layoutConfigs.map((layout, index) => {
      const { cmImg, cmName, cmPath, custom, dataGroup } = layout;

      const scrollElementChildren = Factory(cmName, { data: layout, ...this.props });
      if (index == 0) {
        navbarLayoutConfigs = createElement(Element, { key: index }, scrollElementChildren);
      }
      else {
        sideEdgePoints.push(<Link key={`link_${index}`} className={styles.points} location={`page_${index}`} onFocus={this.onFocus.bind(this)}></Link>);
        return createElement(Element, { key: index, scrollName: `page_${index}`}, scrollElementChildren);
      }
      // const factoryElement = Factory(cmName, { data: layout, ...this.props });
      // return createElement(QueueAnim, {}, factoryElement);
      // return createElement(TweenOneGroup, {key: index, enter: { x: 30, opacity: 0, type: 'from' }}, factoryElement);
    });

    return (
      <div>
        <TweenOneGroup>
          <TweenOne animation={{ opacity: 1, x: 20, type: 'from', duration: 300, opacity: 0}}>
            {navbarLayoutConfigs}
            <TweenOne animation={{ opacity: 1, x: 30, type: 'from', duration: 300, opacity: 0, delay: this.state.delay }}>
              {renderLayoutConfigs}
            </TweenOne>
          </TweenOne>
        </TweenOneGroup>

        <sideEdgePoints className={styles.sideEdgePoints}>
          {sideEdgePoints}
        </sideEdgePoints>
      </div>
    );
  }
}


function mapStateToProps({ layoutView }) {
  return { layoutView };
}

export default connect(mapStateToProps)(LayoutView);

