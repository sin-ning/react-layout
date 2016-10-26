/**
 * Created by sin on 16/7/20.
 */

import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';
import TweenOne from 'rc-tween-one';
import 'rc-tween-one/assets/index.css';
import styles from './LayoutMenu.less';


export default class LayoutMenu extends Component {

  constructor() {
    super(...arguments);
  }

  static propTypes = {
    onCreate: PropTypes.func,
  };

  static defaultProps = {
    paused: false
  };

  onClick() {
    const { onCreate } = this.props;
    if (onCreate) onCreate();
  };

  // 切换菜单
  onEditSwitch() {
    const { dispatch, editMenu } = this.props;
    if (editMenu) {
      dispatch({
        type: 'layout/closeEditMenu',
      });
    }
    else {
      dispatch({
        type: 'layout/showEditMenu',
      });
    }
  }

  render() {
    const { dispatch, editMenu, paused } = this.props;

    let editMenuCls = editMenu ? `${styles.up}` : '';

    let animationType = editMenu ? 'from' : 'to';

    return (
      <div className={styles.toolNav}>
        <TweenOne
          reverse={!editMenu}
          animation={{ y:-64, type: 'to', duration: 800}}>

          <div className={styles.toolNavBar}>
              <ul>
                {/*<li><Button className={styles.antBtnPrimary} type="primary">编辑模式</Button></li>*/}
                <li><Button className={styles.antBtnPrimary} type="primary">入场动效</Button></li>
                <li><Button className={styles.antBtnPrimary} type="primary" onClick={this.onClick.bind(this)}>生成网页</Button></li>
              </ul>
          </div>
        </TweenOne>
        {/*<div className={`${styles.toolNavIcon}`} onClick={this.onEditSwitch.bind(this)}>*/}
          {/*<i className={` ${editMenuCls} ${styles.anticon} ${styles.anticonCaretDown}`}></i>*/}
        {/*</div>*/}
      </div>
    );
  }

}

