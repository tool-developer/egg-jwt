# @tool-developer/egg-jwt

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@tool-developer/egg-jwt.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@tool-developer/egg-jwt
[travis-image]: https://img.shields.io/travis/eggjs/@tool-developer/egg-jwt.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/@tool-developer/egg-jwt
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/@tool-developer/egg-jwt.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/@tool-developer/egg-jwt?branch=master
[david-image]: https://img.shields.io/david/eggjs/@tool-developer/egg-jwt.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/@tool-developer/egg-jwt
[snyk-image]: https://snyk.io/test/npm/@tool-developer/egg-jwt/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/@tool-developer/egg-jwt
[download-image]: https://img.shields.io/npm/dm/@tool-developer/egg-jwt.svg?style=flat-square
[download-url]: https://npmjs.org/package/@tool-developer/egg-jwt



## 开启插件

```js
// config/plugin.js
exports.jwt = {
  enable: true,
  package: '@tool-developer/egg-jwt',
};
```

## 使用场景
基于egg的jwt插件，支持server侧和client侧自定义授权失败(返回json数据，还是跳转进入指定页面)，并且token会自动续期。

通过enableMiddleware设置为true的方式，token和用户关联信息，会被绑定到ctx.state.user上(可以通过contextStateUser指定字段，默认是user)。

注册登录中，只需要将uid和token关联，将生成的token字段暴露给用户端，如下即可得到token:
```
const payload = {
  uid
}
const token = this.app.jwt.sign(payload);
```

不引入中间件的情况下，也可以通过verify方法进行解码得到uid
```
const valid = this.app.jwt.verify(token);
const {uid} = valid;
```


## 详细配置
```
// {app_root}/config/config.default.js
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
  // 通过ctx.state[options.contextStateSecret]获取secret值
  contextStateSecret:'secret',
  // 将解码后数据绑定到ctx.state[options.contextStateUser]上
  contextStateUser:'user',
  //
  // jwt.sign方法调用options参数配置
  signOptions:{
    expiresIn:'2d'
  },
  // jwt.verify方法调用options参数配置
  verifyOptions:{},
  // ignore route path
  ignore:[]
};
```
请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

### authOptions.passthrough
服务端控制授权跳转
```
true: 
  返回json数据，如{code:401,info}

false:
  如果设置有signPageRoutePath, 跳转进入对应设置页面。
  没有设置，会进入异常。

/a/b/c:
  如果是页面路由方式，会跳转进入该路由地址。
```

客户端可以通过配置`headerPassthroughSet`对应字段进行控制页面跳转, 同authOptions配置效果一样。


### signOptions
对应jwt.sign方法options, 参考[jsonwebtoken jwt.sign](https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback)

signOptions.expiresIn
token过期时间设置，默认2h，参考[zeit/ms](https://github.com/zeit/ms)

```
2d: 2天
2h: 2小时
```

### verifyOptions
对应jwt.verify方法options, 参考[jsonwebtoken jwt.verify](https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback)

### ignore/match
属于egg框架本身具有的能力，参考[egg match 和 ignore](https://eggjs.org/zh-cn/basics/middleware.html#match-和-ignore)


## 单元测试

<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->

## 提问交流

请到 [egg issues](https://github.com/tool-developer/issue) 异步交流。

## License

[MIT](LICENSE)
