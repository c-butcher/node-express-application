const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require('express-validator/check');

/**
 * @type {Model} User
 */
const User = require('../../models/user');

/**
 * GET /signup
 *
 * Shows the registration page.
 */
router.get('/', function(req, res, next) {
    res.render('auth/signup', {
        title: 'Register',
    });
});

/**
 * POST /signup
 *
 * Attempts to create a new user in our local database.
 */
router.post('/', [
    body('email').isEmail().normalizeEmail(),
    body('username').not().isEmpty().trim().isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),

], function(req, res, next) {

    // Check to see if the request is valid
    if (req.validate()) {

        // Load any users with existing email or username.
        Promise.all([
            User.findOne({ email: req.body.username }),
            User.findOne({ username: req.body.username }),

        // Check to see if there are any existing users with the email or username.
        ]).then(([userOne, userTwo]) => {
            if (userOne) {
                req.flash('error', 'There is already an account with that username.');
            }

            if (userTwo) {
                req.flash('error', 'There is already an account with that email address.');
            }

            return !userOne && !userTwo;

        // If there are no existing users, then we can create a new user.
        }).then((createUser) => {

            if (createUser) {

                let salt = User.generateSalt();
                let password = User.encryptPassword(req.body.password, salt);
                let user = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: password,
                    salt: salt,
                    enabled: true,
                });

                user.save((error) => {
                    if (error) { return next(error); }

                    req.flash('success', "Successfully registered your account.");

                    return res.redirect('/login');
                });
            }

        // If there are any errors, send them to the error handler.
        }).catch((error) => {
            return next(error);
        });

    } else return res.redirect('/signup');
});

module.exports = router;
