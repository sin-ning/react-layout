/**
 * Created by sin on 16/7/21.
 */


import React, { Component, PropTypes } from 'react';
import { Input, Tabs, Button, Icon } from 'antd';
import TweenOne from 'rc-tween-one';
import styles from './LayoutTools.less';

class LayoutTools extends Component {


  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'layout/tools/query',
    });
  }

  onToolClick(tool) {
    const { dispatch} = this.props;
    dispatch({
      type: 'layout/render/add',
      data: tool
    });
  }

  onToolRemoveClick(tool) {
    const { dispatch} = this.props;
    dispatch({
      type: 'layout/removeLayoutCustom',
      data: {
        id: tool.id
      }
    });
  }

  renderLayoutList() {
    const { toolList = []} = this.props;
    let custom = [];
    const template = toolList.map(tool => {
      if (tool.type != 2) {
        return (<img className={styles.toolImg} key={tool.cmName} src={tool.cmImg} onClick={this.onToolClick.bind(this, tool)} />);
      }
      else {
        custom.push(
          <div className={styles.tool} key={tool.cmName}>
            <Button className={styles.btn} onClick={this.onToolClick.bind(this, tool)}>{tool.cmName}</Button>
            <Icon className={styles.btnRemove} onClick={this.onToolRemoveClick.bind(this, tool)} type="delete" />
          </div>
        );
      }
    });

    return {custom, template};
  }

  onToolSwitch() {
    const { dispatch, showTools } = this.props;
    if (showTools) {
      dispatch({
        type: 'layout/closeTools',
      })
    }
    else {
      dispatch({
        type: 'layout/showTools',
      })
    }
  }

  render() {
    const { dispatch, showTools } = this.props;

    let toolShowCls = showTools ? `${styles.up}` : '';

    const renderLayout = this.renderLayoutList();

    return (
      <div className={styles.toolNav}>
        <TweenOne reverse={!showTools}
                  className={styles.toolBody}
                  animation={{ x:400, type: 'to', duration: 800}}>
            <div><Input className={styles.search} placeholder="搜索组件..."/></div>

          <section className={styles.custom}>
            <div>
              <strong>自定义组件</strong>
            </div>
            {renderLayout.custom}
          </section>

          <div className={styles.toolNavBar}>
              {renderLayout.template}
            </div>

            <div style={{paddingBottom: '64px'}}>

            </div>
        </TweenOne>
        {/*<div className={`${styles.toolNavIcon}`} onClick={this.onToolSwitch.bind(this)}>*/}
          {/*<i className={`${toolShowCls} ${styles.anticon} ${styles.anticonCaretDown}`}></i>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default LayoutTools;
