const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * The database schema for the user table.
 */
const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    created: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    enabled: Boolean,
});

/**
 * Lookup a user by their username and password combination.
 *
 * @param {string} username
 * @param {string} password
 * @param {callback} callback
 *
 * @returns {void|Query|number}
 */
userSchema.statics.findByUsernameAndPassword = function(username, password, callback) {
    return this.find({
        username: username,
        password: password
    }, callback);
};

/**
 * Lookup a user by their email and password combination.
 *
 * @param {string} email
 * @param {string} password
 * @param {callback} callback
 *
 * @returns {void|Query|number}
 */
userSchema.statics.findByEmailAndPassword = function(email, password, callback) {
    return this.find({
        email: email,
        password: password
    }, callback);
};

module.exports = mongoose.model('User', userSchema);