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


let password = process.env.MONGO_PASS
/*password = 'm001-mongodb-basics'*/
/*
if (process.argv.length <3) {
  console.log("----------------------------------------")
  console.log("PLEASE enter database password! (hint: a4)")
  console.log("----------------------------------------")

  throw new Error("DB password not supplemented! (hint: a4")
}

password = process.argv[2]
console.log("Password supplemented!")
*/

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


var addMessageRouter = require('./routes/addMessage');
var getMessageByIdRouter = require('./routes/getMessageById');
var putMessageByIdRouter = require('./routes/putMessageById');
var deleteMessageByIdRouter = require('./routes/deleteMessageById');
let clearListRouter = require('./routes/clearList');
let rootRouter = require('./routes/root');
let loadLatestCommentRouter = require('./routes/loadLatestComments')


var bodyParser = require('body-parser')
var app = express();

const server = http.createServer(app)

server.listen(port, () => console.log(`Listening on port ${port}`))
const io = socketIO(server)

io.on('connection', res => {

  console.log('New client connected')

  // just like on the client side, we have a socket.on method that takes a callback function
  res.on('liveChatMessage', (color) => {
    // once we get a 'change liveChatMessage' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    //console.log('Color Changed to: ', color)


    res.broadcast.emit('liveChatMessage', color)
  })


  // disconnect is fired when a client leaves the server
  res.on('disconnect', () => {
    res.removeAllListeners('liveChatMessage')

     console.log('user disconnected')
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

//app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'client/build')))

/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})*/



//app.listen(port)

/*
let port = 3001;
app.listen(port)
*/

/*
var idCounter = 100;
let initialMessage = [
  {id:1, name:'puppy', type:'important', date:new Date(2011, 10, 13)},
  {id: 2, name:'donkey', type:'normal', date:new Date(1990, 11,19)},
  {id: 3, name:'rabbit',type: "useless", date:new Date(1999, 3,11)},
  {id: 4, name:'tiger', type: "important", date:new Date(2015, 10, 13)}
];*/


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
