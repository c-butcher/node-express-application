
const { validationResult } = require('express-validator/check');

module.exports = function () {
    return function (req, res, next) {
        req.validate = function() {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                for (let error of errors) {
                    this.flash('error', error.msg);
                }
            }

            return errors.isEmpty();
        }

        next();
    };
};
