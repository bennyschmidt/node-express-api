## Node Express API

A Node/Express API boilerplate with options, easy endpoint definition, body parsing, and a basic status page.

-----

#### MIT License

-----

#### Clone from GitHub

```
git clone https://github.com/exactchange/node-express-api.git
```

#### Install using NPM
```
npm install node-express-api
```

#### Define a new API

```
class userApi extends NodeExpressApi {

  constructor() {
    const options = {
      redirectToHttps: true
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

  createUser(req, res) { /* */ }

  getUser(req, res) { /* */ }

  updateUser(req, res) { /* */ }

  deleteUser(req, res) { /* */ }

}
```

#### Instantiate your newly defined API

```
new userApi;
```

#### Render a status page

Handle the desired status page route with with the `renderStatusPage` method:

```
{ type: 'get', path: '/', handler: 'renderStatusPage' }
```

#### Start the API

```
node api
```
