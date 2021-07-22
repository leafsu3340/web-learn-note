<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <el-button @click="onClick">点击</el-button>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {
    onClick() {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          });
        }
      });
    }
  },
  mounted(){
    console.log('子页面方法');
    // document.domain='localhost'
    // console.log('子页面方法', window.parent);
      window.parent.postMessage('MessageFromIframePage', '*')
      console.log(window.location);

    // window.parent.postMessage({ msg: 'MessageFromIframePage' }, '*')
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
