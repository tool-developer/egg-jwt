'use strict';

const mock = require('egg-mock');

describe('test/jwt.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/jwt-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, jwt')
      .expect(200);
  });
});
