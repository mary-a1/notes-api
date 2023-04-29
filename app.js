// Inital settings
const express = require('express');
const morgan = require('morgan');
const db = require('./src/routes/db');
const cookieParser = require('cookie-parser')
const cookieParams = {
  httpOnly: true,
  signed: true,
};


// Web server config
const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.json());

const secretKey = 'foobarbaz12345';
app.use(cookieParser(secretKey));
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static('public'));


// Separated Routes for each Resource
const usersRouter = require('./src/routes/user');
const notesRouter = require('./src/routes/notes');
const searchRouter = require('./src/routes/search')



app.use('/api/auth', usersRouter(db, cookieParams));
app.use('/api/notes', notesRouter(db));
app.use('/api/search', searchRouter(db));



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

