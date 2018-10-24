const {validationResult} = require('express-validator/check');
var User = require("./../models/user");


module.exports = {
    usersList: async (req, res, next) => {
        try {
            var users = await User.find({});
            res.render("users/index", {
                is_data_table: true,
                users: data,
                title: "Rklink Admin | All Users"
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try{
            res.render("users/create");
        } catch (error) {
            next(error);
        }
    },

    saveUser: async (req, res, next) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render("users/create", {errors: errors.array()});
            }
            var user = new User(req.body);

            //  check if user exits
            var foundUser = await User.findOne({ email: user.email });
            if (foundUser) {
                req.flash("error_msg", "User has already been taken");
                res.redirect("/users/create");
            }

            User.createUser(user, function (err, user) {
                res.redirect("/users");
            });


        } catch (error) {
            next(error);
        }
    }
};





