

const asyncFunc = async () => {
  var fu = await "hello";
  return fu;
}

function Test() {}


Test.prototype.test = async function() {
  var fu2 = await asyncFunc();
  return fu2;

};

module.exports = Test;
