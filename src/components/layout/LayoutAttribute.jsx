
/**
 * Created by sin on 16/7/22.
 *
 * 编辑布局, 属性
 */

import React, { Component, PropTypes, createElement } from 'react';
import { Icon, Modal, Button } from 'antd';
import Dialog from 'rc-dialog';
import styles from './LayoutAttribute.less';

import { Clone, FieldCount } from '../../util/ObjectUtil';

// class item

class Item extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeleteRow: PropTypes.func,
    onInsert: PropTypes.func,
    onInsertText: PropTypes.func,
    type: PropTypes.string.isRequired,
  };

  onChange(item, e) {
    const { onChange } = this.props;
    item.value = e.target.value;
    if (onChange) onChange(item);
  };

  handlerDelete(field) {
    const { onDelete } = this.props;
    if (onDelete) onDelete(field);
  }

  handlerDeleteRow(field) {
    const { onDeleteRow } = this.props;
    if (onDeleteRow) onDeleteRow(field);
  }

  handlerInsert() {
    const { onInsert } = this.props;
    if (onInsert) onInsert();
  };

  handlerInsertText() {
    const { onInsertText } = this.props;
    if (onInsertText) onInsertText();
  }

  handlerInsertImage() {
    const { onInsertImage } = this.props;
    if (onInsertImage) onInsertImage();
  }

  handlerInsertButton() {
    const { onInsertButton } = this.props;
    if (onInsertButton) onInsertButton();
  }

  handlerSetting(field, e ) {
    const { dispatch } = this.props;
    field['more'] = field.more ? field.more : {};
    dispatch({
      type: 'layout/edit/handlerFocus',
      data: {
        more: field['more'],
        moreTitle: field['title'],
      }
    });

  }

  render() {
    const { items = {}, type} = this.props;
    let itemNode = [];

    for (let field in items) {
      const { title, titleDesc, component, value } = items[field];

      let row = createElement(component,
        { className: `${styles.bottomSty}`,
          defaultValue: value,
          onChange: this.onChange.bind(this, items[field]),
        });


      let customBtn = [];
      if (type == 'custom') {
        customBtn.push(<i className={styles.iconBtn} onClick={this.handlerDelete.bind(this, field)} key={`${field}-delete`} ><Icon type="delete" /></i>);
        customBtn.push(<i className={styles.iconBtn} onClick={this.handlerSetting.bind(this, items[field])} key={`${field}-setting`} ><Icon type="setting" /></i>);
      }

      itemNode.push(
        <li key={ field + '-' + Math.random() }>
          <p>
            { title } <span> { titleDesc } </span>
            {customBtn}
          </p>
          { row }
        </li>
      );
    }


    let optionsBtn = null;
    if (type == 'custom') {
      optionsBtn = (
        <li>
          <i className={styles.iconBtn} onClick={this.handlerInsert.bind(this)}><Icon type="plus" /></i>
          <i className={styles.iconBtn} onClick={this.handlerDeleteRow.bind(this)}><Icon type="minus" /></i>
          <i className={styles.iconBtn} onClick={this.handlerInsertText.bind(this)}><Icon type="file-text" /></i>
          <i className={styles.iconBtn} onClick={this.handlerInsertImage.bind(this)}><img className={styles.editImgIcon} src="http://yyssb.ifitmix.com/web/editAttribute/image%40logo.svg" /></i>
          <i className={styles.iconBtn} onClick={this.handlerInsertButton.bind(this)}><img className={styles.editImgIcon} src="http://yyssb.ifitmix.com/web/editAttribute/button%40logo.svg" /></i>
        </li>
      );
    }

    return (
      <ul>
        { itemNode }
        { optionsBtn }
      </ul>
    );
  }

}


// class module

class Group extends Component {

  static propTypes = {
    title: PropTypes.string,
    index: PropTypes.number.isRequired,
  };

  render() {
    const { title = '', index, children,  ...other } = this.props;

    let newTitle = title.replace(/\$\{index\}/i, index + 1);
    return (
      <li { ...other }>
        <h4>{ newTitle }</h4>
        { children }
      </li>
    );
  }
}


// class attribute

class LayoutAttribute extends Component {

  componentDidUpdate() {
    this.newItem = this.props.editAttr;
  }

  static propTypes = {
    editAttr: PropTypes.object.isRequired
  };

  handleOk = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'layout/edit/hide',
    });

    this.handleUpdateItem();
  };

  handleUpdateItem() {
    const { dispatch } = this.props;

    dispatch({
      type: 'layout/edit/handlerOk',
      data: {
        newItem: this.newItem
      }
    });
  }

  handleCancel = (e) => {
  };

  handleDelete(index, type, field) {
    const { dispatch } = this.props;

    if (type === 'required' || type === 'custom') {
      let item = this.newItem['dataGroup'][index][type];
      delete item[field];
    }

    this.handleUpdateItem();
  };

  handleDeleteRow(index, type) {
    const { dispatch } = this.props;
    if (type === 'required' || type === 'custom') {
      this.newItem['dataGroup'].splice(index, 1);
    }
    this.handleUpdateItem();
  }

  handleItemChange(index, type, newItem) {
    if (type === 'required' || type === 'custom')
      this.newItem['dataGroup'][index][type][newItem.field] = newItem;
  };

  handleInsert(index) {
    this.newItem['dataGroup'].splice((index + 1), 0, Clone(this.newItem['dataGroup'][index]));
    this.handleUpdateItem();
  };

  handleInsertText(index) {
    let group = this.newItem['dataGroup'][index];
    let custom = group['custom'] == undefined ? {} : group['custom'];
    let customLength = (FieldCount(custom) + 1);

    let textItem = {
      field: `text${customLength}`,
      title: `文本${customLength}`,
      titleDesc: '',
      component: 'textarea',
      value:'',
      placeholder: '',
      type:'text',
      drag: true,
      changeSize: true,
    };

    custom['text' + customLength] = textItem;
    group['custom'] = custom;
    this.handleUpdateItem();
  }

  handleInsertImage(index) {
    let group = this.newItem['dataGroup'][index];
    let custom = group['custom'] == undefined ? {} : group['custom'];
    let customLength = (FieldCount(custom) + 1);

    let imageItem = {
      field: `image${customLength}`,
      title: `图片${customLength}`,
      titleDesc: '',
      component: 'textarea',
      value:'',
      placeholder: '',
      type:'image',
      drag: true,
      changeSize: true,
    };

    custom['image' + customLength] = imageItem;
    group['custom'] = custom;
    this.handleUpdateItem();
  }

  onInsertButton(index) {
    let group = this.newItem['dataGroup'][index];
    let custom = group['custom'] == undefined ? {} : group['custom'];
    let customLength = (FieldCount(custom) + 1);

    let buttonItem = {
      field: `button${customLength}`,
      title: `按钮${customLength}`,
      titleDesc: '',
      component: 'textarea',
      value:'按钮',
      placeholder: '',
      type:'button',
      drag: true,
      changeSize: true,
    };

    custom['button' + customLength] = buttonItem;
    group['custom'] = custom;
    this.handleUpdateItem();
  }

  renderAttribute() {
    const { dispatch, editAttr } = this.props;
    const { cmImg, cmName, custom, required, dataGroup } = editAttr;
    if (!dataGroup) return;
    return dataGroup.map((group, index) => {
      return (
        <Group key={ index }
               index={ index }
               title={ group.title } >
          <Item dispatch={dispatch} key={ `required-${index}` }
                type="required"
                onChange={this.handleItemChange.bind(this, index, 'required')}
                onDelete={this.handleDelete.bind(this, index, 'required')}
                items={ group.required } />
          <Item dispatch={dispatch} key={ `custom-${index}` }
                type="custom"
                onChange={this.handleItemChange.bind(this, index, 'custom')}
                onDelete={this.handleDelete.bind(this, index, 'custom')}
                onDeleteRow={this.handleDeleteRow.bind(this, index, 'custom')}
                onInsert={this.handleInsert.bind(this, index)}
                onInsertText={this.handleInsertText.bind(this, index)}
                onInsertImage={this.handleInsertImage.bind(this, index)}
                onInsertButton={this.onInsertButton.bind(this, index)}
                groupIndex={index}
                items={ group.custom } />
        </Group>
      );
    });
  }

  render() {
    const { edit } = this.props;
    let renderAttribute = this.renderAttribute();

    let dialogProps = {
      prefixCls: `ant-modal`,
      onClose: this.handleCancel,
      closable: false,
      transitionName: 'zoom',
      maskTransitionName: 'fade',
      confirmLoading: false,
      maskClosable: true,
      visible: edit,
      bodyStyle: {padding: '0px'},
    };

    return (
      <Dialog {...dialogProps}>
        <div className={styles.attr}>
          <div className={styles.title}>
            <Icon type="file-text" /> 编辑
          </div>
          <div className={styles.body}>
            <ul>
              { renderAttribute }
            </ul>
          </div>
          <div className={styles.footer}>
            <Button type="primary" size="small" onClick={this.handleOk} className={styles.btnPrimary}>确定</Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

LayoutAttribute.Item = Item;
LayoutAttribute.Group = Group;

export default LayoutAttribute;
