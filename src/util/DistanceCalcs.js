/**
 * Created by sin on 16/8/12.
 */

const _mousePosition = (e) => {
  const x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
  const y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
  return {x: x, y: y};
};

const _elementOffsetPosition = (e) => {
  return {
    x: e.currentTarget.offsetLeft,
    y: e.currentTarget.offsetTop,
    w: e.currentTarget.offsetWidth,
    h: e.currentTarget.offsetHeight,
  };
};

const _elementOffset = (e) => {
  return {
    x: e.offsetLeft,
    y: e.offsetTop,
    w: e.offsetWidth,
    h: e.offsetHeight,
  };
};

const _elementClient = (e) => {
  return {
    x: e.clientLeft,
    y: e.clientTop,
    w: e.clientWidth,
    h: e.clientHeight,
  };
};


const _mouseInElementByPosition = (mouse, elementOffset) => {
  const offsetX = mouse.x - elementOffset.x;
  const offsetY = mouse.y - elementOffset.y;
  return {x: offsetX, y: offsetY };
};

const _elementAllPosition = (element) => {
  return {
    clientWidth: element.clientWidth,
    clientHeight: element.clientHeight,
    offsetWidth: element.offsetWidth,
    offsetHeight: element.offsetHeight,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight,
  }
};

export default {
  _mouseInElementByPosition,
  _mousePosition,
  _elementOffsetPosition,
  _elementOffset,
  _elementAllPosition,
  _elementClient
};





