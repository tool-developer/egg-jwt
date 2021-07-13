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

JWT for egg plugin that supports server - and client-side custom authorization failure (return JSON data, or jump to the specified page).

## Install

```bash
$ npm i @tool-developer/egg-jwt --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.jwt = {
  enable: true,
  package: '@tool-developer/egg-jwt',
};
```

generate token, by payload include user id info, like this:
```
const payload = {
  uid
}
const token = this.app.jwt.sign(payload);
```

validate token, get user id info
```
const valid = this.app.jwt.verify(token);
const {uid} = valid;
```


## Configuration

```js
// {app_root}/config/config.default.js
exports.jwt = {
  secret:'',
  // enable middleware,default false
  enableMiddleware:false,
  //
  cookieTokenSet:'auth-token',
  //{[headerAuthorization]:'[headerAuthorizationScheme] [token]'}
  headerAuthorization:'authorization',
  headerAuthorizationScheme:'Bearer',
  //{[headerPassthroughSet]:false}
  headerPassthroughSet:'x-custom-passthrough',
  //
  // sign page route path
  signPageRoutePath:'',
  // 
  authOptions:{
    // passthrough
  },
  //
  // ctx.state.secret
  contextStateSecret:'secret',
  // ctx.state.user
  contextStateUser:'user',
  // jwt.sign options
  signOptions:{
    expiresIn:'2d'
  },
  // jwt.verify options
  verifyOptions:{},
  // ignore route path
  ignore:[]
};
```

see [config/config.default.js](config/config.default.js) for more detail.

### authOptions.passthrough
server authorization options
```
true: 
  return json data, like{code:401,info}

false:
  when set signPageRoutePath, to redirect signPageRoutePath.
  no set signPageRoutePath, to throw.

/a/b/c:
  to redirect the url.
```

client authorization options, by `headerPassthroughSet`, same as the authOptions.


### signOptions
signOptions, to see [jsonwebtoken jwt.sign](https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback)

signOptions.expiresIn
token expired time, default 2h, to see [zeit/ms](https://github.com/zeit/ms)


### verifyOptions
verifyOptions, to see [jsonwebtoken jwt.verify](https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback)


### ignore/match
to see [egg math and ignore](https://eggjs.org/en/basics/middleware.html#match-and-ignore)


## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/tool-developer/egg-jwt/issue).

## License

[MIT](LICENSE)
