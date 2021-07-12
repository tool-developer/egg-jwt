const assert = require('assert');
const jwt = require('jsonwebtoken');
//
const { PLUGIN_NAME } = require('../../app.config');
//
const JWT = Symbol('Application#jwt')
//
module.exports = {
  get jwt() {
    //
    if (!this[JWT]) {
      const config = this.config[PLUGIN_NAME];
      //
      assert(config && Object.keys(config).length, `[egg-${PLUGIN_NAME}] config empty`)
      //
      this[JWT] = {};
      this[JWT].sign = (payload, secretOrPrivateKey, options) => {
        const secret = secretOrPrivateKey || config.secret;
        const opts = options ? { ...config.sign, ...options } : { ...config.sign };
        //
        return jwt.sign(payload, secret, opts);
      }
      //
      this[JWT].verify = (token, secretOrPrivateKey, options) => {
        const secret = secretOrPrivateKey || config.secret;
        const opts = options ? { ...config.verify, ...options } : { ...config.verify };
        //
        return jwt.verify(token, secret, opts);
      }
      //
      this[JWT].decode = (token) => {
        let opts = { complete: true };
        if (config.decode && Object.keys(config.decode).length) {
          opts = { ...opts, ...config.decode };
        }
        //
        return jwt.decode(token, opts);
      }
    }

    //
    return this[JWT];
  }
}