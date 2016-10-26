import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './HomePage.less';
import './HomePage.css';
import { Button, Tabs } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Link, Element } from 'rc-scroll-anim';
import Footer from '../layouts/defaultLayout/Footer';
import Card from '../components/card/Card';


const TweenOneGroup = TweenOne.TweenOneGroup;
const TabPane = Tabs.TabPane;

class HomePage extends Component{

  state = {
    show: false,
  };

  onClick() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {

    return (
      <div>
        <Card>123</Card>
      </div>
    );
  }
}


export default HomePage;
