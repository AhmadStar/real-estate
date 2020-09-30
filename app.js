const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mysql = require('mysql')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
var cookieParser = require('cookie-parser')
var path = require('path');
var i18n = require('./config/i18n');
const HttpError = require('./config/http-error');


const app = express()

// passport config
require('./config/passport')(passport)

// Db connection
var con = mysql.createConnection({
      host: "localhost",
      user: "jusoor",
      password: "jusoor",
      database: "real_estate",
      insecureAuth : true
})
con.connect(function (err) {
  if (err) throw err
  console.log('Database connected!')
})
module.exports = con

// static
app.use(express.static('public'))

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Body parser
app.use(express.urlencoded({ encoded: false }))

// cookie
app.use(cookieParser());

// i18n for language
app.use(i18n);

// express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash connection
app.use(flash())

// global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

app.get("/lang/:locale", function (req, res) {
  res.cookie('lang', req.params.locale, { maxAge: 900000, httpOnly: true });

  res.redirect('back');
});

// app.use(function(req, res, next){
//   const setting = []; 
//   setting['vision'] = "fsadasd asdsa d";
//   setting['story'] = "fsadasd asdsa d";
//   res.locals.settings = setting;
//   next();
// });


app.use(async function(req, res, next){
  const array = [];
  const myquery = "SELECT name, value from site_settings WHERE lang = " + "'"+res.locals.current_locale+"'"
  await con.query(myquery, (err, settings) => {  
        if (err) throw err;  
        if(settings.length > 0){
            settings.forEach(element => {
              array[element.name] = element.value;
            });
        }
    });
  res.locals.settings = array;
  next();
});

// Routes
app.use('/', require('./routes/home'))
app.use('/dashboard', require('./routes/dashboard'))


// app.use((req, res, next) => {
//   const error = new HttpError('Could not find this route das d.', 404);
//   // throw error;
//   console.log(error);
// });


app.use('*', (req, res) => {
  res.render('404' ,{ title:'Page Not Found'})
})

app.listen('5000')
