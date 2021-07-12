const assert = require('assert');
const {PLUGIN_NAME} = require('./app.config');

//
module.exports = app => {
  //
  const config = app.config[PLUGIN_NAME];
  const { enable } = config || {};
  //
  if(enable){
    //
    const { appMiddlewareIndex = 0 } = config || {};
    assert(typeof appMiddlewareIndex === 'number');
    assert.strictEqual(
      (app.config.appMiddleware).includes(PLUGIN_NAME),
      false,
      `Duplication of middleware name found: ${PLUGIN_NAME}. Rename your middleware other than "${PLUGIN_NAME}".`,
    );
    assert(Array.isArray(app.config.appMiddleware));
    //
    if (appMiddlewareIndex >= 0) {
      //
      app.config.appMiddleware.splice(appMiddlewareIndex, 0, PLUGIN_NAME)
    }
    else {
      //
      app.config.appMiddleware.push(PLUGIN_NAME)
    }
  }
}