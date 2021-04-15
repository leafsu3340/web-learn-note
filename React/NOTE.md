1.JSX本身是一种语法糖，会被 Babel 的 transform-react-jsx 插件转换为 JS 代码

2.虚拟DOM本质上就是一个JS对象，只不过是一个真实DOM的映射，能反应出真实DOM的 tag , attributes , children等信息。结合diff 算法，用虚拟DOM描述真实DOM有利于在DOM更新时提升更新效率。

3.React.createElement的主要作用就是创建虚拟DOM
4.ReactDOM.render方法接受一个JSX参数(转化后就是vdom)和一个挂载元素

- redux-saga
redux中间件  解决异步问题

es6 Generator:解决回调地域，通过 yield 关键字，可以让函数的执行流挂起。

```
function* geo() {
  const post = yield $.getJSON("https://jsonplaceholder.typicode.com/posts");
  console.log(post[0].title);
  const users = yield $.getJSON("https://jsonplaceholder.typicode.com/users");
  console.log(users[0]);
}

run(geo);

function run(geo) {
  const Geo = geo(); 
  function handle(yielded) {
    if(!yielded.done) {
      yielded.value.then(function(data){
        return handle(Geo.next(data));
      })
    }
  }
  handle(Geo.next());
}
```
yield与yield*区别: yield是给什么返回什么，yield会继续向下请求，知道没的提取为止。

```
function* user() {
  yield takeEvery('FETCH_REQUEST', fetch_user); // 监听 FETCH_REQUEST action
}

// 并发发送请求
function* fetch_user() {
  const [users, todos] = [
    yield fork(fetchResource, 'https://jsonplaceholder.typicode.com/users'),
    yield fork(fetchResource, 'https://jsonplaceholder.typicode.com/todos')
  ]
}


function* fetchResource(resource) {
  const data = yield call(axios.get, resource);
  
  // 获取 call 数据，触发成功后的 action
  yield put({ type: 'FETCH_SUCESS', uu: data });
  
}
```

当页面触发了对应的 action 时，除了会去寻找对应的 reducer（找不到也没事），进行操作；也会触发 saga 监听的 action，进行异步请求等操作。

- fork  创建一个新进程或线程，并发发送请求 （非阻塞）
- call  发送api请求（阻塞）
- all   跟 fork 一样，同时并发多个 action，没有顺序。
- put   发送对应的 dispatch，触发对应的 action
- takeEvery  监听对应的 action；每一次 dispatch 都会触发；例如：点击一个新增的按钮，2s 后触发新增动作，在2s内不断点击按钮，这时候，每一次点击，都是有效的。
- takeLatest  监听对应的 action；只会触发最后一次 dispatch；例如：点击一个新增的按钮，2s 后触发新增动作，在2s内不断点击按钮，这时候，只有最后一次点击是有效的。



