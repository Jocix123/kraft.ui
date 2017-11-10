//
//  @@script: server.js
//  @@version:
//  @@description: kraft.ui
//  @@author: Nathan
//  @@email: nathan@dogsbark.net
//  @@copyright: dogsbark Inc (dogsbark.net)
// ---------------------------------------------
//

// paths

var core = __dirname + '/core/';
var views = __dirname + '/render/';

// module dependencies

const framework = require(core + 'sframework');
const http = require('http');
const httpServer = http.Server(app);
const consoleDetail = require('morgan');
const bodyParser = require('body-parser');
const openWebBrowser = require('opn');

// environment

var env = require('./env/config');

// get renderer

var app = framework();

// get api request parameters

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

console.log('[kraft] piping source...');
app.use(framework.static(views));

app.get('/', function(req, res) {
  console.log('[kraft] rendering script...');
  res.sendFile(views + 'app.html');
});

app.use(function(err, req, res, next){
  if(err){
    throw err;
  }
  res.sendFile(views + 'app.html');
});

// app port

app.listen(env.server_port);
app.use(consoleDetail('dev'));
console.log('[kraft] listening at http://localhost:' + env.server_port);

// open web browser

openWebBrowser('http://localhost:' + env.server_port);

