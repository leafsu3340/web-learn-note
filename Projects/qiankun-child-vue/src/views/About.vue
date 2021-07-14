<template>
  <div class="about">
    <h1>This is an about page</h1>
    <br />
    <button @click="testFn">测试事件</button>
    <br />
    {{'this is my name --- '+name}}
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      name: 'init name'
    };
  },
  mounted() {
    // 增加state监听，当mt数据发生变化的时候，我们修改name，体现在页面上
    this.$onGlobalStateChange((state, prev) => {
      if (state.mt !== prev.mt) {
        this.name = state.mt;
      }
    });
  },
  methods: {
    testFn() {
      this.$setGlobalState({
        mt: this.name + '-'
      });
    }
  }
};
</script>
