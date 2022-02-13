const router = require('express').Router();
const Trip = require('../models/Trip');
const { createTrip, deleteTrip, editTrip } = require('../services/tripServices');
const { getTripDetails } = require('../services/tripServices');
const { joinTrip } = require('../services/tripServices');
const createErrorMessage = require('../utils/errorMessage');
const { isAuthenticated }  = require('../middlewares/authMiddleware');

router.get('/shared', async (req, res) => {
    const trips = await Trip.find({}).lean();

    res.render('shared-trips', {trips});
});

router.get('/details/:id', async (req, res) => {
    let tripId = req.params.id;
    let userId;
    let userEmail;
    if (req.user) {
        userId = req.user._id;
        userEmail = req.user.email;    
    }
    

    try {
        let trip = await getTripDetails(tripId, userId, userEmail);
        return res.render('trip-details', {trip});

    } catch (error) {
        console.log(error);
        return res.status(401).render('404')

    }
});

router.use(isAuthenticated)

router.get('/offer', (req, res) => {
    res.render('trip-create');
});

router.post('/offer', async (req, res) => {
    let tripData = req.body;
    tripData.creator = req.user._id

    try {
        let trip = await createTrip(tripData);

        return res.redirect('/trips/shared')

    } catch (error) {   
        let errorMessages = createErrorMessage(Object.keys(error.errors));
        res.render('trip-create', {errorMessages});
    }
})

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

router.get('/delete/:id', async (req, res) => {
    await deleteTrip(req.params.id);

    return res.redirect('/trips/shared')
})

router.get('/edit/:id', async (req, res) => {
    let tripId = req.params.id;
    let trip = await Trip.findById(tripId).lean();

    return res.render('trip-edit', { trip })
});

router.post('/edit/:id', async (req, res) => {
    let tripId = req.params.id;
    let editTripData = req.body;

    try {
        await editTrip(tripId, editTripData);
        return res.redirect('/trips/shared');

    } catch (error) {
        let errorMessages = createErrorMessage(Object.keys(error.errors));
        let trip = await Trip.findById(tripId).lean();
        res.render('trip-edit', {trip, errorMessages});
    }
})

module.exports = router;
