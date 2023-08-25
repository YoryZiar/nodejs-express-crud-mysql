const express = require('express');
const app = express();
const expressEjsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

// port 
const port = 5000;

// express setup
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    })
);
app.use(flash());

// ejs setup
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.use(express.static('public'));

// database
require('./config/mysql')

// routes
app.use('/', require('./routes/indexRoutes'));
app.post('/post', (req, res) => {
    res.send(req.body);
    console.log(req.body);
})

// server
app.listen(port, () => {
    console.log(`app listen on port || ${port}`);
})