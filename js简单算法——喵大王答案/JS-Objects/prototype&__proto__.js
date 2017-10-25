function create(proto) {
  var Object = function Object() {}
  var obj
  Object.prototype = proto
  obj = new Object()
  Object.prototype = null
  return obj
}

function getPrototpyeOf(obj) {
  return obj.__proto__
}

function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto
  return obj
}

function forEach(array, iterator) {
  for (var i = 0; i < array.length; i++) {
    iterator(array[i])
  }
}

forEach([1, 2, 3], console.log)



var staffProto = {
  work: function() {
    console.log('work till die')
  }
}

xieran = Object.create(staffProto)
tianxiaobo = Object.create(staffProto)
shifanghong = Object.create(staffProto)
dongliang = Object.create(staffProto)

xieran.work()



function Staff(name, age) {
  // this is an empty object here
  this.name = name
  this.age = age
}

Staff.prototype = {
  work: function() {
    console.log('working')
  }
}

var xieran = new Staff('xieran')

Object.getPrototpyeOf(xieran) === Staff.prototype

Staff.prototype.__proto__ === Object.prototype

当用new操作符来调用一个函数的时候
这个函数返回的对象将自动以
  `构造函数.prototype`
做为其原型


构造函数： 类型
由构造函数创建出来的对象： 实例

人
谢然

学生 类型
石方红 实例



function People(name, age, gender, id) {
  this.name = name
  this.age = age
  this.gender = gender
  this.id = id
}


p1 = new People('xieran', 28, 'male', 'sldkjf')
