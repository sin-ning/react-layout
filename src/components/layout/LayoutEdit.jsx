/**
 * Created by sin on 16/7/22.
 */

import React, { Component, PropTypes, createElement } from 'react';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import { Icon, Button, Select, Input, InputNumber, Col, Row, Modal, Radio, message } from 'antd';
import assign from 'object-assign'
import TweenOne from 'rc-tween-one';
import { OverPack } from 'rc-scroll-anim';

import { listenerMove } from '../../util/EventListener';
import { _elementOffset, _elementAllPosition } from '../../util/DistanceCalcs';
import styles from './LayoutEdit.less';

const InputGroup = Input.Group;
const ButtonGroup = Button.Group;
const Option = Select.Option;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class LayoutColorSelected extends Component {

  constructor() {
    super(...arguments);
    this.state.selectColor = this.props.selectColor;
  }

  static propTypes = {
    selectColor: PropTypes.string,
    onChange: PropTypes.func,
  };

  state = {
    loading: false,
    visible: false,
    customColor: '',
    selectColor: 'transparent',
    colorConfig: ['transparent', '#666', '#FFF', '#FBFBFB', '#6c5de7'],
  };

  componentWillReceiveProps(nextProps) {
    this.setState({selectColor: nextProps.selectColor});
  }

  handleOk() {
    const { customColor } = this.state;
    this.handlerColorChange(customColor);
    this.handleCancel();
  }

  handleCancel() {
    this.setState({
      visible: false
    });
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  onSelect(color) {
    if (color == 'custom') {
      this.showModal();
    }
    else {
      this.handlerColorChange(color);
    }
  }

  handlerColorChange(color) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(color);
    }
  }

  onChangeCustomColor(e) {
    this.setState({
      customColor: e.target.value,
    });
  }

  render() {
    const {  } = this.props;
    const { customColor, colorConfig, selectColor } = this.state;

    let defaultValue = null;
    const colorPanelNode = colorConfig.map(color => {
      if (selectColor == color) {
        defaultValue = color;
      }
      return <Option key={color} value={color}><p className={styles.colorPanel} style={{backgroundColor: `${color}`}} >&nbsp;</p></Option>;
    });

    if (!defaultValue) {
      defaultValue = 'custom';
    }

    return (
      <div className={styles.colorSelect}>
        <Select defaultValue={defaultValue} className={styles.editColor} size="small" onSelect={this.onSelect.bind(this)}>
          { colorPanelNode }
          <Option key='custom' value='custom'>其他</Option>
        </Select>

        <Modal ref="modal"
               width={300}
               visible={this.state.visible}
               title="添加连接"
               onOk={this.handleOk.bind(this)}
               onCancel={this.handleCancel.bind(this)}>

          <Row><label>色值(RGB 或 RGBA)</label></Row>
          <Row>
            <Input defaultValue={customColor} onChange={this.onChangeCustomColor.bind(this)} />
          </Row>
        </Modal>
      </div>
    );
  }
}


/**
 * 更多配置属性
 */
class LayoutInElementMore extends Component {

  constructor() {
    super(...arguments);
    const { field } = this.props;
    this.state.more = {...field.layoutInEdit};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({more: {...nextProps.field.layoutInEdit}});
  }

  static propTypes = {
    index: PropTypes.number.isRequired,
    field: PropTypes.object.isRequired,
  };

  static contextTypes = {
    dispatch: PropTypes.func,
    renderIndex: PropTypes.number,
  };

  state = {
    loading: false,
    visible: false,
    /**
     * 更多 style 设置
     */
    more: {
    },
  };

  handlerBorderColor(color) {
    this.setState({more: {...this.state.more, ['borderColor']: color}});
  }

  handleOk() {

    // 关闭 modal
    this.setState({ ...this.state, visible: false });

    const { more } = this.state;
    const { index, field } = this.props;
    const { dispatch, renderIndex } = this.context;

    dispatch({
      type: 'layout/edit/more/update',
      data: {
        index,
        field,
        renderIndex,
        more,
      }
    });
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  setMoreValue(field, e) {
    this.state.more[field] = e.target.value;
  }

  getDefaultValue(field) {
    const value = this.state['more'][field];
    if (value) {
      return value;
    }
    return '';
  }

  render() {
    return (
      <div className={styles.editMore}>
        <Modal ref="modal"
               width={300}
               visible={this.state.visible}
               title="添加连接"
               onOk={this.handleOk.bind(this)}
               onCancel={this.handleCancel.bind(this)}>

          <Row>
            <Row>
              <label>高/宽:</label>
            </Row>
            <Row>
              <Col span={10}>
                <Input size="small" defaultValue={this.getDefaultValue('height')} onChange={this.setMoreValue.bind(this, 'height')} />
              </Col>
              <Col offset={2} span={10}>
                <Input size="small" defaultValue={this.getDefaultValue('width')} onChange={this.setMoreValue.bind(this, 'width')} />
              </Col>
            </Row>
          </Row>

          <br/>

          <Row>
            <Row>
              <label>外边距:</label>
            </Row>
            <Row>
              <Col span={3} offset={1}>
                <span>上:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('marginTop')} onChange={this.setMoreValue.bind(this, 'marginTop')} />
              </Col>

              <Col span={3} offset={1}>
                <span>右:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('marginRight')} onChange={this.setMoreValue.bind(this, 'marginRight')} />
              </Col>
            </Row>

            <Row>
              <Col span={3} offset={1}>
                <span>下:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('marginBottom')} onChange={this.setMoreValue.bind(this, 'marginBottom')} />
              </Col>

              <Col span={3} offset={1}>
                <span>左:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('marginLeft')} onChange={this.setMoreValue.bind(this, 'marginLeft')} />
              </Col>
            </Row>
          </Row>

          <br/>

          <Row>
            <Row>
              <label>内边距:</label>
            </Row>
            <Row>
              <Col span={3} offset={1}>
                <span>上:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('paddingTop')} onChange={this.setMoreValue.bind(this, 'paddingTop')} />
              </Col>

              <Col span={3} offset={1}>
                <span>右:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('paddingRight')} onChange={this.setMoreValue.bind(this, 'paddingRight')} />
              </Col>
            </Row>

            <Row>
              <Col span={3} offset={1}>
                <span>下:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('paddingBottom')} onChange={this.setMoreValue.bind(this, 'paddingBottom')} />
              </Col>

              <Col span={3} offset={1}>
                <span>左:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('paddingLeft')} onChange={this.setMoreValue.bind(this, 'paddingLeft')} />
              </Col>
            </Row>
          </Row>

          <br/>

          <Row>
            <Row>
              <label>边界线:</label>
              <LayoutColorSelected onChange={this.handlerBorderColor.bind(this)} selectColor={this.getDefaultValue('borderColor')}/>
            </Row>

            <Row>
              <Col span={3} offset={1}>
                <span>style:</span>
              </Col>
              <Col span={20}>
                <RadioGroup size="small" defaultValue={this.getDefaultValue('borderStyle')} onChange={this.setMoreValue.bind(this, 'borderStyle')}>
                  <RadioButton value="none">没有</RadioButton>
                  <RadioButton value="solid">实线</RadioButton>
                  <RadioButton value="dashed">虚线</RadioButton>
                  <RadioButton value="dotted">有点</RadioButton>
                </RadioGroup>
              </Col>
            </Row>

            <Row>
              <Col span={3} offset={1}>
                <span>圆角:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('borderRadius')} onChange={this.setMoreValue.bind(this, 'borderRadius')} />
              </Col>
              <Col span={3} offset={1}>
                <span>大小:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('borderWidth')} onChange={this.setMoreValue.bind(this, 'borderWidth')} />
              </Col>
            </Row>

            <Row>
              <Col span={3} offset={1}>
                <span>上:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('borderTop')} onChange={this.setMoreValue.bind(this, 'borderTop')} />
              </Col>

              <Col span={3} offset={1}>
                <span>右:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('borderRight')} onChange={this.setMoreValue.bind(this, 'borderRight')} />
              </Col>
            </Row>

            <Row>
              <Col span={3} offset={1}>
                <span>下:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('borderBottom')}  onChange={this.setMoreValue.bind(this, 'borderBottom')} />
              </Col>

              <Col span={3} offset={1}>
                <span>左:</span>
              </Col>
              <Col span={5}>
                <Input size="small" defaultValue={this.getDefaultValue('borderLeft')}  onChange={this.setMoreValue.bind(this, 'borderLeft')} />
              </Col>
            </Row>
          </Row>

        </Modal>

        <Button icon="ellipsis" size="small" onClick={this.showModal.bind(this)}></Button>
      </div>
    );
  }
}

/**
 * 添加链接
 * 1、将节点, 添加链接
 * 2、自动识别 Link 和 a
 */
class LayoutInElementLink extends Component {

  constructor() {
    super(...arguments);
    const { field } = this.props;

    if (field && field.link) {
      this.state.value = field.link;
    }
  }

  static propTypes = {
    index: PropTypes.number.isRequired,
    field: PropTypes.object.isRequired,
  };

  static contextTypes = {
    dispatch: PropTypes.func,
    renderIndex: PropTypes.number,
  };

  state = {
    loading: false,
    visible: false,
    value: '',
  };

  handleOk() {
    // this.setState({ loading: true });
    const { value } = this.state;
    const { index, field } = this.props;
    const { dispatch, renderIndex } = this.context;

    dispatch({
      type: 'layout/edit/link/update',
      data: {
        value,
        index,
        field,
        renderIndex,
      }
    });

    // 关闭 modal
    this.setState({ visible: false });
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  onChange(e) {
    this.setState({value: e.target.value});
  }

  render() {

    const { field } = this.props;
    let defaultValue = '';
    let inputType = 'ghost'; //primary
    if (field && field.link) {
      defaultValue = field.link;
      inputType = 'primary';
    }

    return (
      <div className={styles.elementLink}>
        <Modal ref="modal"
               visible={this.state.visible}
               title="添加连接"
               onOk={this.handleOk.bind(this)}
               onCancel={this.handleCancel.bind(this)}>

          <label>连接地址</label>
          <Input type="textarea" defaultValue={defaultValue} onChange={this.onChange.bind(this)} />

        </Modal>
        <Button className={styles.showBtn} size="small" type={inputType} onClick={this.showModal.bind(this)}>添加连接</Button>
      </div>
    );
  }
}

/**
 * layout 节点 animation
 * 1、调整元素动画
 * 2、改变动漫执行时间 和 延迟时间
 */
class LayoutInElementAnimation extends Component {

  constructor() {
    super(...arguments);
    this.state.animation = JSON.stringify(this.props.field.animation);
  }

  static propTypes = {
    index: PropTypes.number.isRequired,
    field: PropTypes.object.isRequired,
  };

  static contextTypes = {
    dispatch: PropTypes.func,
    renderIndex: PropTypes.number,
  };

  state = {
    loading: false,
    visible: false,
    animation: '',
  };


  handleOk() {
    const { animation } = this.state;
    this.handleCancel();
    try {
      let newAnimation = JSON.parse(animation);
      if (!newAnimation.opacity) {
        newAnimation['opacity'] = 1;
      }
      this.handlerAnimationUpdate(newAnimation);
    } catch (e) {
      message.error("格式不正确!!");
    }
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handlerChangeAnimation(e) {
    this.setState({
      animation: e.target.value,
    });
  }

  onChangeAnimation(animationConfig, animationIndex) {
    const { field, index } = this.props;
    const { renderIndex, dispatch } = this.context;

    const customItem = animationIndex == (animationConfig.length - 1);

    let animation = null;

    // 最后一个为 自定义
    if (customItem) {
      this.showModal();
    }

    if (animationIndex && !customItem) {
      animation = animationConfig[animationIndex];
    }
    this.handlerAnimationUpdate(animation);
  }

  handlerAnimationUpdate(animation) {
    const { field, index } = this.props;
    const { renderIndex, dispatch } = this.context;

    dispatch({
      type: 'layout/edit/animation/update',
      data: {
        animation,
        field,
        index,
        renderIndex
      }
    });
  }


  onChangeAttribute(animation, animationFiled, e) {
    const { field, index } = this.props;
    const { renderIndex, dispatch } = this.context;
    animation[animationFiled] = parseInt(e.target.value);
    dispatch({
      type: 'layout/edit/animation/update',
      data: {
        animation,
        field,
        index,
        renderIndex
      }
    });
  }

  onClickYoyo(yoyo) {
    const { field, index } = this.props;
    const { renderIndex, dispatch } = this.context;
    const animation = {...field.animation, ...{yoyo: yoyo}};
    dispatch({
      type: 'layout/edit/animation/update',
      data: {
        animation,
        field,
        index,
        renderIndex
      }
    });
  }

  onClickScrollAnim(scrollAnim) {
    const { field, index } = this.props;
    const { renderIndex, dispatch } = this.context;
    const animation = {...field.animation, ...{scrollAnim: scrollAnim}};

    dispatch({
      type: 'layout/edit/animation/update',
      data: {
        animation,
        field,
        index,
        renderIndex
      }
    });
  }

  // animation 输入框属性配置
  ANIMATION_INPUT_ATTRIBUTE_CONFIG = [
    {text: '执行(ms)', field: 'duration'},
    {text: '延迟(ms)', field: 'delay'},
  ];

  renderAttribute(customItem) {
    const { index, field } = this.props;
    const { renderIndex } = this.context;
    const scrollAnimDisabled = renderIndex && renderIndex == 1 ? true : false;

    if (!field.animation || customItem) {
      return null;
    }

    const inputAttrNode = this.ANIMATION_INPUT_ATTRIBUTE_CONFIG.map(attr => {
      return (
        <div className={styles.attr} key={attr.field}>
          <label>{attr.text}</label>
          <Input size="small" onBlur={this.onChangeAttribute.bind(this, field.animation, attr.field)} defaultValue={field.animation[attr.field]} />
        </div>
      );
    });


    return (
      <div className={styles.attribute}>

        { inputAttrNode }

          <div className={styles.attr}>
            <label>鼠标动画</label>
            <ButtonGroup>
              <Button size="small" type={field.animation.scrollAnim ? 'primary' : 'ghost'} disabled={scrollAnimDisabled} onClick={this.onClickScrollAnim.bind(this, true)} title="第一屏不能添加滚动时动画!">是</Button>
              <Button size="small" type={!field.animation.scrollAnim ? 'primary' : 'ghost'} disabled={scrollAnimDisabled} onClick={this.onClickScrollAnim.bind(this, false)} title="第一屏不能添加滚动时动画!">否</Button>
            </ButtonGroup>
          </div>
      </div>
    );
  }

  render() {
    const {field} = this.props;
    const {animation} = this.state;

    const animationConfig = [
      {
        title: '无动画效果',
        duration: 0,
        delay: 0,
        repeatDelay: 0,
      },
      {
        title: '上半透淡',
        y: '30',
        opacity: 0,
        type: 'from',
        duration: 450,
        delay: 0,
        repeatDelay: 0,
      },
      {
        title: '右滑出',
        y: '0',
        x: '50',
        opacity: 0,
        type: 'from',
        duration: 450,
        delay: 0,
        repeatDelay: 0,
      },
      {
        title: '自定义',
        y: 0,
        x: 0,
        opacity: 0,
        type: 0,
        duration: 0,
        delay: 0,
        repeatDelay: 0,
      },
    ];

    let defaultValue = null;
    let customItem = false;
    let selectChildren = animationConfig.map((animation, index) => {
      if (field.animation && field.animation.title == animation.title) {
        defaultValue = index;
      }
      return (<Option key={`animation_${index}`} value={index}>{animation.title}</Option>);
    });

    if (defaultValue == null) {
      defaultValue = animationConfig.length - 1;
      customItem = true;
    }

    return (
      <div className={styles.editAnimation}>
        <Select defaultValue={defaultValue} size="small" onSelect={this.onChangeAnimation.bind(this, animationConfig)}>
          {selectChildren}
        </Select>

        { this.renderAttribute(customItem) }

        <Modal ref="modal"
               width={300}
               visible={this.state.visible}
               title="自定义 animation"
               onOk={this.handleOk.bind(this)}
               onCancel={this.handleCancel.bind(this)}>

          <div>
            <p>type: 执行方向</p>
            <p>duration: 执行时间</p>
            <p>delay: 延迟时间</p>
          </div>

          <Row>
            <label>animation:</label>
          </Row>
          <Row>
            <Input type="textarea" value={animation} onChange={this.handlerChangeAnimation.bind(this)}/>
          </Row>
        </Modal>
      </div>
    );
  }
}


/**
 * 编辑文字布局
 *
 * 1、编辑文字样式
 * 2、大小、字体、下划线
 * 3、转换连接 Link、和text
 * 4、字体颜色
 */
class LayoutInEditFont extends Component {

  constructor() {
    super(...arguments);
  }

  static propTypes = {
    index: PropTypes.number.isRequired,
    field: PropTypes.object.isRequired,
  };

  static contextTypes = {
    renderIndex: PropTypes.number,
  };


  onClick(styleFiled, styleFieldValue) {
    const { dispatch, field, index } = this.props;
    const { renderIndex } = this.context;

    if (field['layoutInEdit'] && field['layoutInEdit'][styleFiled]) {
      styleFieldValue = null;
    }
    const newLayoutInEdit = {...field['layoutInEdit'], ...{[styleFiled]: styleFieldValue}};
    dispatch({
      type: 'layout/edit/font/update',
      data: {
        field,
        index,
        renderIndex,
        newLayoutInEdit,
      }
    });
  }

  renderFontStyleNode() {
    const {field} = this.props;

    const fontStyleConfig = [
      { type: 'bold', field: 'fontWeight', className:`${styles.defaultColor}`, text:'B', component: 'span'  },
      { type: 'italic', field: 'fontStyle', className:`${styles.defaultColor}`, text:'I', component: 'i'  },
      { type: 'underline', field: 'textDecoration', className:`${styles.defaultColor}`, text:'U', component: 'u'  },
      { type: 'line-through', field: 'textDecoration', className:`${styles.defaultColor}`, text:'AB', component: 's'  },
    ];

    return fontStyleConfig.map(fontConfig => {
      let styleNode = createElement(fontConfig.component, {}, fontConfig.text);
      let type = 'ghost';
      if (field.layoutInEdit && field.layoutInEdit[fontConfig.field]) {
        if (fontConfig.type == field.layoutInEdit[fontConfig.field]) {
          type = 'primary';
        }
      }

      return (
        <Button key={fontConfig.type}
                className={fontConfig.className}
                type={type}
                size="small"
                onClick={this.onClick.bind(this, fontConfig.field, fontConfig.type)}>

          <strong>{styleNode}</strong>
        </Button>
      );
    });
  }

  onChangeFontSize(size) {
    const { dispatch, field, index } = this.props;
    const { renderIndex } = this.context;
    dispatch({
      type: 'layout/edit/font/size',
      data: {
        size,
        index,
        field,
        renderIndex
      }
    });
  }

  renderFontSize() {
    const { field } = this.props;
    const maxIndex = 100;
    const startIndex = 10;
    let selectChildren = [];

    let defaultValue = startIndex;
    if (field.layoutInEdit && field.layoutInEdit.size) {
      defaultValue = field.layoutInEdit.size;
    }

    for (let i = startIndex; i <= maxIndex; i++) {
      selectChildren.push(<Option key={`option_${i}`} value={`${i}px`}>{i}px</Option>);
    }
    return (
      <Select defaultValue={defaultValue} size="small" onChange={this.onChangeFontSize.bind(this)}>{selectChildren}</Select>
    );
  }

  onChangeColor(color) {
    const { dispatch, field, index } = this.props;
    const { renderIndex } = this.context;
    dispatch({
      type: 'layout/edit/color/update',
      data: {
        color,
        field,
        index,
        renderIndex
      }
    });
  }

  onChangeBackgroundColor(color) {
    const { dispatch, field, index } = this.props;
    const { renderIndex } = this.context;
    dispatch({
      type: 'layout/edit/background/color/update',
      data: {
        color,
        field,
        index,
        renderIndex
      }
    });
  }

  COLOR_CONFIG = ['transparent', '#666', '#FFF', '#6c5de7'];

  renderBackgroundColor() {
    const { field } = this.props;
    let defaultValue = this.COLOR_CONFIG[0];
    const colorPanelNode = this.COLOR_CONFIG.map(color => {
      if (field.layoutInEdit && color == field.layoutInEdit.backgroundColor) {
        defaultValue = color
      }

      return <Option key={color} value={color}><p className={styles.colorPanel} style={{backgroundColor: `${color}`}} >&nbsp;</p></Option>;
    });

    return (
      <Select defaultValue={defaultValue} className={styles.editColor} size="small" onChange={this.onChangeBackgroundColor.bind(this)}>
        { colorPanelNode }
      </Select>
    );
  }

  render() {
    const { children, index, field} = this.props;

    const color = field.layoutInEdit && field.layoutInEdit.color ? field.layoutInEdit.color : 'transparent';
    const backgroundColor = field.layoutInEdit && field.layoutInEdit.backgroundColor ? field.layoutInEdit.backgroundColor : 'transparent';
    return (
      <div className={styles.layoutInEditFont}>
        <span className={styles.editCenter}></span>

        <div className={styles.placeholder}></div>

        <ButtonGroup>
          {this.renderFontStyleNode()}
        </ButtonGroup>

        <div className={styles.placeholder}></div>

        {this.renderFontSize()}

        <div className={styles.placeholder}></div>

        <LayoutColorSelected selectColor={color}
                             onChange={this.onChangeColor.bind(this)} />

        <div className={styles.placeholder}></div>

        <LayoutColorSelected selectColor={backgroundColor}
                             onChange={this.onChangeBackgroundColor.bind(this)} />

        <div className={styles.placeholder}></div>

        <p>{children}</p>
      </div>
    );
  }
}


/**
 * 排列布局
 *
 * 1、将元素排列 left center 或 right
 */
class LayoutInAlign extends Component {

  constructor() {
    super(...arguments);
  }

  static propTypes = {
    index: PropTypes.number.isRequired,
    field: PropTypes.object.isRequired,
  };

  static contextTypes = {
    renderIndex: PropTypes.number,
  };

  onClick(fieldStyleValue, e) {
    const { dispatch, field, index } = this.props;
    const { renderIndex } = this.context;

    const newLayoutInEdit = {...field.layoutInEdit, ...{textAlign: fieldStyleValue}};

    dispatch({
      type: 'layout/edit/font/update',
      data: {
        newLayoutInEdit,
        field,
        index,
        renderIndex,
      }
    });
  }

  renderAlignNode() {
    const {field} = this.props;

    const alignNodeConfig = [
      {type: 'left', className: `${styles.editBtnIcon}`, src: 'http://yyssb.ifitmix.com/web/editFont/icion2.png'},
      {type: 'center', className: `${styles.editBtnIcon}`, src: 'http://yyssb.ifitmix.com/web/editFont/icon1.png'},
      {type: 'right', className: `${styles.editBtnIcon}`, src: 'http://yyssb.ifitmix.com/web/editFont/icon3.png'},
    ];

    return alignNodeConfig.map(btnAlign => {

      let type = 'ghost';
      if (field.layoutInEdit && field.layoutInEdit['textAlign'] && field.layoutInEdit['textAlign'] == btnAlign.type) {
        type = 'primary';
      }

      return (
        <Button type={type}
                size="small"
                key={btnAlign.type}
                onClick={this.onClick.bind(this, btnAlign.type)}>

          <img className={btnAlign.className} src={btnAlign.src} />
        </Button>
      );
    });
  }

  render() {
    return (
      <ButtonGroup className={styles.layoutInAlign}>
        {this.renderAlignNode()}
      </ButtonGroup>
    );
  }
}


/**
 * 布局百分比
 * 1、将宽度 增加最大 100%
 * 2、将宽度 增加到 90%
 */
class LayoutInMax extends Component {

  static propTypes = {
    field: PropTypes.object.isRequired,
  };

  static propTypes = {
    index: PropTypes.number.isRequired,
    field: PropTypes.object.isRequired,
  };

  static defaultProps = {
    field: {},
  };

  static contextTypes = {
    dispatch: PropTypes.func,
    renderIndex: PropTypes.number,
  };

  onClick(maxType) {
    const { index, field } = this.props;
    const { dispatch, renderIndex } = this.context;

    dispatch({
      type: 'layout/edit/max/update',
      data: {
        maxType,
        index,
        field,
        renderIndex,
      }
    });
  }

  render () {
    const { field } = this.props;

    const btnMaxWidthType = field.position
    && field.position.width
    && field.position.widthUnit == '%' ? 'primary' : 'ghost';

    return (
      <ButtonGroup className={styles.editMax}>
        <Button className={styles.btn} type={ btnMaxWidthType } size="small" onClick={this.onClick.bind(this, 'width')}>
          <Icon type="left" />
          <Icon type="right" />
        </Button>
      </ButtonGroup>
    );
  }
}

/**
 * 编辑线
 * (提示编辑边角线 和 调整大小的小圆点)
 *
 * 1、改变位置
 * 2、调整味素大小
 */
class EditBorder extends Component {

  POSITION_STYLE = ['left', 'right', 'top', 'bottom', 'width', 'widthUnit', 'height', 'move'];

  constructor() {
    super(...arguments);
    this.synchronizePosition(this.props);
  }

  static contextTypes = {
    edit: PropTypes.bool,
    openEdit: PropTypes.bool,
    renderIndex: PropTypes.number,
  };

  static propTypes = {
    onMove: PropTypes.func,
    move: PropTypes.bool,
    handlerClick: PropTypes.func,
    handlerBlue: PropTypes.func,
    handlerMove: PropTypes.func,
    changeSize: PropTypes.bool,
  };

  static defaultProps = {
    move: false,
    changeSize: false,
  };

  state = {
    left: null,
    right: null,
    top: null,
    bottom: null,
    height: null,
    width: null,
    widthUnit: null,
    move: null,
    unit: 'px', // px % 只有 px % 以去掉, 不安 % 百分比来布局,
    calUnit: {
      left: null,
      top: null,
    }
  };

  componentWillReceiveProps(nextProp) {
    const { field } = nextProp;

    if (field.position) {
      let widthUnit = field.position['widthUnit'] == '%' ? field.position['widthUnit'] : null;
      if (widthUnit) {
        this.setState({
          move: nextProp.move,
          width: (field.position['width'] ? field.position['width'] : this.state.width),
          widthUnit: widthUnit,
        });
      }
      else {
        this.setState({
          move: nextProp.move,
        });
      }
    }

  }

  synchronizePosition(props) {
    const { field } = props;
    // this.state.unit = '%';
    this.POSITION_STYLE.map(positionField => {
      if (field.position && field.position[positionField]) {
        if(this.state[positionField] != field.position[positionField]) {
          this.state[positionField] = field.position[positionField];
        }
      }
    });
  }

  LISTEN_ALT = ['editBorder',
    'editBorderTop', 'editBorderTopRight',
    'editBorderRight', 'editBorderRightBottom',
    'editBorderBottom', 'editBorderBottomLeft',
    'editBorderLeft', 'editBorderLeftTop'];

  LISTEN_ALT_STYLES = [styles.editBorder,
    styles.editBorderTop, styles.editBorderTopRight,
    styles.editBorderRight, styles.editBorderRightBottom,
    styles.editBorderBottom, styles.editBorderBottomLeft,
    styles.editBorderLeft, styles.editBorderLeftTop];

  componentDidMount() {
    const { edit } = this.context;
    if (edit) {
      this.initEdit();
    }
  }


  initEdit() {
    let triggerEvent = null;
    let targetMoveElementOffset = null;
    const moveSizeUnit = 'px';
    const movePositionUnit = 'px';
    this.LISTEN_ALT.map((ref) => {
      listenerMove(this.refs[ref], (listenerEvent, mouseEvent, position) => {
          const {mousePosition, currentElementOffset,
            targetElementPosition, targetElementOffset, targetMouseInElementByPosition} = position;

          const moveElementOffset = _elementOffset(this.refs['editBorder']);

          // 处理事件冲突, 只允许触发一个事件
          if (triggerEvent && triggerEvent != ref) return;

          const editBorderTop = () => {
            const diffHeight = targetElementPosition.y - mousePosition.y;
            const moveTop = targetMoveElementOffset.y - diffHeight;
            const moveHeight = targetMoveElementOffset.h + diffHeight;
            this.setState({top: `${moveTop}${movePositionUnit}`, height: `${moveHeight}${moveSizeUnit}`});
          };

          const editBorderRight = () => {
            const moveLeft = moveElementOffset.x;
            const moveWidth = targetMoveElementOffset.w + (mousePosition.x - targetElementPosition.x);
            this.setState({left: `${moveLeft}${movePositionUnit}`, width: `${moveWidth}${moveSizeUnit}`});
          };

          const editBorderBottom = () => {
            const diffHeight = mousePosition.y - targetElementPosition.y;
            const moveTop = targetMoveElementOffset.y;
            const moveHeight = targetMoveElementOffset.h + diffHeight;
            this.setState({top: `${moveTop}${movePositionUnit}`, height: `${moveHeight}${moveSizeUnit}`});
          };

          const editBorderLeft = () => {
            const diffLeft = targetElementPosition.x - mousePosition.x;
            const moveLeft = targetMoveElementOffset.x - diffLeft;
            const moveWidth = targetMoveElementOffset.w + diffLeft;
            this.setState({left: `${moveLeft}${movePositionUnit}`, width: `${moveWidth}${moveSizeUnit}`});
          };

          if (ref == 'editBorder') {
            const moveLeft = mousePosition.x - targetMouseInElementByPosition.x;
            const moveTop = mousePosition.y - targetMouseInElementByPosition.y;
            const moveWidth = targetMoveElementOffset.w;
            const moveHeight = targetMoveElementOffset.h;
            this.setState({left: `${moveLeft}${movePositionUnit}`, top: `${moveTop}${movePositionUnit}`, width: `${moveWidth}${moveSizeUnit}`, height: `${moveHeight}${moveSizeUnit}`});
          }
          else if (ref == 'editBorderTop') {
            editBorderTop();
          }
          else if (ref == 'editBorderTopRight') {
            editBorderTop();
            editBorderRight();
          }
          else if (ref == 'editBorderRight') {
            editBorderRight();
          }
          else if (ref == 'editBorderRightBottom') {
            editBorderRight();
            editBorderBottom();
          }
          else if (ref == 'editBorderBottom') {
            editBorderBottom();
          }
          else if (ref == 'editBorderBottomLeft') {
            editBorderBottom();
            editBorderLeft();
          }
          else if (ref == 'editBorderLeft') {
            editBorderLeft();
          }
          else if (ref == 'editBorderLeftTop') {
            editBorderLeft();
            editBorderTop();
          }

          // 触发move
          if (this.props.handlerMove) {
            this.props.handlerMove(true);
          }

          // 更多 单位
          // this.setState({unit: 'px'});

          {
            // const {calUnit, left, right, top, bottom, height, width} = this.state;
            // const { dispatch, index, field } = this.props;
            // const { renderIndex } = this.context;
            // dispatch({
            //   type: 'layout/edit/position/update',
            //   data: {
            //     field: field,
            //     index: index,
            //     renderIndex: renderIndex,
            //     left: left,
            //     top: top,
            //     height: height,
            //     width: width
            //   }
            // });

          }
        },
        () =>{
          if (!triggerEvent) {
            // 处理事件冲突, 只允许触发一个事件
            triggerEvent = ref;
            this.refs['editBorder'].focus();
            this.setState({move: true});
          }
          // 触发时,移动目标 offset
          targetMoveElementOffset = _elementOffset(this.refs['editBorder']);
        },
        (e, move) => {
          // 处理事件冲突, 只允许触发一个事件
          if (triggerEvent && triggerEvent != ref) return;
          if (triggerEvent == ref) {
            triggerEvent = null;

            const {calUnit, left, right, top, bottom, height, width} = this.state;
            const { dispatch, index, field } = this.props;
            const { renderIndex } = this.context;

            // 结束后将所有 px 属性,计算成百分百(%)
            const bodyAllPosition = _elementAllPosition(this.refs['editBorder'].parentNode);
            const newLeft = parseFloat((parseFloat(left) / bodyAllPosition.clientWidth * 100).toFixed(4));
            const newTop = parseFloat((parseFloat(top) / bodyAllPosition.clientHeight * 100).toFixed(4));

            // this.setState({calUnit: {left: newLeft, top: newTop, unit: '%'}});

            if (move) {
              const positionUnit = '%';

              this.setState({
                left: `${newLeft}${positionUnit}`,
                top: `${newTop}${positionUnit}`,
              });

              dispatch({
                type: 'layout/edit/position/update',
                data: {
                  field: field,
                  index: index,
                  renderIndex: renderIndex,
                  left: `${newLeft}${positionUnit}`,
                  top: `${newTop}${positionUnit}`,
                  height: `${height}`,
                  width: `${width}`,
                }
              });
            }
          }
        });
    });
  }

  render() {
    const { children, dispatch } = this.props;
    const { move, unit } = this.state;
    const { edit } = this.context;
    const style = {};

    this.POSITION_STYLE.map(position => {
      if (this.state[position]) {
        if (position == 'width') {
          return style['maxWidth'] = `${this.state[position]}`;
        }
        return style[position] = `${this.state[position]}`;
      }
    });

    const listenAltNode = this.LISTEN_ALT.map((moveEl, index) => {
      if (moveEl != 'editBorder') {
        const moveClass =  move ? `` : `${styles.changeHide} `;
        return (<span ref={`${moveEl}`} key={`${moveEl}_${index}`} className={`${this.LISTEN_ALT_STYLES[index]} ${moveClass}`}></span>);
      };
    });

    const solidClass = move ? styles.changeSolid : '' ;

    const editSolidClass = edit ? '' : styles.transparentSolid ;

    let returnNode = null;
    let returnChildrenNdode=(
      <div>
        { listenAltNode }

        { children }
      </div>
    );

    if (edit) {
      returnNode = (
        <div ref="editBorder"
             style={style}
             tabIndex="1"
             onClick={this.props.handlerClick}
             className={`${styles.editBorder} ${solidClass} ${editSolidClass}`}>

          {returnChildrenNdode}
        </div>
      );
    }
    else {
      returnNode = (
        <div ref="editBorder"
             style={style}
             tabIndex="1"
             className={`${styles.editBorder} ${solidClass} ${editSolidClass}`}>

          {returnChildrenNdode}
        </div>
      );
    }

    return returnNode;
  }
}


class EditItem extends Component {

  constructor() {
    super(...arguments);
  }

  static propTypes = {
    index: PropTypes.number, // 索引
    field: PropTypes.object, // 编辑
    edit: PropTypes.bool, // 编辑
    drag: PropTypes.bool, // 拖拽
    changeSize: PropTypes.bool, // 改变大小
  };

  static defaultProps = {
    edit: false,
    drag: false,
    changeSize: false,
  };

  static contextTypes = {
    edit: PropTypes.bool,
  };

  state = {
    showEditTool: false,
  };

  handlerClick() {
    this.setState({showEditTool: true});
  }

  handlerBlue() {

  }

  editItemClick = (e) => {
    if (this.state.showEditTool) {
      this.setState({showEditTool: false});
    }
  };

  componentDidMount() {
    this.refs['editItem'].refs['editBorder'].parentNode.addEventListener('click', this.editItemClick, false);
  }

  componentWillUnmount() {
    this.refs['editItem'].refs['editBorder'].parentNode.removeEventListener("click", this.editItemClick, false);
  }


  render() {
    const { dispatch, field, index } = this.props;
    const { showEditTool } = this.state;
    const { edit } = this.context;

    let fontBuildNode = null;
    let toolPanelNode = [];

    let fontStyle = {};
    let openStyle = {};
    let alignStyle = {};

    // 公共 style 属性
    if (field.layoutInEdit) {
      const { textAlign } = field.layoutInEdit;
      if (textAlign) {
        alignStyle['textAlign'] = textAlign;
      }
    }

    // text style 属性
    if (field.layoutInEdit) {
      fontStyle = field.layoutInEdit;
    }

    if (field.type == 'text') {
      fontBuildNode = createElement('p', {className:styles.fontContext, style: fontStyle, dangerouslySetInnerHTML: {__html: field.value}});
    }
    // button
    else if (field.type == 'button') {
      fontBuildNode = <Button style={fontStyle}>{field.value}</Button>;
    }
    // image
    else if (field.type == 'image') {
      let imgHeight = '100%';
      if (field.position && field.position.height) {
        imgHeight = field.position.height - 20 + 'px';
      }
      fontBuildNode = createElement('img', {src: field.value, className: styles.imageContext, style: {height: imgHeight, ...fontStyle}});
    }


    // 最后节点, 拥有布局后的定位 和 样式
    fontBuildNode = createElement('div', {style: alignStyle}, fontBuildNode);

    // 连接
    if (!edit && field.link) {
      // 编辑模式 才生成 连接
      if (field.link.toString().indexOf('http') != -1) {
        fontBuildNode = <a href={field.link} target="_blank">{fontBuildNode}</a>
      }
      else {
        fontBuildNode = <Link to={field.link}>{fontBuildNode}</Link>
      }
    }

    // animation
    if (field.animation) {
      // 这里需要每次产生一个 新的 animation 对象, 同地址对象改变不会刷新动画
      const newAnimation = assign({}, field.animation);
      fontBuildNode = <TweenOne key={`tweeOne-${field.field}`}  animation={newAnimation}>{fontBuildNode}</TweenOne>;

      // scrollAnim 动画
      if (field.animation.scrollAnim) {
        fontBuildNode = <OverPack playScale={0.2}
                                  hideProps={{ [`tweeOne-${field.field}`]: { reverse: true }}}> { fontBuildNode } </OverPack>;
      }
    }

    // default tools
    toolPanelNode.push(<LayoutInEditFont key={`font_${field.field}_${index}`} dispatch={dispatch} field={field} index={index} />);

    toolPanelNode.push(
      <LayoutInElementAnimation key={`animation_${field.field}_${index}`} index={index} field={field} />
    );

    toolPanelNode.push(
      <div key={`place_${field.field}_${index}`} className={styles.placeholder}></div>
    );

    toolPanelNode.push(
      <LayoutInElementMore key={`more_${field.field}_${index}`} index={index} field={field} />
    );


    return (
      <EditBorder ref="editItem"
                  tabIndex={3}
                  dispatch={dispatch}
                  field={field}
                  handlerClick={this.handlerClick.bind(this)}
                  handlerBlue={this.handlerBlue.bind(this)}
                  handlerMove={this.handlerClick.bind(this)}
                  move={showEditTool}
                  index={index}>

        {fontBuildNode}

        <div ref="toolPanel"
             tabIndex={2}
             className={`${styles.toolPanel} ${showEditTool ? '' : styles.hide}`}>

          <LayoutInAlign key={`align_${field.field}_${index}`} dispatch={dispatch} field={field} index={index} />
          <div key={`place_link_${field.field}_${index}`} className={styles.placeholder}></div>

          <LayoutInMax field={field} index={index}/>
          <div key={`place_max_${field.field}_${index}`} className={styles.placeholder}></div>

          <LayoutInElementLink key={`link_${field.field}_${index}`} dispatch={dispatch} field={field} index={index} />

          {toolPanelNode}

        </div>
      </EditBorder>
    );
  }
}


class LayoutEdit extends Component {

  constructor() {
    super(...arguments);
    [
      'onMouseOver',
      'onMouseOut',
      'onClick',
      'onDoubleClick',
    ].forEach((method) => this[method] = this[method].bind(this));

    this.state.cmName = this.props.data.cmName;
  }

  static childContextTypes = {
    dispatch: PropTypes.func,
    renderIndex: PropTypes.number,
  };

  getChildContext() {
    return {
      dispatch: this.props.dispatch,
      renderIndex: this.props.renderIndex,
    };
  }

  state = {
    editTool: false,
    loading: false,
    visible: false,
    cmName: '',
  };

  static propTypes = {
    onDoubleClick: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    renderIndex: PropTypes.number.isRequired,
    edit: PropTypes.bool.isRequired, // 是否开启编辑。(true editTool 才有效)
    prefixCls: PropTypes.string,
    children: PropTypes.element.isRequired,
  };

  static defaultProps = {
    className: ` ${styles.layoutEdit} `,
    edit: false,
  };


  handleOk() {
    this.handleCancel();
    this.onSaveLayoutCustom();
  }

  handleCancel() {
    this.setState({
      visible: false
    });
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }


  onClick(e) {
    e.preventDefault();
  }

  onMouseOver() {
    this.setState({editTool: true});
  }

  onMouseOut() {
    this.setState({editTool: false});
  }

  onDoubleClick() {
    const { dispatch, edit, data, renderIndex } = this.props;
    // if (!edit) return;
    dispatch({
      type: 'layout/edit/show',
      data: {
        data: data,
        editIndex: renderIndex,
      }
    });
  }

  onDelete() {
    const {dispatch, renderIndex} = this.props;
    dispatch({
      type: 'layout/render/delete',
      renderIndex: renderIndex,
    });
  }

  onMove(move) {
    const {dispatch, renderIndex} = this.props;
    const targetIndex = renderIndex + (move == 'up' ? -1 : 1);

    dispatch({
      type: 'layout/render/move',
      data: {
        renderIndex: renderIndex,
        targetIndex: targetIndex,
      }
    });
  }

  onSaveLayout() {
    const {dispatch, renderIndex, data} = this.props;
    dispatch({
      type: 'layout/saveLayout',
      data: {
        renderIndex,
        data
      }
    });
  }

  onSaveLayoutCustom() {
    const {dispatch, renderIndex, data, layoutConfig} = this.props;
    const { cmName } = this.state;

    if (data.cmName.toString().indexOf("-") == -1) {
      data['cmName'] = data.cmName + "-" + cmName;
    }
    else {
      data['cmName'] = cmName;
    }

    if (data.type != 2) {
      data['id'] = undefined;
    }

    // 更新 renderList
    // dispatch({
    //   type: 'layout/edit/save/layoutCustom',
    //   data: {
    //     data,
    //     renderIndex,
    //   }
    // });

    dispatch({
      type: 'layout/saveLayoutCustom',
      data: {
        data,
        renderIndex,
        layoutConfigId: layoutConfig.id,
      }
    });
  }

  onChangeCmName(e) {
    this.setState({
      cmName: e.target.value,
    });
  }

  render() {
    const { editTool } = this.state;
    const props = assign({}, this.props);
    props.className =  (!props.edit ? ` ${styles.edit} ` : '') + props.className + (props.prefixCls || '');

    props.onMouseOver = this.onMouseOver;
    props.onMouseOut = this.onMouseOut;
    props.onClick = this.onClick;
    props.onDoubleClick = this.onDoubleClick;

    const toolCls = ` ${styles.tool} ` + (editTool ? ` ${styles.toolEdit} `: ' ');
    return (
      <div {...props} style={{paddingTop: props.renderIndex == 0 ? "20px" : "0px"}}>
        {props.children}
        <div className={toolCls}>
          <ul className={styles.leftTool}>
            <li>
              <label className={styles.moveUp} onClick={this.onMove.bind(this, 'up')} ><Icon type="arrow-up" /></label>
            </li>
            <li>
              <label className={styles.moveDown} onClick={this.onMove.bind(this, 'down')} ><Icon type="arrow-down" /></label>
            </li>
            <li><label className={styles.moveUp} onClick={this.onSaveLayout.bind(this)}>保存至模板</label></li>
            <li><label className={styles.moveUp} onClick={this.showModal.bind(this)}>保存至组件</label></li>
            <li><label className={styles.editAlt}>双击开始编辑</label></li>
            <li>
              <label className={styles.deleteAlt} onClick={this.onDelete.bind(this)} ><Icon type="delete"/></label>
            </li>
          </ul>
        </div>

        <Modal ref="modal"
               width={300}
               visible={this.state.visible}
               title="保存至组件"
               onOk={this.handleOk.bind(this)}
               onCancel={this.handleCancel.bind(this)}>

          <Row><label>组件名称</label></Row>
          <Row>
            <Input defaultValue={props.data.cmName} onChange={this.onChangeCmName.bind(this)} />
          </Row>
        </Modal>
      </div>
    );
  }
}

LayoutEdit.EditItem = EditItem;
LayoutEdit.EditBorder = EditBorder;

export default LayoutEdit;
