1. 写出优化大型页面滚动过程的代码： -->
<!-- 将不在视口区域内的元素隐藏起来 -->
<!-- 将在视口区域的元素显示出来的代码 -->
<!-- 但是不能让它们的隐藏或显示影响页面布局 -->
<!-- 具体的隐藏方式可任意 -->

<!-- 2, jQuery相关的题目 -->
<!-- jQuery实例的end方法是什么意义 -->
end()方法能够回到最近的一个"破坏性"操作之前，即将匹配的元素列表变为前一次的状态。
<!-- jQuery实例的链式调用是如何实现的？ -->
当调用jQuery方法的时候，同时也返回了这个实例。那么在构造函数中就可以访问原型中的属性和方法，所以每次调用都可以使用原型中的属性和方法。
<!-- jQuery构造函数有哪几种调用方式？ -->
<!-- jQuery对象与HTMLElement对象有哪些区别？ -->

<!-- 3, 实现Function.prototype.bind2方法。如果可以，实现占位符的功能 -->

<!-- 4. 给Array类的实例新增如下两个方法last/first以返回数组的第一项和最后一项写出完整代码 -->
```js
var Array = Function(){}

var arr = new Array()

arr.first = function(arr){
	return arr[0]
}

arr.last = function(arr){
	return arr[arr.length - 1]
}
```

<!-- 5. 实现功能更强的函数重载，使其可以如下调用： -->

<!-- 6. 严格模式是什么？如何触发？有哪些限制？ -->
严格模式是 JavaScript 中的一种限制性更强的变种方式。严格模式会将 JavaScript 陷阱直接变成明显的错误。同样的代码有些时候严格模式会比非严格模式下更快。禁用了一些有可能在未来版本中定义的语法。
要给某个函数开启严格模式，得把 "use strict" 声明一字不漏地放在函数体所有语句之前。

<!-- 7. try catch finally 语句一般在什么情况下使用？有哪些需要注意的问题？ -->
在程序中有可能出现某些错误并且提示出某些错误给开发人员显示。
任何执行 try 或者 catch 中的 return 语句之前，如果 finally 语句块存在，都会先执行 finally 中的语句，如果 finally 中有 return 语句，那么程序就直接 return 。

<!-- 8. 使用ES5实现ES6标准库中的Map/Set两个类 -->

<!-- 9. 简述面向对象的三大特性 -->
封装：每个对象都包括自己进行操作所需要的所有信息，而不依赖于其他对象来完成自己的操作。这样的方法和属性通过类的实例来实现。
继承：继承是指这样一种能力：它可以使用现有类的所有功能，并在无需重新编写原来的类的情况下对这些功能进行扩展。
多态：所谓多态就是指一个类实例的相同方法在不同情形有不同表现形式。多态机制使具有不同内部结构的对象可以共享相同的外部接口。

<!-- 10. 什么是多重转义，在什么时候会用到？使用合适的语言描述出来。 -->

<!-- 11. 什么是正则表达式中的零宽断言？并举出至少两个使用场景。 -->
没有长度的位置判断符号，仅仅表达一个元素之间的位置。

<!-- 12. 分别说出以下几个与正则相关的函数的【各种】用法，可以查文档 -->
<!-- String.prototype.replace -->
string.replace(/.../, replacer)
string.replace(/../, $1, $2)
<!-- String.prototype.search -->
str.search(regexp)
<!-- String.prototype.match -->
str.match(regexp)
<!-- RegExp.prototype.test -->
regexObj.test(str)
<!-- RegExp.prototype.exec -->
regexObj.exec(str)

<!-- 13. 解释一下你对构造函数的理解 -->
构造函数是一个初始化的对象，通过共享其原型中的属性和方法来使实例的内容简单化。

<!-- 14. 使用js语言实现如下功能 -->
```js
Function Preson(name){
	this.firstname = name.match(/.*(?<=\s)/)
	this.lastname = name.match(/.*(?=\s)/)
}
var damiao = new Person('Xie Ran')
```
<!-- 15. 什么是vanilla.js？ -->
原生js

<!-- 16. 简述你对md5（也叫校验和、文件摘要、文件指纹）的理解 -->
MD5是一种加密算法，现在多用于文件的检验

<!-- 17. Base64编码一般用在什么场景？它存哪些问题？ -->
在网络上交换数据要经过多个路由设备，由于不同的设备对字符的处理方式有一些不同，这样那些不可见字符就有可能被处理错误，不利于传输。所以就先把数据先做一个 Base64 编码，统统变成可见字符，这样出错的可能性就会降低。

<!-- 18. HTML、JS、正则表达式、URL encode等的转义符分别是什么 -->
HTML,JS,正则多数用“\”转义。也可以用转义字符表示。URL的特殊符号必须用转义符号表示。

<!-- 19. 封装异步ajax请求为一个函数request，要求功能如下： -->
```js
var http = require('http')
http.createserver(function(req, res){
	res.writeHead(200, {'Content-Type', 'text/plain'})
	res.body('')
	res.end()
}).done(function(res){}).error(function(){})
```
<!-- 20. 为字符串对象增加一个方法replaceAll（wildcard，target），讨论poilfill -->

