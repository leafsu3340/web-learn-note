/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-04-22 11:08:59
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-22 14:29:08
 */
const buf1 = Buffer.alloc(10) // 创建长度为10字节，以0填充的Buffer
console.log(buf1);

// 创建一个Buffer包含ascii.
const buf2 = Buffer.from('a')
console.log(buf2,buf2.toString())

// 创建Buffer包含UTF-8字节
const buf3 = Buffer.from('中文')
console.log(buf3)

// 合并Buffer
const buf4 = Buffer.concat([buf3, buf2])
console.log(buf4);
