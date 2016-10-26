const app = require('express')();
const request = require('request');
const path = require('path');

const port = 8787;

module.exports = {
  name: 'proxy',
  'server.before'() {
    this.set('__server_listen_log', false);
  },
  'middleware.before'() {
    return new Promise(function(resolve) {
      // app.use(favicon(path.join(__dirname, 'public', '/img/logo.ico')));
      app.get('*', function (req, res){
        if (JSON.stringify(req.params).indexOf('.') != -1) {
          req.pipe(request.post('http://127.0.0.1:8000' + req.params['0'], {form:req.body})).pipe(res);
        }
        else {
          res.sendFile(path.resolve(__dirname, '../entries', 'index.html'))
        }
      });
      app.listen(port);
      console.log("server started on port ", port);
      resolve();
    });
  },
};
