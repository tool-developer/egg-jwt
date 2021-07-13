const assert = require('assert');
const {PLUGIN_NAME} = require('./app.config');

//
module.exports = app => {
  //
  const config = app.config || {};
  const options = config[PLUGIN_NAME] || {};
  const { enableMiddleware } = options;
  //
  if(enableMiddleware){
    //
    const { appMiddlewareIndex = 0 } = options;
    assert(typeof appMiddlewareIndex === 'number');
    assert.strictEqual(
      (config.appMiddleware).includes(PLUGIN_NAME),
      false,
      `Duplication of middleware name found: ${PLUGIN_NAME}. Rename your middleware other than "${PLUGIN_NAME}".`,
    );
    assert(Array.isArray(config.appMiddleware));
    //
    if (appMiddlewareIndex >= 0) {
      //
      config.appMiddleware.splice(appMiddlewareIndex, 0, PLUGIN_NAME)
    }
    else {
      //
      config.appMiddleware.push(PLUGIN_NAME)
    }
  }
}