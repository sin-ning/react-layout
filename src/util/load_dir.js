
import fs from 'fs';
import path from 'path';

var load = function(path, name) {
  if (name) {
    return require(path + name);
  }
  return require(path)
};

module.exports = function (dir) {
  var patcher = {}

  fs.readdirSync(__dirname + '/' + dir).forEach(function (filename) {
    if (!/\.js$/.test(filename)) {
      return;
    }
    var name = path.basename(filename, '.jsx');
    var _load = load.bind(null, './' + dir + '/', name);

    patcher.__defineGetter__(name, _load);
  });

  return patcher;
}
