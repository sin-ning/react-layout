/**
 * Created by sin on 16/8/5.
 */

import React, { Component, PropTypes, createElement } from 'react';
import { Link } from 'react-router';
import { Menu, Breadcrumb, Row, Col } from 'antd';
import Dialog from 'rc-dialog';
import QueueAnim from 'rc-queue-anim';
import { EditItem } from '../../components/layout/LayoutEdit';

import styles from './Navbar.less';
import './Navbar.css';

import { _elementClient } from '../../util/DistanceCalcs';

class Navbar extends Component {

  constructor() {
    super(...arguments);
    const { location } = this.props;
    this.state.current = location.pathname;
  }

  static contextTypes = {
    queueSwitch: PropTypes.func,
  };

  static propTypes = {
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  static defaultProps = {
  };

  state = {
    current: '',
    mode: 'horizontal', // "inline" horizontal
    theme: 'dark', // dark light
    visible: false, // show modal phone
    enter: true, // 进场 动漫
  };

  windowResize = () => {
    const documentClient = _elementClient(document.documentElement);
    const updateState = {};
    if (documentClient.w < 768) {
      updateState['mode'] = 'inline';
      updateState['theme'] = 'light';
      updateState['enter'] = false;
    }
    else {
      updateState['mode'] = 'horizontal';
      updateState['theme'] = 'dark';
      updateState['enter'] = true;
    }
    this.setState(updateState);
  };

  menuBlur = (e) => {
    this.handlerVisible();
  };

  componentDidMount() {
    window.addEventListener('resize', this.windowResize, false);
    this.refs['navPanel'].addEventListener('click', this.menuBlur, false);
    this.windowResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize, false);
    this.refs['navPanel'].removeEventListener('click', this.menuFocus, false);
  }

  onClick() {
    this.handlerVisible();
  }

  handlerVisible() {
    const { mode, visible, enter } = this.state;
    if (mode == 'inline') {
      this.setState({visible: !visible, enter: !enter});
    }
  }

  handleMenuActive(e) {
    this.handlerQueueSwitch();
    this.setState({
      current: e.key,
    });
  }


  handlerQueueSwitch() {
    const { queueSwitch } = this.context;
    if (queueSwitch) {
      queueSwitch();
    }
  }

  render() {
    const { data } = this.props;
    const { mode, theme, visible, enter, current } = this.state;

    const navShowClass = visible ? styles.navShow : '';
    const navPanelShowClass = visible ? styles.show : '';
    let centerMenuNode = [];
    let rightMenuNode = [];
    let logoNode = [];

    data.dataGroup.map((menu, index) => {
      const {title} = menu;
      const { to, logo, right, center  } = menu.required;

      if (right) {
        rightMenuNode.push(<Menu.Item key={`${to.value}`}>{createLink(right.value, to.value)}</Menu.Item>);
      }
      else if (center) {
        centerMenuNode.push(<Menu.Item key={`${to.value}`}>{createLink(center.value, to.value)}</Menu.Item>);
      }
      else if (logo) {
        logoNode.push(createLink(<img height="18" src={logo.value}/>, to.value, {key: index}));
      }
    });

    function createLink(text, to, props) {
      if (to.toString().indexOf('http') != -1) {
        return createElement('a', {href: to, target: '_blank', ...props}, text);
      }
      else {
        return createElement(Link, {to: to, ...props}, text);
      }
    }

    return (
      <navigation className={styles.navigation}>
        <navbar className={styles.navbar}>
          <Row>
            <Col className={styles.logo} xs={24} sm={5} md={4} lg={4}>
              <i className={styles.phoneIcon} onClick={this.onClick.bind(this)}></i>
              { logoNode }
            </Col>

            <Col className={`${styles.nav} ${navShowClass}`} xs={0} sm={19} md={20} lg={20}>
              <Row>
                <Col xs={24} sm={14} md={14} lg={14}>
                  <QueueAnim animConfig={[
                    { opacity: [1, 0], translateY: [0, 50] },
                    { opacity: [1, 0], translateY: [0, -50] }
                  ]}>
                    {enter ? [
                      <Menu key="menu_center" className={`${styles.menu}`}
                            onClick={this.handleMenuActive.bind(this)}
                            selectedKeys={[current]}
                            theme={theme}
                            mode={mode}>
                        { centerMenuNode }
                      </Menu>
                    ] : null}
                  </QueueAnim>
                </Col>
                <Col xs={24} sm={10} md={10} lg={10}>
                  <Row row-flex="end" className={styles.menuRight}>
                    <QueueAnim animConfig={[
                      { opacity: [1, 0], translateY: [0, 50] },
                      { opacity: [1, 0], translateY: [0, -50] }
                    ]}>
                      {enter ? [
                        <Menu key="menu_centerx" className={`${styles.menu}`}
                              onClick={this.handleMenuActive.bind(this)}
                              selectedKeys={[current]}
                              theme={theme}
                              mode={mode}>
                          { rightMenuNode }
                        </Menu>
                      ] : null}
                    </QueueAnim>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </navbar>

        <div ref="navPanel" className={`${styles.navPanel} ${navPanelShowClass}`}></div>
      </navigation>
    );
  }

}


export default Navbar;
