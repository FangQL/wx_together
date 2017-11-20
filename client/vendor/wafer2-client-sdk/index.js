var constants = require('./lib/constants');
var login = require('./lib/login');
var Session = require('./lib/session');
var request = require('./lib/request');
var Tunnel = require('./lib/tunnel');

var exports = module.exports = {

    // 登录
    login: login.login,

    // 设置登录URL
    setLoginUrl: login.setLoginUrl,

    // 登录错误
    LoginError: login.LoginError,

    // 清除Session
    clearSession: Session.clear,

    // 发送Request
    request: request.request,

    // 请求错误
    RequestError: request.RequestError,

    // 信道
    Tunnel: Tunnel,
};

// 导出错误类型码
Object.keys(constants).forEach(function (key) {
    if (key.indexOf('ERR_') === 0) {
        exports[key] = constants[key];
    }
});