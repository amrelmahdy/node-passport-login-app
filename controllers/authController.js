const { validationResult }  = require('express-validator/check');
var User = require("./../models/user");


// handle users list
module.exports.usersList = function (req, res) {
    users = User.find({}, function (err, data) {
        res.render("users/index", {
            is_data_table: true,
            users: data,
            title: "Rklink Admin | All Users"
        });
        //res.json(data);
    })
};



// handle users list
module.exports.create = function (req, res) {
    res.render("users/create");
};

// handle register a new user
module.exports.saveUser = function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("users/create", { errors: errors.array() });
    }
    var user = new User(req.body);
    // create a new promise
    let userCreated = new Promise((resolve, reject) => {
        User.createUser(user, function (err, user) {
            if (err){
                if(err.code){
                    reject('E-mail already in use');
                } else {
                    reject("whoops something went wrong");
                }
            } else {
                resolve(user);
            }
        })
    });

    var flashError, flashSuccess = null;

    userCreated.then((resolve) => {
        req.flash("error_msg","heeeeeeeeeeeeeeeey good");
        //console.log(resolve);
    }).catch((reject) => {
        req.flash("error_msg","heeeeeeeeeeeeeeeey");
       // console.log(reject);
    });


    console.log("__", res.locals.error_msg);
    res.redirect("/users");
};