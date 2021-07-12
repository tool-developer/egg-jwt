'use strict';

/**
 * egg-jwt default config
 * @member Config#jwt
 * @property {String} SOME_KEY - some description
 */
exports.jwt = {
  secret:'',
  enable:false,
  cookieKey:'token',
  headerAuthorizationKey:'authorization',
  headerAuthorizationSchemePfefix:'Bearer',
  //
  headerPassthroughKey:'x-custom-passthrough',

  //
  signPageView:'',
  auth:{
    // passthrough
  },
  //
  verifySecret:'',
  verify:{},//
};
