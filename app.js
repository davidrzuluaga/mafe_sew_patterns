// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./server/routes');

require('dotenv').config();

//require('./server/models/Users');
require('./config/passport');

const cors = require('cors');
const session = require('express-session');

const port = process.env.PORT || 5000;
// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());
app.use(
  session({
    secret: 'passport-tutorial',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

app.use('/', routes);

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});
