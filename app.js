var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var flash = require('connect-flash');
var mongo = require("mongodb");
var passport = require("passport");
var mongoose = require("mongoose");
var hbs = require("express-handlebars");
var session = require("express-session");
const morgan = require("morgan");
const socket = require("socket.io");

/*mongoose.connect("mongodb://rklinicuser:pass123456@46.101.151.100/rklinic", {
    useNewUrlParser: true,
    useCreateIndex: true,

});*/


mongoose.connect("mongodb://46.101.151.100/rklinic", {
    useNewUrlParser: true,
    useCreateIndex: true,

});

var db = mongoose.connection;


var app = express();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(morgan("dev"));

// View Engine
app.engine('hbs', hbs({
    defaultLayout: 'master',
    extname: 'hbs',
    layoutsDir : path.join(__dirname, '/views/layouts/'),
    partialsDir: path.join(__dirname, '/views/partials/')
}));
app.set('view engine', 'hbs');

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
}));



// Passport
app.use(passport.initialize());
app.use(passport.session());


// Connect Flash
app.use(flash());

// Global Variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg   = req.flash("error_msg");
    res.locals.error       = req.flash("error");
    res.locals.user        = req.user || null;
    next();
});


// Static Files
app.use("/public", express.static(path.join(__dirname, "public")));

// web routes
var indexWebRoutes = require("./routes/index");
var userWebRoutes = require("./routes/user");
// Fire Web Routes
app.use("/", indexWebRoutes);
app.use("/users", userWebRoutes);

// API routes
var userApiRoutes = require("./routes/api/user");
// Fire API Routes
app.use("/api/users", userApiRoutes);






// Start Server
const port = process.env.PORT || 3000;
app.set("port",port);



var server = app.listen(app.get("port"), function () {
    console.log("Server started on port " + port );
});

var io = socket(server);

io.on("connection", function (socket) {
   console.log("a new client connected to server");
   // listen to events
   socket.on("chat", (data) => {
      io.sockets.emit("chat", data);
   });


    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    });
});