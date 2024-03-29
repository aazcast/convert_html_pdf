const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const processError = require('./handlers/error/processError');
const GError = require('./handlers/error/gerror');

// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), {flags: 'a'});

// app.use(morgan('combined', {stream: accessLogStream}));
app.disable('x-powered-by');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '200mb', extended: false}));

// parse application/json
app.use(bodyParser.json({limit: '500mb', extended: true}));


app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('x-frame-options', 'ALLOW');
  next();
});

app.options('*', function (req,res) { res.sendStatus(200); });

app.use(express.static(path.join(__dirname, 'views')));

//Ger Cookies
app.use(cookieParser());

//Load the Api Routes
require('./routes')(app);

//Error handler validation
app.use((err, req, res, next) => {
  processError.handle(err, res);
});

//Record any unhandled rejection
process.on('unhandledRejection', (reason, p) => {
  console.log('> Unhandled Rejection at: Promise', p, 'reason:', reason);
  const error = new GError('99', 'unhandledRejection: ' + reason + ' IN ' + p, 500, false, null, true);
  processError.handle(error);
});

process.on('uncaughtException', (error) => {
  console.log('>uncaughtException at: Promise', error);
  const err = new GError('99', 'uncaughtException ' + error, 500, true, error.stack, true);
  processError.handle(err);
});

module.exports = app;