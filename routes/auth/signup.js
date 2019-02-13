const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');


router.get('/', function(req, res, next) {
    res.render('auth/signup', {
        title: 'Register',
    });
});

router.post('/', [
    check('username').isLength({ min: 3 }),
    check('password').isLength({ min: 5 }),
], function(req, res, next) {

    if (req.validate()) {

        User.findOne({ username: req.body.username }).then((user) => {
            if (!user) {
                User.findOne({username: req.body.username}).then((user) => {
                    return user;
                });
            }
        }).then((user) => {

        });

        req.flash('success', "Successfully registered your account.");
        res.redirect('/profile');
    }

    res.redirect('/signup');
});

module.exports = router;
