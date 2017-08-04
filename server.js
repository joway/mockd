import http from 'http'
import https from 'https'
import httpProxy from 'http-proxy'

const proxy = httpProxy.createProxyServer({})
const proxyMap = require('./proxy.json')

const handle = (req, res) => {
  const host = req.headers.host
  if (Object.keys(proxyMap).indexOf(host) < 0) {
    res.writeHead(403, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ 'error': 'not support fot this doamin' }, true, 2))
    res.end()
    return
  }
  proxy.web(req, res, {
    ws: true,
    xfwd: true,
    changeOrigin: true,
    target: proxyMap[host]
  })
}

const server = http.createServer(handle).listen(80, '127.0.0.1')
