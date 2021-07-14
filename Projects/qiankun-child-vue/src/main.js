import './public-path';
import Vue from "vue";
import App from "./App.vue";
import routes from "./router";
import store from "./store";
import VueRouter from "vue-router";

Vue.use(VueRouter);

Vue.config.productionTip = false;

let router = null;
let instance = null;

function render(props = {}) {
  const { container } = props;

  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app-vue' : process.env.BASE_URL,
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app boostraped');
}

export async function mount(props) {
  console.log('这是一个vue微应用', props);
    // 设置通讯
    Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange
    Vue.prototype.$setGlobalState = props.setGlobalState
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = ''
  instance = null;
  router = null;
}
