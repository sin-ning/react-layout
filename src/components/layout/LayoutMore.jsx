/**
 * Created by sin on 16/8/9.
 *
 * 布局 更多属性
 */

import React, { Component, createElement } from 'react';
import { Button, Icon } from 'antd';
import styles from './LayoutMore.less';
import TweenOne from 'rc-tween-one';

const ButtonGroup = Button.Group;

const buttonGroupConfig = ['left', 'center', 'right'];
const Position = ({ dispatch, data = {} }) => {

  const alignClick = (align) => {
    updateState({...data, ...{align: align}});
  };

  const renderButtonGroup = () => {
    // data.align
    return buttonGroupConfig.map(align => {
      let type = 'ghost';
      if (data.align == align) {
        type = 'primary';
      }
      return <Button key={align} type={type} onClick={alignClick.bind(this, align)}>{align}</Button>;
    });
  };

  const changeWidth = (e) => {
    updateState({...data, ...{width: e.target.value}});
  };

  const changeOffset = (offsetAlign, e) => {
    let newOffset = {...data.offset, ...{[offsetAlign]: e.target.value}};
    updateState({...data, ...{offset: newOffset}});
  };

  const updateState = (data) => {
    dispatch({
      type: 'layout/more/update',
      data: {
        position: data,
      }
    })
  };

  const getOffsetAttribute = (field) => {
    let offset = data.offset;
    if (!offset) {
      return 0;
    }
    return offset[field];
  };

  return (
    <div>
      <ul>
        <li>
          <h4>位置</h4>
          <p>定位 <span>相对定位</span></p>
          <ButtonGroup size="small">
            { renderButtonGroup() }
          </ButtonGroup>
        </li>
        <li>
          <p>宽度 <span>单位 px em</span></p>
          <input className={`${styles.bottomSty}`} onChange={changeWidth} defaultValue={data.width}/>
        </li>
        <li>
          <p>定位偏移 <span>定位后偏移 px em</span></p>

          <div>
            <label>top</label>
            <input className={`${styles.bottomSty} ${styles.short}`} onChange={changeOffset.bind(this, 'top')} defaultValue={getOffsetAttribute('top')}/>
            <label>bottom</label>
            <input className={`${styles.bottomSty} ${styles.short}`} onChange={changeOffset.bind(this, 'bottom')} defaultValue={getOffsetAttribute('bottom')}/>
            <label>left</label>
            <input className={`${styles.bottomSty} ${styles.short}`} onChange={changeOffset.bind(this, 'left')} defaultValue={getOffsetAttribute('left')}/>
            <label>right</label>
            <input className={`${styles.bottomSty} ${styles.short}`} onChange={changeOffset.bind(this, 'right')} defaultValue={getOffsetAttribute('right')}/>
          </div>
        </li>
      </ul>
    </div>
  );
};


const Animate = ({dispatch, data = {}}) => {

  const animationConfig = {
    FadeIn: {
      title: '向上淡出',
      duration: 450,
      delay: 0,
      repeatDelay: 0,
      yoyo: true,
      config: { y: 30, opacity: 0, type: 'from' },
    }
  };

  const renderAnimate = () => {
    let animateNode = [];
    for (const key in animationConfig) {
      let animation = animationConfig[key];

      let type = 'ghost';
      if (data.title == animation.title) {
        type = 'primary';
      }
      animateNode.push(<Button key={animation.title} type={type} >{animation.title}</Button>);
    }
    return animateNode;
  };

  return (
    <div>
      <ul>
        <li>
          <h4>动画</h4>
          <div>
            <p>执行时间 <span>时间单位 ms</span></p>
            <input type="number" className={`${styles.bottomSty}`} defaultValue={data.duration}/>
          </div>
        </li>
        <li>
          <p>延迟执行时间 <span>时间单位 ms</span></p>
          <input type="number" className={`${styles.bottomSty}`} defaultValue={data.delay}/>
        </li>
        <li>
          <ButtonGroup size="small">
            { renderAnimate() }
          </ButtonGroup>
        </li>

      </ul>
    </div>
  );
};

class LayoutMore extends Component {


  render() {
    console.info('LayoutMore LayoutMore LayoutMore',this.props);
    const { dispatch, moreShow, moreTitle } = this.props;

    const { position, animation } = this.props.more;

    return (
      <div className={styles.more}>
        <TweenOne animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                  paused={!moreShow}>
          <div className={styles.title}>
            More { moreTitle }
          </div>
          <div className={styles.body}>
            <Position dispatch={dispatch} data={position}></Position>

            {/*<Animate dispatch={dispatch} data={animation}></Animate>*/}
          </div>
        </TweenOne>
      </div>
    );
  }
}

export default LayoutMore;
