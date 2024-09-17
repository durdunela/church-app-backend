const UserService = require('../services/user.services');

exports.register = async (req, res, next) => {
    try {
        const { email, password, fullName } = req.body;
        
        await UserService.registerUser(email, password, fullName);

        res.json({ status: true, success: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = UserService.checkUser(email);

        if(!user){
            throw new Error('User does not exist');
        }

        const isMatch = await user.comparePassword(password);
        
        if(isMatch === false){
            throw new Error('Password is invalid');
        }

        let tokenData = {_id:user._id, email:user.email};

        const token = await UserService.generateToken(tokenData, "secretKey", "1h");

        res.status(200).json({status:true, token:token})

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}