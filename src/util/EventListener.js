
import { _mouseInElementByPosition, _mousePosition, _elementOffsetPosition, _elementOffset } from './DistanceCalcs';

/**
 * Move 事件
 *
 * @param element 监听的节点
 * @param moveListener 监听的方法
 * @param moveBeforeListener 移动之前
 * @param moveAfterListener 移动之后
 * @param useCapture 使用事件冒泡
 */
const listenerMove = (element, moveListener, moveBeforeListener, moveAfterListener, useCapture) => {

  let move = false;
  let elementDown = false;
  // 触发时时表在节点中的位置
  let targetMouseInElementByPosition = {};
  // 触发节点 event 事件对象
  let targetElementEvent = {};
  // 事发节点 offset 属性
  let targetElementOffset = {};
  // 触发节点位置
  let targetElementPosition = {};
  element.addEventListener('mousedown', (e) => {
    targetElementEvent = e;
    targetElementOffset = _elementOffset(element);
    if (moveBeforeListener) moveBeforeListener(e, targetElementOffset);
    targetElementPosition = _mousePosition(targetElementEvent);
    targetMouseInElementByPosition = _mouseInElementByPosition(targetElementPosition, targetElementOffset);
    elementDown = true;
    move = false;
  });

  element.addEventListener('click', (e) => {
  });

  document.body.addEventListener('mouseup', (e) => {
    if (elementDown && moveAfterListener) {
      moveAfterListener(e, move);
      elementDown = false;
    }
  });

  document.body.addEventListener('mousemove', (e) => {
    if (elementDown) {
      move = true;
      // 当前鼠标在body中位置
      const mousePosition = _mousePosition(e);
      // 当前节点 offset 属性(实时更新)
      const currentElementOffset = _elementOffset(element);
      // 鼠标在节点位置
      moveListener(targetElementEvent, e, {
        mousePosition,
        currentElementOffset,
        targetElementPosition,
        targetElementOffset,
        targetMouseInElementByPosition,
      });
    }
  });
};

const listenerScroll = (element) => {


};


const preventDefault = (e, useCapture) => {
  if (useCapture) {
    e.preventDefault();
  }
};

export default { listenerMove };
