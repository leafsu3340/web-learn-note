# Node基础
阻塞I/O
```
const fs = require('fs');
// 同步
const data = fs.readFileSync('./config.js');

// 异步调用
fs.readFile('./config.js', (err, data) => {
  if (err) throw err;
  console.log(data)
})

// promisify
const { promisify } = require('util');  // promisify,装饰方法，转换为promise写法
const readFile = promisify(fs.readFile);
readFile('./conf.js').then(data=>console.log(data))

```
