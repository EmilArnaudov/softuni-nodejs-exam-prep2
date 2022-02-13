const Trip = require('../models/Trip');
const router = require('express').Router();

router.get('/', async (req, res) => {
    let user = req.user;
    console.log(user);
    const trips = await Trip.find({creator: user._id}).lean();
    user.trips = trips;
    user.tripsLength = trips.length;

    return res.render('profile', { user });
})

module.exports = router;