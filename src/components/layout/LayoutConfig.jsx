/**
 * Created by sin on 16/8/1.
 */

import React, { Component, PropTypes, createElement } from 'react';
import Dialog from 'rc-dialog';
import styles from './LayoutConfig.less';
import { Button, Icon } from 'antd';

class LayoutConfig extends Component {

  constructor() {
    super(...arguments);
    this.state = this.props.layoutConfig;
  }

  static propTypes = {
    layoutConfig: PropTypes.object.isRequired,
    config: PropTypes.bool.isRequired,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
  };

  state = {

  };

  handleCancel(e) {
    const { handleCancel } = this.props;
    if (handleCancel) handleCancel();
  }

  handleOk() {
    const { handleOk } = this.props;
    if (handleOk) handleOk(this.state);
  }

  handleInputChange(field, e) {
    this.setState({[field]: e.target.value});
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.layoutConfig);
  }

  render() {
    const { config } = this.props;

    let dialogConfig = {
      prefixCls: `ant-modal`,
      onClose: this.handleCancel.bind(this),
      closable: true,
      transitionName: 'zoom',
      maskTransitionName: 'fade',
      confirmLoading: false,
      maskClosable: true,
      visible: config,
      bodyStyle: {padding: '0px'},
    };

    return (
      <Dialog {...dialogConfig}>
        <div className={styles.attr}>
          <div className={styles.title}>
            <Icon type="file-text" /> 生成配置

            <i className={styles.cross} onClick={this.handleCancel.bind(this)}><Icon type="cross" /></i>
          </div>
          <div className={styles.body}>
            <ul>
              <li>
                <h4>访问地址 <span>如: wwww.ifitmix.com/radio 只需填写 radio</span></h4>
                <ul>
                  <li>
                    <input className={styles.bottomSty} defaultValue={this.state.uri} onChange={this.handleInputChange.bind(this, 'uri')} />
                  </li>
                </ul>
              </li>

              <li>
                <h4>收录信息 </h4>
                <ul>
                  <li>
                    <p>标题 <span>浏览器导航标题</span></p>
                    <input className={styles.bottomSty} defaultValue={this.state.title} onChange={this.handleInputChange.bind(this, 'title')} />
                  </li>
                  <li>
                    <p>关键字 <span>搜索引擎收录关键字</span></p>
                    <input className={styles.bottomSty} defaultValue={this.state.keywords} onChange={this.handleInputChange.bind(this, 'keywords')} />
                  </li>
                  <li>
                    <p>描述 <span>内容描述</span></p>
                    <textarea className={styles.bottomSty} defaultValue={this.state.description} onChange={this.handleInputChange.bind(this, 'description')} />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className={styles.footer}>
            <Button type="primary" onClick={this.handleOk.bind(this)} className={styles.btnPrimary}>确定</Button>
          </div>
        </div>
      </Dialog>
    );
  }
}


export default LayoutConfig;
