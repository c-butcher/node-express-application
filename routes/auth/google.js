const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../models/user');

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
    // Attempt to find or create a user with the supplied Google Identifier.
    User.findOne({ googleId: profile.id }).then((user) => {
        if (user) {
            return done(null, user);
        }

        user = new User({
            googleId: profile.id,
            googleAccessToken: accessToken,
            googleRefreshToken: refreshToken,
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
router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    return res.redirect('/');
});

module.exports = router;