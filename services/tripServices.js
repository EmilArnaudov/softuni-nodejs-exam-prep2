const Trip = require('../models/Trip');
const User = require('../models/User');

function createTrip(data) {
    const {startPoint, endPoint, date, time, carImage, carBrand, seats, price, description, creator} = data;

    const trip = new Trip({startPoint, endPoint, date, time, carImage, carBrand, seats, price, description, creator});

    return trip.save();
}

async function getTripDetails(tripId, userId, userEmail) {
    let trip = await Trip.findById(tripId).lean();

    if (!trip) {
        throw new Error('Trip does not exist.');
    }

    if (userId) {
        trip.canJoin = true;
    
        if (trip.creator.toString() === userId) {
            trip.isOwner = true;
        }
    }

    if (trip.buddies.length > 0) {
        let buddies = await User.find({_id: {$in: trip.buddies}}).lean();
        let buddiesEmails = buddies.map(x => x.email);

        trip.canJoin = !buddiesEmails.includes(userEmail);

        trip.buddiesEmails = buddiesEmails.join(', ');
    }

    trip.availableSeats = trip.seats - trip.buddies.length;

    let creator = await User.findById(trip.creator).lean();
    trip.creatorEmail = creator.email;

    return trip;
}


async function joinTrip(tripId, userId) {
    let trip = await Trip.findById(tripId).lean();

    if (!trip) {
        throw new Error('Trip does not exist.')
    }

    trip.buddies.push(userId);

    return trip.save();
}


module.exports = {
    createTrip,
    getTripDetails,
    joinTrip,
}