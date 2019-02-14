const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../models/user');

let FacebookAuthCredentials = {
    clientID:     process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL:  process.env.FACEBOOK_CALLBACK_URL
};

/**
 * Register PassportJS so that it can handle the Facebook Authentication Strategy.
 *
 */
passport.use(new FacebookStrategy(FacebookAuthCredentials, function(accessToken, refreshToken, profile, done) {
    // Attempt to find or create a user with the supplied Facebook Identifier.
    User.findOne({ facebookId: profile.id }).then((user) => {
        if (user) {
            return done(null, user);
        }

        user = new User({
            facebookId: profile.id,
            facebookAccessToken: accessToken,
            facebookRefreshToken: refreshToken,
            username: profile.displayName.replace(' ', '-').toLowerCase(),
            enabled: true,
        });

        user.save((error, user) => {
            if (error) return done(error, null);
            return done(null, user);
        });

    });
}));

/**
 * GET /auth/facebook
 *
 * Redirect to facebook so that the end-user can login using the facebook interface.
 */
router.get('/', passport.authenticate('facebook'));

/**
 * GET /auth/facebook/callback
 *
 * Finish authenticating using the facebook API.
 */
router.get('/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;