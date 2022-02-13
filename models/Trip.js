const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        required: true,
        minlength: [4, 'Starting point should be at least 4 characters long']
    },

    endPoint: {
        type: String,
        required: true,
        minlength: [4, 'Starting point should be at least 4 characters long.']
    },

    date: {
        type: String,
        required: true,
    },

    time: {
        type: String,
        required: true,
    },

    carImage: {
        type: String,
        required: true,
        validate: [/^https?:\/\/.+$/, 'The car image must be a link.']
    },

    carBrand: {
        type: String,
        required: true,
        minlength: [4, 'Car brand must be at least 4 characters long.']
    },

    seats: {
        type: Number,
        required: true,
        min: [0, 'Seats cannot be less than 0.'],
        max: [4, 'Seats cannot be more than 4.']
    },

    price: {
        type: Number,
        required: true,
        min: [1, 'Price cannot be less than 1.'],
        max: [50, 'Price cannot be more than 50.']
    },

    description: {
        type: String,
        required: true,
        minlength: [10, 'Description cannot be less than 10 characters.']
    },

    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    buddies: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]

})

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;