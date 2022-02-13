const Trip = require('../models/Trip');

function createTrip(data) {
    const {startPoint, endPoint, date, time, carImage, carBrand, seats, price, description, creator} = data;

    const trip = new Trip({startPoint, endPoint, date, time, carImage, carBrand, seats, price, description, creator});

    return trip.save();
}


module.exports = {
    createTrip,
}