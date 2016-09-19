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
req.logIn =  async (user, options = {}) => {
  if(!this._passport || !this._passport.instance) {
    throw new Error('passport.initialize() middleware not in use');
  }

  const userProperty = this._passport.instance._userProperty || 'user';
  this._passport.session = options.session;
  this[userProperty] = user;

  passport.session.user = await this._passport.instance.serializeUser(user);
  this.session[this._passport.instance._key] = this._passport.session;
};

/**
 * Terminate an existing login session.
 *
 * @api public
 */
req.logout =
req.logOut = () => {
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
req.isAuthenticated = () => {
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
