require('babel-polyfill');

var Test = require('../lib/test');


describe('test', function() {
  
  describe('#test', function() {
    
    describe('with an authenticate function used for authorization', function() {
      var test = new Test();
      
      it('should call authenticate', async function() {
        var result = await test.test();
        expect(result).to.equal('hello');
      });
    });
    
  });
  
});
