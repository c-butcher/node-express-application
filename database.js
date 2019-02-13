const mongoose = require('mongoose');

module.exports = function() {

    const host = process.env.DATABASE_HOST;
    const port = process.env.DATABASE_PORT;
    const database = process.env.DATABASE_NAME;
    const username = process.env.DATABASE_USERNAME;
    const password = process.env.DATABASE_PASSWORD;

    return function (req, res, next) {
        let connectionUrl = 'mongodb://';

        if (username && password) {
            connectionUrl += `${username}:${password}@`;
        }

        if (host) {
            connectionUrl += host;
        }

        if (port) {
            connectionUrl += `:${port}`;
        }

        if (database) {
            connectionUrl += `/${database}`;
        }

        mongoose.connect(connectionUrl, { useNewUrlParser: true }, (error) => {
            if (error) {
                console.log(error);
            }

            req.db = mongoose.connection;

            next();
        });
    };
};
