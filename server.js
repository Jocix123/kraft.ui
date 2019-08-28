#!/usr/bin/env node

/**
 * @file: server.js
 * @description: main app bootstrapper
 * @license: MIT
 * @author: Loouis Low <loouis@gmail.com>
 * @copyright: Loouis Low (https://github.com/loouislow81/kraft.ui)
 */

// paths

const core = __dirname + '/core/'
const views = __dirname + '/render/'

// module dependencies

const framework = require(core + 'sframework')
const http = require('http')
const consoleDetail = require('morgan')
const bodyParser = require('body-parser')
const openWebBrowser = require('opn')

// short-hands

const log = console.log

// environment

const env = require('./env/config')

// get renderer

const app = framework()

// get api request parameters

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

log('[kraft] piping source...')
app.use(framework.static(views))

app.get('/', function(req, res) {
  log('[kraft] rendering script...')
  res.sendFile(views + 'app.html')
})

app.use(function(err, req, res, next) {
  if (err) {
    throw err;
  }
  res.sendFile(views + 'app.html')
})

// app port

app.listen(env.server_port)
app.use(consoleDetail('dev'))
log('[kraft] listening at http://0.0.0.0:' + env.server_port)

// open web browser

openWebBrowser('http://0.0.0.0:' + env.server_port);
