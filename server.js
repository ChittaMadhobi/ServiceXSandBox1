const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// const keys = require('./config/keys');

const users = require('./routers/api/users');
const profile = require('./routers/api/profile');
const posts = require('./routers/api/posts');

//===============CONFIGS===================CONNECTS==============
// Connect to mongoDB
const app = express();
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// DB config
const db = require('./config/keys').mongoURI;
// // DB Connection
mongoose
  .connect(db)
  .then(() => console.log(`Logged into MLab URI = ${db}`))
  .catch(err => console.log('Error Mongo : ' + err));

// ================= PASSPORT MIDDLEWARE ========================
app.use(passport.initialize());
// Passport Config - JWT strategy
require('./config/passport')(passport);
//======================ROUTERS=================================
// Need middleware for router use

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
//=============== Server STATIC ASSETS if in production ========
if (process.env.NODE_ENV === 'production') {
  // Set a static folder and point to client side, build as
  app.use(express.static(client / build));
  // client is the client-directory or client-side and 'build' is the build
  // directory created via building the client side (check client build in deploy doc)
  // In reality, we would ask heroku to do the build and not locally build it
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//=======TEST CONN===============================================
// app.get('/', (req, res) => {
//   res.send('Node Server Check from Browser ... SUCCESS');
// });
//========================START SERVR============================

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const ip = process.env.IP;
// app.listen(port, ip, () => {
//   console.log(`Server running on port ${port}`);
// });
