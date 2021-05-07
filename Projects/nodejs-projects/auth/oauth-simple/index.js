const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const app = new Koa();
const axios = require('axios')
const querystring = require('querystring')

app.use(static(__dirname + '/'));
const config = {
    client_id: '73a4f730f2e8cf7d5fcf',  // 需要在B站备案，防止滥用
    client_secret: '74bde1aec977bd93ac4eb8f7ab63352dbe03ce48'
}
// A站：第三方网站（当前服务）   B站：系统，授权网站（github）
router.get('/github/login', async (ctx) => {
    var dataStr = (new Date()).valueOf();
    // 1. 重定向到认证接口,并配置参数,A站向B站请求获取授权码
    var path = "https://github.com/login/oauth/authorize";
    path += '?client_id=' + config.client_id;

    //转发到授权服务器
    ctx.redirect(path);
})

// B站将会返回页面，用户授权后，向A站发送授权码

// 2. A站获取到授权码，接着去获取令牌
router.get('/auth/github/callback', async (ctx) => {
    console.log('callback..')
    const code = ctx.query.code;
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    }
    // 3. A站向B站获取令牌
    let res = await axios.post('https://github.com/login/oauth/access_token', params)
    const access_token = querystring.parse(res.data).access_token
    // 4. A站有了令牌后，就可以向B站请求获取信息了
    res = await axios.get('https://api.github.com/user?access_token=' + access_token)
    console.log('userAccess:', res.data)
    ctx.body = `
        <h1>Hello ${res.data.login}</h1>
        <img src="${res.data.avatar_url}" alt=""/>
    `

})

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(7001);