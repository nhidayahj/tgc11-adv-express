const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();
const session = require('express-session')
const flash = require('connect-flash')

// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(session({
    'secret':'whatever',
    'resave':false, // we will not resave the session
    'saveUninitialized': true
}))

// app.use argument is a function ccall or function
app.use(flash())

// add in a middleware
// must always have a next() of page will just hang
app.use(function(req,res,next){
    // res.locals contais all the variables that hbs files have access to
    res.locals.success_messages = req.flash('success_messages')
    res.locals.error_messages = req.flash('error_messages')
    next();
})

// import in the routes
const landingRoutes = require('./routes/landing')
const corporateRoutes = require('./routes/corporate')
const productsRoutes = require('./routes/products')
const userRoutes = require('./routes/users')

async function main() {
    // if url begins exactly wiht '/' use the landingRoutes
  app.use('/', landingRoutes)
  app.use('/investors', corporateRoutes)
  app.use('/products', productsRoutes)
  app.use('/users', userRoutes)

}

main();

app.listen(3000, () => {
  console.log("Server has started");
});