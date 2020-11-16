const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');

const connectionManager = require('./connection');
const stocksRouter = require('./routes/stocks');
const stocksService= require('./services/stocks');
const app = express();
const port=3000;
connectionManager.getConnection();

// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
app.use(function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Origin: http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization"
  );

  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.use('/stocks', stocksRouter);


const server = http.createServer(app);

let io = require('socket.io')(server);
io.on('connection', function (socket) {
  console.log("Connected succesfully to the socket ...");

  socket.on('new-stock', (data) => {
    // console.log(data);
    // socket.emit('new-stock',data);
    stocksService.addStocks(data).then(resData=>{
        //  console.log(resData);
         socket.emit('new-stock',JSON.parse(JSON.stringify(resData)));
     })
  });
});
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
require('./helpers/xlsx-reader').readXlsxFile();

module.exports = {app,io};
