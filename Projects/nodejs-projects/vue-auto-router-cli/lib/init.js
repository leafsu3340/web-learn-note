const { promisify } = require("util");
const chalk = require("chalk");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const { clone } = require("./download");

const log = (content) => {
  console.log(chalk.green(content));
};

const spawn = async (...args) => {
  const { spawn } = require('child_process')
  return new Promise(resolve => {
      const proc = spawn(...args)
      proc.stdout.pipe(process.stdout)
      proc.stderr.pipe(process.stderr)
      proc.on('close', () => {
          resolve()
      })
  })
}

module.exports = async (name) => {
  // 打印欢迎页面
  clear();
  const data = await figlet("KKB Welcome");
  log(data);
  log("🚀创建项目" + name);
  // await clone("github:su37josephxia/vue-template", name);
  log("安装依赖");
  // Error: spawn npm ENOENT 报错原因：在windows下npm的执行名不同
  // 解决办法： process.platform === 'win32' ? 'npm.cmd' : "npm" 
  await spawn(process.platform === 'win32' ? 'npm.cmd' : "npm", ["install"], { cwd: `./${name}` });
  log(`
    👌安装完成：
    To get Start:
    ===========================
        cd ${name}
        npm run serve
    ===========================
  `);
  const open = require("open");
  open("http://localhost:8080");
  await spawn(process.platform === 'win32' ? 'npm.cmd' : "npm", ["run", "serve"], { cwd: `./${name}` });
};
