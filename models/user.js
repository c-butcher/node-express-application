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
    googleId: String,
    googleAccessToken: String,
    googleRefreshToken: String,
    created: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    enabled: { type: Boolean, default: false },
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
 * @param {string} salt
 *
 * @returns {string}
 */
userSchema.statics.encryptPassword = function (password, salt) {
    return Crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
};

/**
 * Generates a random hexadecimal string.
 *
 * @param {Number} length
 */
userSchema.statics.generateSalt = function(length = 16) {
    return Crypto.randomBytes(length).toString('hex');
};

/**
 * Changes the users password.
 *
 * @param {string} password
 */
userSchema.methods.setPassword = function(password) {
    this.salt = this.generateSalt();
    this.password = userSchema.statics.encryptPassword(password, this.salt);
};

/**
 * Check to see if the supplied password matches the users current password.
 *
 * @param {string} password
 *
 * @returns {boolean}
 */
userSchema.methods.validPassword = function(password) {
    return this.password === userSchema.statics.encryptPassword(password, this.salt);
};

module.exports = mongoose.model('User', userSchema);