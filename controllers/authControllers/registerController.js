const router = require('express').Router();
const auth = require('../../services/authServices');
const {TOKEN_COOKIE_NAME} = require('../../constants');
const createErrorMessage = require('../../utils/errorMessage');

router.get('/', (req, res) => {
    if (req.user) {
        return res.redirect('/')
    }

    res.render('register');
});

router.post('/', async (req, res) => {
    const { email, password, repeatPassword, gender} = req.body;

    try {

        let user = await auth.register(email, password, repeatPassword, gender);
        let token = await auth.createToken(user);

        res.cookie(TOKEN_COOKIE_NAME, token, {
            httpOnly: true,
        });

        return res.redirect('/')

    } catch (error) {
        let errorMessages = createErrorMessage(Object.keys(error.errors));
        res.render('register', {errorMessages})
    }

})

module.exports = router;