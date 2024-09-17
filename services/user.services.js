const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');

class UserService{
    static async registerUser(email, password, fullName){
        try{
            const createUser = new UserModel({email, password, fullName});
            return await createUser.save();            
        } catch(err){
            throw err;
        }
    }
    static async checkUser(email) {
        try {
            return await UserModel({email});
        } catch(error) {
            throw(error);
        }
    }
    static async generateToken(tokenData, secretKey, jwt_expire){
        return jwt.sign(tokenData, secretKey, {expiresIn: jwt_expire});
    }
}

module.exports = UserService;