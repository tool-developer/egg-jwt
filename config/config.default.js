'use strict';

/**
 * egg-jwt default config
 * @member Config#jwt
 * @property {String} SOME_KEY - some description
 */
exports.jwt = {
  secret:'',
  enableMiddleware:false,
  //
  cookieTokenSet:'auth-token',
  //
  headerAuthorization:'authorization',
  headerAuthorizationScheme:'Bearer',
  headerPassthroughSet:'x-custom-passthrough',

  // 登录注册页路由
  signPageRoutePath:'',
  authOptions:{
    // passthrough
  },
  //
  verifyOptions:{},//jwt.verify options
  signOptions:{// jwt.sign options
    expiresIn:'2d'
  }
};
