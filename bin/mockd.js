'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _httpProxy = require('http-proxy');

var _httpProxy2 = _interopRequireDefault(_httpProxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROXY_MAP_DIR = process.env.HOME + '/.mockd';
var PROXY_MAP_FILE = PROXY_MAP_DIR + '/proxy.json';
var LISTEN_HOST = '127.0.0.1';
var LISTEN_PORT = 80;
var proxy = _httpProxy2.default.createProxyServer({});
var proxyMap = {};

var handle = function handle(req, res) {
  var host = req.headers.host;
  if (Object.keys(proxyMap).indexOf(host) < 0) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ 'error': 'not support fot this doamin' }, true, 2));
    res.end();
    return;
  }
  proxy.web(req, res, {
    ws: true,
    xfwd: true,
    changeOrigin: true,
    target: proxyMap[host]
  });
};

var main = function main() {
  try {
    proxyMap = require(PROXY_MAP_FILE);
  } catch (e) {
    if (!_fs2.default.existsSync(PROXY_MAP_DIR)) {
      _fs2.default.mkdirSync(PROXY_MAP_DIR, '0777');
      console.log('created ~/.mockd');
    }
    _fs2.default.writeFileSync(PROXY_MAP_FILE, JSON.stringify(proxyMap), 'utf-8');
  }
  var server = _http2.default.createServer(handle).listen(LISTEN_PORT, LISTEN_HOST);
};

main();