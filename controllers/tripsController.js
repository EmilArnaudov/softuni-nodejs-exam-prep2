const router = require('express').Router();
const Trip = require('../models/Trip');
const { createTrip } = require('../services/tripServices');
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

    try {
        let trip = await createTrip(tripData);

        return res.redirect('/')

    } catch (error) {   
        let errorMessages = createErrorMessage(Object.keys(error.errors));
        res.render('trip-create', {errorMessages})
    }
})

module.exports = router;
