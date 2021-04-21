// vnode 虚拟dom
// node 真实dom节点

function render(vnode, container) {
  // console.log("vnode", vnode); //sy-log

  // vnode -> node
  const node = createNode(vnode);
  // node插入到container中
  container.appendChild(node);
}

function isString(sth) {
  return typeof sth === "string";
}

// 根据vnode，生成node
function createNode(vnode) {
  let node = null;
  const { type } = vnode;
  // todo 生成node
  // 原生标签 div a span
  if (isString(type)) {
    node = updateHostComponent(vnode);
  } else if (typeof type === "function") { // 考虑嵌套组件的情况
    node = type.prototype.isReactComponent   // 类组件原型上的isReactComponent = {}  (历史遗留问题写成对象)
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else if (type === undefined) {
    // 文本
    node = updateTextCompoent(vnode);
  } else {
    node = updateFragmentComponent(vnode);
  }

  return node;
}

// fragment  原生js方法： document.createDocumentFragment    react源码：使用fiber
function updateFragmentComponent(vnode) {
  const node = document.createDocumentFragment();
  reconcileChildren(node, vnode.props.children);
  return node;
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((k) => k !== "children")
    .forEach((k) => (node[k] = nextVal[k]));
}

// 原生标签
// vnode - 虚拟dom
// node  - 真是dom
function updateHostComponent(vnode) {
  const { type, props } = vnode;
  const node = document.createElement(type);
  // 更新属性
  updateNode(node, props);
  reconcileChildren(node, props.children);
  return node;
}

// 文本
function updateTextCompoent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

function updateFunctionComponent(vnode) {
  const { type, props } = vnode; // 函数组件：type是构造函数
  const vvnode = type(props);
  // console.log('函数组件-------', vvnode)
  const node = createNode(vvnode);
  return node;
}

function updateClassComponent(vnode) {
  const { type, props } = vnode;
  const instance = new type(props);  // 类组件：type是类
  const vvnode = instance.render();
  // console.log('类组件-----', vvnode)
  const node = createNode(vvnode);
  return node;
}

// 最佳的吧，但是做的也是遍历子节点
function reconcileChildren(parentNode, children) {
  let newChildren = Array.isArray(children) ? children : [children]; // TAG children只有数组和非数组

  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    // child 是 vnode，
    // child -> node ， 插入到 parentNode
    render(child, parentNode);
  }
}
export default { render };
