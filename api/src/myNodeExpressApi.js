'use strict';

const NodeExpressApi = require('../lib/NodeExpressApi');

class myNodeExpressApi extends NodeExpressApi {

  constructor() {
    const options = {
      redirectToHttps: true
    };
    const requests = [
      { type: 'get', path: '/', handler: 'renderStatusPage' },
      { type: 'get', path: '/test', handler: 'testEndpoint' },
      { type: 'get', path: '/another', handler: 'anotherTestEndpoint' },
      // { type: 'post', path: '/user', handler: 'createUser' },
      // { type: 'get', path: '/user', handler: 'getUser' },
      // { type: 'put', path: '/user', handler: 'updateUser' },
      // { type: 'delete', path: '/user', handler: 'deleteUser' }
    ];
    super(requests, options);
  }

  testEndpoint(req, res) {
    console.log('/testEndpoint', req, res);
    res.sendStatus(200);
  }

  anotherTestEndpoint(req, res) {
    console.log('/anotherTestEndpoint', req, res);
    res.sendStatus(401);
  }

}

module.exports = myNodeExpressApi;
