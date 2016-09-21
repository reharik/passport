/* global describe, it, expect, before */
/* jshint expr: true */

var chai = require('chai')
  , authenticate = require('../../lib/middleware/authenticate')
  , Passport = require('../..').Passport;


describe('middleware/authenticate', function() {
  
  describe('error with callback', function() {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function(req) {
      this.error(new Error('something is wrong'));
    };
    
    var passport = new Passport();
    passport.use('error', new Strategy());
    
    var request, error, user;

    before(async function() {
      await chai.connect.use(authenticate(passport, 'error', callback))
        .req(function(req) {
          request = req;
        })
        .end(function(res) {})
        .dispatch();
    });
    
    it('should pass error to callback', function() {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('something is wrong');
    });
    
    it('should pass user as undefined to callback', function() {
      expect(request.user).to.be.undefined;
    });
    
    it('should not set user on request', function() {
      expect(request.user).to.be.undefined;
    });
  });
  
  describe.skip('error with callback and options passed to middleware', function() {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function(req) {
      this.error(new Error('something is wrong'));
    };
   
    var passport = new Passport();
    passport.use('error', new Strategy());
    
    var request, error, user;

    before(async function() {
      await chai.connect.use(authenticate(passport, 'error', { foo: 'bar' }, callback))
        .req(function(req) {
          request = req;
        })
        .end(function(res) {})
        .dispatch();
    });

    it('should pass error to callback', function() {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('something is wrong');
    });

    it('should pass user as undefined to callback', function() {
      expect(request.user).to.be.undefined;
    });

    it('should not set user on request', function() {
      expect(request.user).to.be.undefined;
    });
  });
  
});
