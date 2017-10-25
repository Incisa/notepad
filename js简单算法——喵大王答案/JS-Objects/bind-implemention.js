Function.prototype.bind2 = function(thisValue, ...args) {
  var fn = this
  return function(...args2) {
    return fn.apply(thisValue, args.concat(args2))
  }
}

Function.prototype.bind3 = function(thisValue) {
  var fn = this
  var bindedArgs = []
  for (var i = 1; i < arguments.length; i++) {
    bindedArgs.push(arguments[i])
  }
  return function() {
    var sendedArgs = [].slice.call(arguments)
    return fn.apply(thisValue, bindedArgs.concat(sendedArgs))
  }
}

function foo(a, b, c, d) {
  console.log(this + a + b + c + d)
}

foo2 = foo.bind2(10, 1, 2)

foo3 = foo2.bind2(100)

foo2(3, 4) => 20
