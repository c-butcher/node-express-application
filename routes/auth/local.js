const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }

        if (!user) {
            User.findOne({ email: username }, (err, user) => {
                if (err) { return done(err); }

                if (!user) {
                    return done(null, false, {message: 'Incorrect username or password.'});
                }

                if (!user.validPassword(password)) {
                    return done(null, false, {message: 'Incorrect username or password.'});
                }

                return done(null, user);
            });
        }

        else if (!user.validPassword(password)) {
            return done(null, false, {message: 'Incorrect username or password.'});

        } else {
            return done(null, user);
        }
    });
}));

router.get('/', (req, res, next) => {
    res.render('auth/login', {
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