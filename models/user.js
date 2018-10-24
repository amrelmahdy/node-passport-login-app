var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcryptjs = require("bcryptjs");

// with a custom error mes
var UserSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        index: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
    },
    image: {
        type: String,
        default: "avatar.png"
    }
});



var User = mongoose.model("User", UserSchema);


module.exports = User;




module.exports.saveUser = function (newUser) {
    bcryptjs.genSalt(10, function(err, salt) {
        bcryptjs.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save();
        });
    });
};


module.exports.createUser = function (newUser, callback) {
    bcryptjs.genSalt(10, function(err, salt) {
        bcryptjs.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};


module.exports.getUserByEmail = function (email, callback) {
    let query = { email: email };
    user = User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
    user = User.findById(id, callback);
};



module.exports.comparePassword = function (password, hash, callback) {
    bcryptjs.compare(password, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};

