1.JSX本身是一种语法糖，会被 Babel 的 transform-react-jsx 插件转换为 JS 代码

2.虚拟DOM本质上就是一个JS对象，只不过是一个真实DOM的映射，能反应出真实DOM的 tag , attributes , children等信息。结合diff 算法，用虚拟DOM描述真实DOM有利于在DOM更新时提升更新效率。

3.React.createElement的主要作用就是创建虚拟DOM
4.ReactDOM.render方法接受一个JSX参数(转化后就是vdom)和一个挂载元素
