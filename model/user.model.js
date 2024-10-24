import mongoose from 'mongoose';
import { db } from '../config/db.js'; 

import pkg from 'bcryptjs/dist/bcrypt.js';
const { genSalt, hash, compare } = pkg;

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

        const salt = await genSalt(10);
        const hashpass = await hash(this.password, salt);

        this.password = hashpass;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(userPassword){
    try {
        const isMatch = await compare(userPassword, this.password);
        return isMatch;
    } catch (error) {
        throw(error);
    }
}

const UserModel = db.model('User', userSchema); 

export default UserModel;
