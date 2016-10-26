/**
 * Created by sin on 16/7/20.
 */

import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';
import { Clone } from '../util/ObjectUtil';

const layout = handleActions({
  ['layout/render/add'](state, action) {
    const { renderList } = state;
    renderList.push(Clone(action.data));
    return { ...state,  ...renderList };
  },
  ['layout/render/delete'](state, action) {
    const { renderList } = state;
    renderList.splice(action.renderIndex, 1);
    return { ...state };
  },
  ['layout/render/move'](state, action) {
    const { renderList } = state;
    const { renderIndex, targetIndex } = action.data;
    renderList[renderIndex] = renderList.splice(targetIndex, 1, renderList[renderIndex])[0];
    return { ...state };
  },
  ['layout/attr/success'](state, action) {
    const { renderAttr } = state;
    const { cmName } = action.data;
    renderAttr[cmName] = action.data;
    return { ...state };
  },


  ['layout/showEditMenu'](state, action) {
    return { ...state, ...{editMenu: true} };
  },
  ['layout/closeEditMenu'](state, action) {
    return { ...state, ...{editMenu: false} };
  },


  ['layout/showTools'](state) {
    return { ...state, ...{showTools: true} };
  },
  ['layout/closeTools'](state) {
    return { ...state, ...{showTools: false} };
  },
  ['layout/tools/query/success'](state, action) {
    return { ...state, ...{toolList: action.data} };
  },


  ['layout/edit/show'](state, action) {
    const { data, editIndex } = action.data;
    return { ...state, ...{edit: true, editIndex: editIndex, editAttr: data} };
  },
  ['layout/edit/hide'](state) {
    return { ...state, ...{edit: false} };
  },
  ['layout/edit/handlerOk'](state, action) {
    return { ...state, ...{editAttr: action.data.newItem} };
  },
  ['layout/edit/handlerFocus'](state, action) {
    return { ...state, ...{more: action.data.more, moreShow: true, moreTitle: action.data.moreTitle} };
  },


  ['layout/config/show'](state) {
    return { ...state, ...{config: true} };
  },
  ['layout/config/hide'](state) {
    return { ...state, ...{config: false} };
  },
  ['layout/config/query/success'](state, action) {
    const { renderList, layoutConfig } = action.data;
    return {...state, ...{layoutConfig: layoutConfig, renderList: renderList}};
  },


  ['layout/more/update'](state, action) {
    return {...state, ...{more: action.data}};
  },
  ['layout/edit/font/update'](state, action) {
    const {field, index, renderIndex, newLayoutInEdit} = action.data;
    const {renderList} = state;
    renderList[renderIndex]['dataGroup'][index]['custom'][field.field]['layoutInEdit'] = newLayoutInEdit;
    return {...state};
  },
  ['layout/edit/font/size'](state, action) {
    const {field, index, renderIndex, size} = action.data;
    const {renderList} = state;
    const attribute = renderList[renderIndex]['dataGroup'][index]['custom'][field.field];
    let layoutInEdit = {...attribute.layoutInEdit, ...{fontSize: size}};
    renderList[renderIndex]['dataGroup'][index]['custom'][field.field]['layoutInEdit'] = layoutInEdit;
    return {...state};
  },
  ['layout/edit/animation/update'](state, action) {
    const {field, index, renderIndex, animation} = action.data;
    const {renderList} = state;
    const attribute = renderList[renderIndex]['dataGroup'][index]['custom'][field.field];
    renderList[renderIndex]['dataGroup'][index]['custom'][field.field]['animation'] = animation;

    return {...state};
  },
  ['layout/edit/color/update'](state, action) {
    const {field, index, renderIndex, color} = action.data;
    const {renderList} = state;
    const attribute = renderList[renderIndex]['dataGroup'][index]['custom'][field.field];
    const layoutInEdit = {...attribute.layoutInEdit, ...{color: color}};
    renderList[renderIndex]['dataGroup'][index]['custom'][field.field]['layoutInEdit'] = layoutInEdit;
    return {...state};
  },
  ['layout/edit/background/color/update'](state, action) {
    const {field, index, renderIndex, color} = action.data;
    const {renderList} = state;
    const attribute = renderList[renderIndex]['dataGroup'][index]['custom'][field.field];
    const layoutInEdit = {...attribute.layoutInEdit, ...{backgroundColor: color}};
    renderList[renderIndex]['dataGroup'][index]['custom'][field.field]['layoutInEdit'] = layoutInEdit;
    return {...state};
  },
  ['layout/edit/position/update'](state, action) {
    const {field, index, renderIndex, left, top, height, width} = action.data;
    const {renderList} = state;
    const attribute = renderList[renderIndex]['dataGroup'][index]['custom'][field.field];
    const position = {...attribute.position, ...{left: left, top: top, height: height, width: width}};
    renderList[renderIndex]['dataGroup'][index]['custom'][field.field]['position'] = position;
    return {...state};
  },
  ['layout/edit/max/update'](state, action) {
    const {field, index, renderIndex, maxType} = action.data;
    const {renderList} = state;
    const attribute = renderList[renderIndex]['dataGroup'][index]['custom'][field.field];
    const maxValue = 100;
    let widthUnit = '%';

    if (attribute.position && attribute.position[`${maxType}Unit`]) {
      widthUnit = null;
    }

    const position = {...attribute.position, ...{[maxType]: `${maxValue}${widthUnit}`, left: 0, widthUnit: widthUnit}};
    renderList[renderIndex]['dataGroup'][index]['custom'][field.field]['position'] = position;
    return {...state};
  },
  ['layout/edit/link/update'](state, action) {
    const {field, index, renderIndex, value} = action.data;
    const {renderList} = state;
    const attribute = renderList[renderIndex]['dataGroup'][index]['custom'][field.field];
    const newAttribute = {...attribute, ...{link: value}};
    renderList[renderIndex]['dataGroup'][index]['custom'][field.field] = newAttribute;

    return {...state};
  },

  ['layout/edit/more/update'](state, action) {
    const {field, index, renderIndex, more} = action.data;
    const {renderList} = state;
    const attribute = renderList[renderIndex]['dataGroup'][index]['custom'][field.field];
    const newLayoutInEdit = {...attribute['layoutInEdit'], ...more};

    renderList[renderIndex]['dataGroup'][index]['custom'][field.field]['layoutInEdit'] = newLayoutInEdit;
    return {...state};
  },
  ['layout/edit/save/layoutCustom'](state, action) {
    // 替换 renderList
    const {renderIndex, data} = action.data;
    console.info('layoutCustom',action);
    state.renderList[renderIndex] = data;
    return {...state};
  },

}, {
  openEdit: true, // 真气编辑模式
  edit: false, // 开启编辑 attribute
  editIndex: null, // 开启编辑
  editAttr: {}, // 编辑属性
  showTools: true, // 显示编辑工具 控件
  editMenu: true, // 编辑菜单 关闭 or 打开
  toolList: [], // 布局(控件) 列表
  renderList: [], // 渲染 集合
  config: false, // 开启 config 配置
  layoutConfig: {
    id: null, // update 才有 configId
    uri: '',
    title: '',
    keywords: '',
    description: '',
    layoutConfigs: [], // 这个就是 renderList
  },
  moreShow: false,
  moreTitle: '',
  more: {
    position: {
      align: '', // left right center
      width: '0',
      offset: {
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
      }
    },
    animation: {
      title: '',
      duration: 450,
      delay: 0,
      repeatDelay: 0,
      yoyo: true,
      config: {},
    }
  }
});

export default layout;
