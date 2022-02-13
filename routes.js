const router = require('express').Router();
const homeController = require('./controllers/homeController');
const loginController = require('./controllers/authControllers/loginController');
const registerController = require('./controllers/authControllers/registerController');
const logoutController = require('./controllers/authControllers/logoutController');
const tripsConttroller = require('./controllers/tripsController');

router.use('/', homeController);
router.use('/login', loginController);
router.use('/register', registerController);
router.use('/logout', logoutController);
router.use('/trips', tripsConttroller)

router.all('/*', (req, res) => {
    res.status(404).render('404')
})

module.exports = router;