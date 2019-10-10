const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const usersRouter = require('./route/user');
const adminRouter = require('./route/admin');
const apiRouter = require('./route/api');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static(__dirname + '/public'));


app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/api/1.0', apiRouter);


// function errorHandler(err, req, res, next) {
//   if (res.headersSent) {
//     return next(err);
//   }
//   res.status(500);
//   res.render('error', { error: err });
// }


app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});