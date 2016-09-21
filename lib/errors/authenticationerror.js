/**
 * `AuthenticationError` error.
 *
 * @constructor
 * @api private
 */
function AuthenticationError(message, status) {
  new Error(message)
  // Error.captureStackTrace(this, arguments.callee);
  Error.captureStackTrace(this);
  this.name = 'AuthenticationError';
  this.status = status || 401;
}

// Inherit from `Error`.
AuthenticationError.prototype.__proto__ = Error.prototype;


// Expose constructor.
module.exports = AuthenticationError;
