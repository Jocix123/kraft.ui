//
//  @@script: server.js
//  @@version: 0.0.0.1
//  @@description: kraft bootstrapper
//  @@author: Loouis Low
//  @@email: studio@dogsbark.net
//  @@copyright: dogsbark Inc (www.dogsbark.net)
// ---------------------------------------------
//

/***
 ** Constants
 */

var core = __dirname + '/core/';
var views = __dirname + '/render/';
var port = process.env.PORT || 6767;

/***
 ** Module Dependencies
 */

var framework = require(core + 'sframework'),
  app = framework(),
  http = require('http'),
  httpServer = http.Server(app),
  consoleDetail = require('morgan'),
  bodyParser = require('body-parser');

/***
 ** get request parameters
 */

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

/***
 ** Renderer
 */

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

/***
 ** Listening IP Port
 */

app.listen(port);
app.use(consoleDetail('dev'));
console.log('[kraft] listening at http://localhost:6767');

