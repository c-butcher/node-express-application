const session = require('express-session');

module.exports = function() {
    const session_name = process.env.SESSION_NAME;
    const session_secret = process.env.SESSION_SECRET;

    return session({
        name: session_name,
        secret: session_secret,
        saveUninitialized: true,
        resave: true
    });
};
