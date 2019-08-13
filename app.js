var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const MongoClient = require('mongodb').MongoClient
let process = require('process')
let db

const http = require('http')
const socketIO = require('socket.io')
const port = process.env.PORT || 5000;

// This resides in Heroku env setting
let password = process.env.MONGO_PASS

let mongoURL = "mongodb+srv://m001-student:"+ password+"@sandbox-dd84j.mongodb.net/test?retryWrites=true&w=majority"
//let mongoURL = 'mongodb://localhost:27017'

let connectToServer =  () => {
  MongoClient.connect(mongoURL,{ useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.log("connection error!")
    }
    db = client.db('movieDB')
  })
}

let getDb =  () => {
  return db
}

connectToServer((err, client) => {
  if (err) {
    console.log("Warning, failed to connect to mongodb:" + mongoURL)
  }
})

let addMessageRouter = require('./routes/addMessage');
let getMessageByIdRouter = require('./routes/getMessageById');
let putMessageByIdRouter = require('./routes/putMessageById');
let deleteMessageByIdRouter = require('./routes/deleteMessageById');
let clearListRouter = require('./routes/clearList');
let rootRouter = require('./routes/root');
let loadLatestCommentRouter = require('./routes/loadLatestComments')

var bodyParser = require('body-parser')
var app = express();

const server = http.createServer(app)
server.listen(port, () => console.log(`Listening on port ${port}`))
const io = socketIO(server)

io.on('connection', res => {
  res.on('liveChatMessage', (color) => {
    res.broadcast.emit('liveChatMessage', color)
  })

  res.on('disconnect', () => {
    res.removeAllListeners('liveChatMessage')
  })
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false }))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client/build')))
app.use('/addMessage', addMessageRouter)
app.use('/message', getMessageByIdRouter)
app.use('/message',putMessageByIdRouter)
app.use('/deleteMessage',deleteMessageByIdRouter)
app.use('/clearList', clearListRouter)
app.use('/root', rootRouter)
app.use('/loadLatestComments', loadLatestCommentRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

exports.getDb = getDb
