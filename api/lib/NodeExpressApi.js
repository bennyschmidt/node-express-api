'use strict';

const Express = require('express');
const expressVersion = require('express/package').version;
const parser = require('body-parser');
const request = require('request');
const cors = require('cors');
const fs = require('fs');
const io = require('socket.io');

class NodeExpressApi {
  constructor(routes, options, methods) {
    this.path = __dirname;
    this.port = process.env.PORT || 1337;
    this.middleware = Express();
    this.routes = this.routes || routes;
    this.options = this.options || options;
    
    this.bindAll.call(this, methods);
    
    this.middleware.use(Express.static(this.path + '/build'));
    this.middleware.use(parser.urlencoded({ extended: true }));
    this.middleware.use(parser.json());
    this.middleware.use(this.redirectToHttps.bind(this));
    
    if (options.wsConnection === true) {
      this.ws = io();
      this.ws.listen(this.middleware.listen(this.port));
    }
    else {
      this.middleware.listen(this.port);
    }

    this.routes.forEach((route, index) => {
      this.middleware[route.type](route.path, cors(), (req, res) => {
        let body, buffer = '';
        
        if(!req || !res) {
          return false;
        }

        if(req.method === 'POST') {
          return req.on('data', (data) => {
            buffer += data.toString();
          }).on('end', () => {
            req.bodyraw = buffer;
            body = JSON.parse(req.bodyraw);
        
            return this[route.handler].apply(this, [body, res]);
          });
        }
        
        return this[route.handler].apply(this, [req, res]);
      });
    });
    
    console.log(this.options.startMessage || `\x1b[32m<< ${new Date().toString()} >> Express v${expressVersion} is running on Node.js ${process.version} (V8).\x1b[0m`);
  }

  bindAll(methods) {
    Object.keys(methods || {}).forEach((m, i) => {
      this[m] = methods[m].bind(this);
    });
  }

  redirectToHttps(req, res, next) {
    let host = req.headers.host;
    
    if (this.options.redirectToHttps) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      
      if (process.env.NODE_ENV === 'production') {
        if (req.headers['x-forwarded-proto'] != 'https') {
          if (!req.headers.host.match('www.')) {
            host = ('www.' + host);
          }

          return res.redirect('https://' + host + req.url);
        }
      }
    }
    
    return next();
  }

  renderStatusPage(req, res) {
    res.write(`
      <html>
        <head>
          <title>API Status</title>
        </head>
        <body>
          <h6>API Status: ONLINE</h6>
        </body>
      </html>
    `);

    res.end();
  }
}

module.exports = NodeExpressApi;
