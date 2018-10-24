var express = require("express");
var router = express.Router();
var authController = require("./../controllers/authController");
const {check} = require('express-validator/check');
var User = require("./../models/user");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


router.get("/", authController.usersList);

router.get("/add", authController.create);

router.post("/add", [check('name').isLength({min: 1}).withMessage("Name Is Required")],
    authController.saveUser
);


// this authenticates using email and password
passport.use(new LocalStrategy(
    function (email, password, done) {
        User.getUserByEmail(email, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: "Unknown User .."});
            }
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (!isMatch) {
                    return done(null, false, {message: "Invalid credentials !!"})
                }
                return done(null, user);
            })
        });
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});


router.get("/login", function (req, res) {
    res.render("login", {layout: 'login.hbs'});
});


router.post("/login",
    passport.authenticate('local',
        {
            successRedirect: '/',
            failureRedirect: '/users/login',
            failureFlash: true
        }),
    function (req, res) {
        res.redirect("/");
    });


router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/users/login");
});


module.exports = router;