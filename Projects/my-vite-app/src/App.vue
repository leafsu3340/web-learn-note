<template>
  <img alt="Vue logo" :class="classes.logo" :src="logo" />
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />

  <label>{{ t("language") }}</label>
  <select v-model="locale">
    <option value="en">en</option>
    <option value="zh">zh</option>
  </select>
  <p>{{ t("hello") }}</p>
</template>

<script setup>
// ! vue3实验特性
// 解析为地址
import logo from '@/assets/logo.png';
import HelloWorld from 'comps/HelloWorld.vue';

// 加载模块css
import classes from './App.module.css';

import { getCurrentInstance, ref, computed } from 'vue';

// 获取组件实例
const ins = getCurrentInstance();
console.log(ins);

function useI18n() {
  const locale = ref('zh');
  // 获取资源信息
  const i18n = ins.type.i18n;

  const t = () => {
    return computed(() => i18n[locale.vue][msg]).value;
  };
  return { locale, t };
}

const { locale, t } = useI18n();

fetch('/api-dev/users')
  .then(res => res.json())
  .then(users => console.log(users));

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "zh": {
    "language": "语言",
    "hello": "你好，世界！"
  }
}
</i18n>


<style scoped>
img {
  border: 1px solid black;
}
::placeholder {
  color: blue;
}
</style>
