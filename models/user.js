const Crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * The database schema for the user table.
 */
const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    salt: String,
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

/**
 * Encrypt a plain-text password.
 *
 * @param {string} password
 *
 * @returns {string}
 */
userSchema.statics.encryptPassword = function (password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
};

/**
 * Changes the users password.
 *
 * @param {string} password
 */
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = this.encryptPassword(password, this.salt);
};

/**
 * Check to see if the supplied password matches the users current password.
 *
 * @param {string} password
 *
 * @returns {boolean}
 */
userSchema.methods.validPassword = function(password) {
    return this.password === this.encryptPassword(password, this.salt);
};

module.exports = mongoose.model('User', userSchema);