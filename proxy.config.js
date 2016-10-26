// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

var path = require('path');
var file = require('fs');

var readFileSync = file.readFileSync;

console.info('xx oo');
const mock = {
  'GET http://ifitmix.com/*': 'http://172.21.113.3:8080/',

  // '/*/': function (req, res) {
  //   if (req.params.toString().indexOf('.')) {
  //     res.status(200).type('text/html').end('xx');
  //   }
  //   else {
  //     var filePath = require('path').join(__dirname + '/src/entries/index.html');
  //     res.status(200).type('text/html').end(readFileSync(filePath, 'utf-8'));
  //   }
  //   console.info('req', req.params);
  // },
  // 'GET /api/*': 'http://127.0.0.1:8080/'
  // 'GET http://localhost:8989/': 'http://127.0.0.1:8989/',
  // 'GET *': function(req, res) {
  //   var filePath = require('path').join(__dirname + '/src/entries/index.html');
  //   res.status(200).type('text/html').end(readFileSync(filePath, 'utf-8'));
  // }

  // 'GET *': 'http://127.0.0.1:8000/',
};

require('fs').readdirSync(require('path').join(__dirname + '/mock'))
  .forEach(function (file) {
    Object.assign(mock, require('./mock/' + file));
  });

module.exports = mock;


