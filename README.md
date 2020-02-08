### Node Express API

A fast, declarative, and flexible library for building RESTful APIs.

#### Define a new API

```
class userApi extends NodeExpressApi {

  constructor() {
    const options = {
      redirectToHttps: true,
      wsConnection: false
    };

    const requests = [
      { type: 'get', path: '/', handler: 'renderStatusPage' },
      { type: 'post', path: '/user', handler: 'createUser' },
      { type: 'get', path: '/user', handler: 'getUser' },
      { type: 'put', path: '/user', handler: 'updateUser' },
      { type: 'delete', path: '/user', handler: 'deleteUser' }
    ];

    super(requests, options);
  }

  createUser(req, res) { }

  getUser(req, res) { }

  updateUser(req, res) { }

  deleteUser(req, res) { }

}
```

#### Render a status page

Handle the desired status page route with with the `renderStatusPage` method:

```
{ type: 'get', path: '/', handler: 'renderStatusPage' }
```

#### Run the API

```
node api
```
