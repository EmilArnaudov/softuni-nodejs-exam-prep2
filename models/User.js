const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [/^[a-z]+@[a-z]+\.[a-z]+$/, 'Please enter a valid email.']
    },

    password: {
        type: String,
        required: true,
        minlength: [4, 'Password should be at least 4 characters.']
    },

    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },

    tripsHistory: [{
        type: mongoose.Types.ObjectId,
        ref: 'Trip',
    }]
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword;

            next();
        })
})

const User = mongoose.model('User', userSchema);



module.exports = User;