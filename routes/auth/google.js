const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

let GoogleAuthCredentials = {
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  process.env.GOOGLE_CALLBACK_URL
};

/**
 * Register PassportJS so that it can handle the Google Authentication Strategy.
 *
 */
passport.use(new GoogleStrategy(GoogleAuthCredentials, function(accessToken, refreshToken, profile, done) {

    // Just to see what type of information we get.
    console.log(profile);

    // Attempt to find or create a user with the supplied Google Identifier.
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
    });
}));

/**
 * GET /auth/google
 *
 * Redirect to Google+ so that the end-user can login using the Google+ interface.
 */
router.get('/', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

/**
 * GET /auth/google/callback
 *
 * Finish authenticating using the Google+ API.
 */
router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }, (req, res) => {
    res.redirect('/');
}));