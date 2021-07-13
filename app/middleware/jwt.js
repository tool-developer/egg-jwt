const { schemePrefix, JwtMsg } = require('../../app.config');
//
const resolveFromAuthorizationHeader = (authorization,prefix) => {
  if (typeof authorization !== 'string' || !authorization) {
    //
    return ''
  }
  //
  const parts = authorization.split(/ +/u)
  //
  if (parts.length === 2) {
    const [scheme, credentials] = parts
    //
    if (scheme && scheme === (prefix || schemePrefix)) {
      //
      return credentials
    }
  }

  return ''
}
const resolveFromCookies = (cookies, cookieTokenSet) => {
  //
  const token = cookieTokenSet && cookieTokenSet.length > 0
    ? cookies.get(cookieTokenSet)
    : ''
  //
  return (token || '').trim();
}
//
const resolveToken = (ctx, options = {}) => {
  // 从cookie中获取
  let token = resolveFromCookies(ctx.cookies,options.cookieTokenSet)
  //
  if (!token) {
    // 
    let authorization = (ctx.header && (ctx.header[options.headerAuthorization]  || ctx.header.authorization) || '').trim();
    //
    if (authorization) {
      // 从header中获取
      token = resolveFromAuthorizationHeader(authorization,options.headerAuthorizationScheme)
    } else {
      //
      token = ''
    }
  }
  //
  return token ? token : ''
}
//
const parseSecret = (input) => {
  const ret = new Set();
  //
  if (typeof input === 'string') {
    //
    ret.add(input)
  } else if (Buffer.isBuffer(input)) {
    //
    ret.add(input)
  } else if (Array.isArray(input)) {
    //
    input.forEach((secret) => {
      //
      ret.add(secret)
    })
  }
  //
  return ret
}

//
const genVerifySecretSet = (signSecret, ctxSecret) => {
  //
  if ((typeof ctxSecret === 'string' || Buffer.isBuffer(ctxSecret)) && ctxSecret) {
    //
    return new Set([ctxSecret])
  }
  //
  const signSet = parseSecret(signSecret)
  const ret = new Set([...signSet])
  //
  return ret
}

//
const validateToken = (jwt, token, secretSet, options) => {
  if (!secretSet.size) {
    //
    throw new Error(JwtMsg.VSceretInvalid)
  }
  if (typeof jwt.verify !== 'function') {
    //
    throw new TypeError(JwtMsg.VerifyNotFunc)
  }
  //
  let ret = null;
  const msgs = [];
  //
  Array.from(secretSet).some((secret) => {
    try {
      ret = jwt.verify(token, secret, options.verifyOptions)
      //
      return true
    }
    catch (ex) {
      const ss = typeof secret === 'string' ? secret : secret.toString()
      const start = ss.slice(0, 2)
      let end = ss
      //
      if (!process.env.CI) {
        //
        end = ss.length > 5 ? ss.slice(-2) : '**'
      }
      //
      msgs.push(`Error during verify: with secret "${start}****${end}"`)
    }
  })

  if (ret === null) {
    //
    throw new Error(JwtMsg.TokenValidFailed + ':\n' + msgs.join('\n'))
  }
  //
  return ret
}
//
const parseByPassthrough = (ctx, input) => {
  switch (typeof input) {
    case 'boolean':
      //
      return input

    case 'string':
      //
      return input

    case 'function':
      //
      return input(ctx)

    default:
      //
      return false
  }
}


module.exports = options => {
  //
  return async function jwt(ctx, next) {
    //
    ctx.state = ctx.state || {};
    //
    try {
      const token = resolveToken(ctx, options);
      if (!token) {
        //
        return ctx.throw(401, JwtMsg.TokenNotFound)
      }
      //
      const secretSet = genVerifySecretSet(
        options.secret,
        ctx.state && ctx.state ? ctx.state.secret : void 0)
      //
      const decoded = validateToken(ctx.app.jwt, token, secretSet, options);
      //
      ctx.state.user = decoded;
    } catch (e) {
      //
      const { passthrough } = options.authOptions || {};
      const headerPassthrough = ctx.header[options.headerPassthroughSet] || ctx.header['x-custom-passthrough'];
      const pass = headerPassthrough !== undefined ? headerPassthrough : await parseByPassthrough(ctx, passthrough);
      // 返回json数据
      if (pass === true) {
        //
        const info = options.debug === true ? e.message : JwtMsg.AuthFailed
        //
        return ctx.body = {
          code:401,
          info
        };
      }else if(typeof pass === 'string' && pass.length > 0){
        // 进入指定页面
        return ctx.redirect(pass)
      }else if(options.signPageRoutePath){
        // 进入登录页面
        return ctx.redirect(options.signPageRoutePath)
      }else{
        const msg = debug === true ? e.message : JwtMsg.AuthFailed
        // 抛出异常
        return ctx.throw(401, msg, { originalError:e })
      }
    }
    //
    return next();
  }
}