/**
 * Module dependencies.
 */
//var http = require('http')
//  , req = http.IncomingMessage.prototype;


var req = exports = module.exports = {};

/**
 * Initiate a login session for `user`.
 *
 * Options:
 *   - `session`  Save login state in session, defaults to _true_
 *
 * Examples:
 *
 *     req.logIn(user, { session: false });
 *
 *     req.logIn(user, function(err) {
 *       if (err) { throw err; }
 *       // session saved
 *     });
 *
 * @param {User} user
 * @param {Object} options
 * @param {Function} done
 * @api public
 */
req.login =
req.logIn = async function(user, options = {}) {
  const userProperty = this._passport && this._passport.instance._userProperty
    ? this._passport.instance._userProperty
    : 'user';

  // if there is no session established set the user on the req and return
  if (typeof options.session !== 'object' && options.session !== undefined) {
    this[userProperty] = user;
    return;
  }

  // if there is a session established but this._passport is undefined,
  // then you have probably forgotten initialize passport in setup
  if (!this._passport || !this._passport.instance) {
    throw new Error('passport.initialize() middleware not in use');
  }

  this.session = this.session || {};
  this._passport.session = this._passport.session || {};

  try {
    this._passport.session.user = await this._passport.instance.serializeUser(user);
  } catch (err) {
    throw err
  }
  this.session[this._passport.instance._key] = this._passport.session;
  this[userProperty] = user;
};

/**
 * Terminate an existing login session.
 *
 * @api public
 */
req.logout =
req.logOut = function() {
  var userProperty = (this._passport && this._passport.instance) 
    ? this._passport.instance._userProperty 
    : 'user';
  
  this[userProperty] = null;
  if (this._passport && this._passport.session) {
    delete this._passport.session.user;
  }
};

/**
 * Test if request is authenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isAuthenticated = function() {
  var userProperty = (this._passport && this._passport.instance)
    ? this._passport.instance._userProperty
    : 'user';
  
  return (this[userProperty]) ? true : false;
};

/**
 * Test if request is unauthenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isUnauthenticated = function() {
  return !this.isAuthenticated();
};
