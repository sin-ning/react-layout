/**
 * Created by sin on 16/8/5.
 */

import React, { Component, createElement } from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
import Dialog from 'rc-dialog';

import styles from './Footer.less';

class Footer extends Component {


  state = {
    visible: false,
  };

  onClose() {
    this.setState({
      visible: false,
    });
  }

  onShow() {
    this.setState({
      visible: true,
    });
  }

  render() {
    const { data } = this.props;
    const linkNodes = data.dataGroup.map((item, index) => {

      const to = item.custom.to.value;
      const text = item.custom.text.value;

      if (to.indexOf("http") == -1) {
        return <Link key={index} className={styles.link} to={item.custom.to.value}>{item.custom.text.value}</Link>;
      }
      else {
        return <a key={index} className={styles.link} href={item.custom.to.value} target="_blank">{item.custom.text.value}</a>;
      }
    });


    const WeChatQrCode = () => {

      const dialogProps = {
        prefixCls: `ant-modal`,
        closable: true,
        transitionName: 'zoom',
        maskTransitionName: 'fade',
        confirmLoading: true,
        maskClosable: true,
        width: '235px',
      };

      return (
        <Dialog {...dialogProps} visible={this.state.visible} onClose={this.onClose.bind(this)}>
          <img className={styles.qrCode} src="http://igeekery.oss-cn-shenzhen.aliyuncs.com/web/common/WechatIMG1.jpeg" />
        </Dialog>
      )
    };

    return (
      <footer className={styles.footer}>
        <WeChatQrCode />

        <Row className={styles.more}>
          <p>全面了解蓝筹科技: <a href="mailto:sales@ifitmix.com">sales@ifitmix.com</a></p>
        </Row>

        <Row className={styles.social}>
          <img onClick={this.onShow.bind(this)} src="http://igeekery.oss-cn-shenzhen.aliyuncs.com/web/common/wechat.svg" />
          <a href="http://weibo.com/igeekery?from=myfollow_all&is_host=1" target="_blank"><img src="http://igeekery.oss-cn-shenzhen.aliyuncs.com/web/common/weibo.svg" /></a>
        </Row>
        <Row className={styles.language}>
          <a href="#"><img className={styles.img} src="http://igeekery.oss-cn-shenzhen.aliyuncs.com/web/footer/english.png" />&nbsp;English</a>
          <i className={styles.fg} />
          <a href="#"><img className={styles.img} src="http://igeekery.oss-cn-shenzhen.aliyuncs.com/web/footer/china.png" />&nbsp;中文&nbsp;</a>
        </Row>
        <Row className={styles.links}>
          { linkNodes }
        </Row>
        <Row justify="center" className={styles.copyright}>
          <a href="http://www.miitbeian.gov.cn/">粤ICP备15030586 深圳第一蓝筹科技有限公司版权所有 @2015-2016</a>
        </Row>
      </footer>
    );
  }
}

export default Footer;
