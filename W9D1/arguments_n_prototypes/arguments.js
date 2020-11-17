
function sum() {
  const arr = Array.from(arguments);
  return arr.reduce((sum, num) => sum + num);
}

function sum2(...args) {
  return args.reduce((sum, num) => sum + num);
}

Function.prototype.myBind = function(ctx) {
  const bindArgs = Array.from(arguments)
  let that = this;
  return function() {
    const callArgs = Array.from(arguments)
    that.call(ctx, ...bindArgs.slice(1), ...callArgs);
  }
}

Function.prototype.myRestBind = function(ctx, ...bindArgs) {
  return (...callArgs) => {
    this.call(ctx, ...bindArgs, ...callArgs);
  }
}


function curriedSum(numArgs) {
    let nums = [];
    return function _(...args) {
        return (nums = nums.concat(args)).length >= numArgs ? sum2(...nums) : _;
    }
}

Function.prototype.myCurry = function(numArgs) {
  let that = this;
  let args = [];
  return function _curried(...callArgs) {
    args = [...args, ...callArgs]
    if (args.length === numArgs) {
      return that.apply(100, args);
    } else {
      return _curried;
    }
  } 
}
let cs3 = sum.myCurry(3)
console.log(cs3(1));
console.log(cs3(1)(1));
// let curriedMyFunc