module.exports = {
  get url() {
    return this.request.url; // TAG this始终指向ctx这个对象
  },
  get body() {
    return this.response.body;
  },
  set body(val) {
    this.response.body = val;
  },
  get method() {
    return this.request.method;
  },
};
