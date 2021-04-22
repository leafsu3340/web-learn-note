/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-04-22 10:37:32
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-22 11:04:25
 */
const os = require('os')
const mem = os.freemem() / os.totalmem()
console.log(`内存占用率${(mem*100).toFixed(2)}%`);

// const repo = 'github:su37josephxia/vue-template';
// const desc = '../lib/vue-template';

// https://github.com/su37josephxia/kaikeba-code.git
const repo = 'github:su37josephxia/kaikeba-code';
const desc = '../repo/kaikeba-code';



const {clone} = require('./download')
clone(repo, desc);