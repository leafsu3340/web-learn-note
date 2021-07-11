/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-07-11 13:59:10
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-07-11 14:00:45
 */
const { Controller } = require("egg")
class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    }
  }
  message(message) {
    this.ctx.body = {
      code: 0,
      message,
    }
  }
  error(message, code = -1, errors = {}) {
    this.ctx.body = {
      code,
      message,
      errors,
    }
  }
}

module.exports = BaseController