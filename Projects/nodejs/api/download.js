/*
 * @Description:
 * @Author: dengxiaodong
 * @Date: 2021-04-22 10:41:15
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-22 10:51:13
 */
module.exports.clone = async function clone(repo, desc) {
  const { promisify } = require("util"); // 自带模块
  const download = promisify(require("download-git-repo"));

  const ora = require("ora"); // 打印进度
  const process = ora(`正在下载....${repo}`);
  process.start();
  try {
    await download(repo, desc);
  } catch (error) {
    process.fail();
  }

  process.succeed();
};
