'use strict';

/**
 * egg-jwt default config
 * @member Config#jwt
 * @property {String} [secret=''] - jwt.sign/jwt.verify secret string.
 * @property {Boolean} [enableMiddleware=false] - Enable middleware, default false.
 * @property {String} [cookieTokenSet='auth-token'] - Set the name of the cookie field.
 * @property {String} [headerAuthorization='authorization'] - Set the name of the header authorization field.
 * @property {String} [headerAuthorizationScheme='Bearer'] - Set the name of the header authorization scheme type.
 * @property {String} [headerPassthroughSet='x-custom-passthrough'] - Set the name of the header custom passthrough field..
 * @property {String} [signPageRoutePath=''] - To sign page view route path.
 * @property {Object} [authOptions={}] - Auth options.
 * @property {Object} [signOptions={}] - jwt.sign method options.
 * @property {Object} [verifyOptions={}] - jwt.verify method options.
 * @property {Array[String]} [ignore=[]] - Set to ignore route path.
 */
exports.jwt = {
  secret:'',
  // 是否启用中间件
  enableMiddleware:false,
  // cookie token设置字段名
  cookieTokenSet:'auth-token',
  // header授权字段名
  headerAuthorization:'authorization',
  // header授权scheme type，完整格式为:[headerAuthorization]:'[headerAuthorizationScheme] [token]'
  headerAuthorizationScheme:'Bearer',
  // 通过header控制授权跳转
  headerPassthroughSet:'x-custom-passthrough',
  //
  // 登录注册页路由
  signPageRoutePath:'',
  // 授权处理配置options
  authOptions:{
    // passthrough
  },
  //
  // ctx.state.secret
  contextStateSecret:'secret',
  // ctx.state.user
  contextStateUser:'user',
  //
  // jwt.sign方法调用options参数配置
  signOptions:{
    expiresIn:'2h'
  },
  // jwt.verify方法调用options参数配置
  verifyOptions:{},
  // ignore route path
  // ignore:[],
  // match
};
