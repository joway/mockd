#!/usr/bin/env node

import fs from 'fs'
import http from 'http'
import https from 'https'
import httpProxy from 'http-proxy'

const PROXY_MAP_DIR = `${process.env.HOME}/.mockd`
const PROXY_MAP_FILE = `${PROXY_MAP_DIR}/proxy.json`
const LISTEN_HOST = '127.0.0.1'
const LISTEN_PORT = 80
const proxy = httpProxy.createProxyServer({})
let proxyMap = {}

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

const main = () => {
  try {
    proxyMap = require(PROXY_MAP_FILE)
  } catch (e) {
    if (!fs.existsSync(PROXY_MAP_DIR)) {
      fs.mkdirSync(PROXY_MAP_DIR, '0777')
      console.log('created ~/.mockd')
    }
    fs.writeFileSync(PROXY_MAP_FILE, JSON.stringify(proxyMap), 'utf-8')
  }

  try {
    const server = http.createServer(handle).listen(LISTEN_PORT, LISTEN_HOST)
  } catch (e) {
    console.info('use : sudo mockd ')
  }
  console.log('proxy server running')
}

main()
