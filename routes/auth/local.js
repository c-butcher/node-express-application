const express = require('express');
const router = express.Router();
const passport = require('passport');
const { query } = require('express-validator/check');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (username, password, done) => {

    Promise.all([
        User.findOne({ username: username }),
        User.findOne({ email: username })

    ]).then(([userOne, userTwo]) => {
        if (userOne && userOne.validPassword(password)) {
            return done(null, userOne);
        }

        if (userTwo && userTwo.validPassword(password)) {
            return done(null, userTwo);
        }

        return done(null, false, { message: 'Incorrect login credentials.' });

    }).catch((error) => {
        return done(null, false, error.msg);
    });

}));

router.get('/', [query('logout').toBoolean()], (req, res, next) => {
    if (req.query.logout) {
        console.log("Loggin out");
        req.logout();
    }

    return res.render('auth/login', {
        successes: req.flash('success'),
        errors: req.flash('error'),
    });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;