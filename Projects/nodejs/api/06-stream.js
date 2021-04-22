/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-04-22 14:30:06
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-22 14:31:26
 */
const fs = require('fs')
const rs = fs.createReadStream('./img.png')
const ws = fs.createWriteStream('./img3.png')
rs.pipe(ws)