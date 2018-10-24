var express = require("express");
var router = express.Router();


router.get("/", redirectIfAuthenticated, function (req, res) {
    res.render("index");
});



router.get("/chat", redirectIfAuthenticated, function (req, res) {
    res.render("chat", {layout: ""});
});




function redirectIfAuthenticated(req, res, next){
    if (!req.isAuthenticated()){
        req.flash("error_msg", "please login first");
        res.redirect("/users/login");
    } else {
        return next();
    }
}


module.exports = router;