const express = require('express');
const router = express.Router();
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../../models/user');

let TwitterAuthCredentials = {
    consumerKey:    process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL:    process.env.TWITTER_CALLBACK_URL
};

/**
 * Register PassportJS so that it can handle the Twitter Authentication Strategy.
 *
 */
passport.use(new TwitterStrategy(TwitterAuthCredentials, function(accessToken, refreshToken, profile, done) {
    // Attempt to find or create a user with the supplied Twitter Identifier.
    User.findOne({ twitterId: profile.id }).then((user) => {
        if (user) {
            return done(null, user);
        }

        user = new User({
            twitterId: profile.id,
            twitterAccessToken: accessToken,
            twitterRefreshToken: refreshToken,
            username: profile.screen_name,
            enabled: true,
        });

        user.save((error, user) => {
            if (error) return done(error, null);
            return done(null, user);
        });

    });
}));

/**
 * GET /auth/twitter
 *
 * Redirect to twitter so that the end-user can login using the twitter interface.
 */
router.get('/', passport.authenticate('twitter'));

/**
 * GET /auth/twitter/callback
 *
 * Finish authenticating using the twitter API.
 */
router.get('/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;