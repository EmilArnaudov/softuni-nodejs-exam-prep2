const router = require('express').Router();
const Trip = require('../models/Trip');
const { createTrip } = require('../services/tripServices');
const { getTripDetails } = require('../services/tripServices');
const { joinTrip } = require('../services/tripServices');
const createErrorMessage = require('../utils/errorMessage');

router.get('/shared', async (req, res) => {
    const trips = await Trip.find({}).lean();

    res.render('shared-trips', {trips});
});

router.get('/offer', (req, res) => {
    res.render('trip-create');
});

router.post('/offer', async (req, res) => {
    let tripData = req.body;
    tripData.creator = req.user._id

    try {
        let trip = await createTrip(tripData);

        return res.redirect('/')

    } catch (error) {   
        let errorMessages = createErrorMessage(Object.keys(error.errors));
        res.render('trip-create', {errorMessages});
    }
})

router.get('/details/:id', async (req, res) => {
    let tripId = req.params.id;
    let userId = req.user._id;
    let userEmail = req.user.email;

    try {
        let trip = await getTripDetails(tripId, userId, userEmail);
        return res.render('trip-details', {trip});

    } catch (error) {
        console.log(error);
        return res.status(401).render('404')

    }
});

router.get('/join/:id', async (req, res) => {
    let tripId = req.params.id;
    let userId = req.user._id;

    try {
        let trip = await joinTrip(tripId, userId);
        return res.render('trip-details', { trip });

    } catch (error) {
        return res.status(404).render('404');
    }
})

module.exports = router;
