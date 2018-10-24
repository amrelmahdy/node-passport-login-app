const User = require("./../../models/user");
const helper = require("./../../helpers/helpers");

module.exports = {
    register: async (req, res, next) => {
        try{
            var response;
            var newUser = User(req.value.body);
            var foundUser = await User.findOne({ email: newUser.email });

            // check if user exists
            if (foundUser){
                response = helper.createResponse(true, "", 403, {}, "User has already been taken", {});
                res.status(200).json(response);
                return;
            }
            // create a new user
            var user = await User.saveUser(newUser);

            response = helper.createResponse(true, "", 200, {}, "User added successfully", user);
            res.status(200).json(response);

        }catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try{
            res.json(req.value.body);

        }catch (error) {
            next(error);
        }
    },
    secret: async (req, res, next) => {
        try{

        }catch (error) {
            next(error);
        }
    }
};