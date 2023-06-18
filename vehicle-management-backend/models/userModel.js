const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    firstName:{ 
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nationalID: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    }
}, {
    timestamps: true
});

const userValidationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    nationalID: Joi.string().required(),
    phone: Joi.number().required(),
    role: Joi.string().valid('user', 'admin')
});

//comparing password
userSchema.methods.comparePassword = async (password) => {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    userValidationSchema
}