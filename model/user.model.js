const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require('bcryptjs/dist/bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true, 
    },
});

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();

        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(this.password, salt);

        this.password = hashpass;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(userPassword){
    try {
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    } catch (error) {
        throw(error);
    }
}

const UserModel = db.model('user', userSchema);

module.exports = UserModel;