module.exports = {
  get url() {
    return this.req.url; // TAG this始终指向request这个对象
  },
  get method() {
    return this.req.method.toLowerCase();
  },
};
