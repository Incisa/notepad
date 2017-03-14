###综合测试1
1. web worker有哪些使用场景？如何在node中使用web worker？
  ```
  * 高性能，多任务，高耗时操作，可以放进 worker 中执行。
  * 例：很多模板引擎都是把模板与数据的拼装过程放在worker中执行。
  * 有不少的第三方库可以用web worker
  * 原理是利用node的多进程来模拟worker
  ```
2. 哪些事情不冒泡，如何解决？
  ```
  onfocu/onblur
  onerror/onload

  简单回答：用jQuery，有一些能够让这些事件冒泡
  原理：检测到相应事件后主动在其祖先元素上触发
  ```
3. scroll事件不能阻止有什么解决方案？
  ```
  给不想滚动的元素一个 overflow: hidden；
  可能的问题：加上overlfow: hidden之后滚动位置的状态会丢失
  解决思路：在加上这个样式之前记录滚动位置，在恢复可滚动状态之后复原该滚动位置
  el.scrollLeft/Top
  el.scrollTo(x, y)

  A/B problem
  对于此题
  A问题：想要某些元素不对滚动事件做相应
  B问题：阻止scroll事件

  例2：
  A问题：想要得到一个文件名的扩展名？
  B问题：如何得到字符串的末尾三个字符？
  ```
4. domready事件与load事件有什么区别？其触发事件分别为？
  ```
  DOMContentLoaded, readystatechange, readyState = 1, 3, 8
  load

  domready事件是在dom解析完毕后触发，包含了js的解析和执行
  所以我们会把js尽量放在底部
  如果即希望js放在head里， 又希望它不影响页面渲染，script有一个async/defer属性，加上这个属性之后。 js的下载不会阻塞页面的render了

  load事件是在页面中所有资源（如图片）都请求完成后触发
  ```
5. mouseout/over事件有什么需要注意的问题？有什么解决方案？
  ```
  鼠标从父元素移到子元素的过程中时，父元素就会触发out事件，子元素会触发over事件
  解决方案：在现代浏览器中， 用mouseenter/mouseleave。
  在老浏览器中，用jQuery，$el.hover(enterFn, leaveFn).mouseenter(enterFn).mouseleave(leaveFn)
  原理是：通过检测event.relatedTarget属性来判断
  ```
6. 为什么说 window.onerror 不是真正的事件？
  ```
  window.onerror = function(Error, file, line, col, row){}
  此事件可以用来做错误上报，用ajax把错误的相关信息发送到服务器进行统计分析
  因为回调函数不接收事件对象
  ```
7. 几种事件绑定方式有什么优缺点？
```
3种事件绑定方式
<a onclick="return false;">jd</a>
el.onclick = function(){this.event}
el.addEventListener('click', function(event){}, true/false)
IE8及以下，el.attachEvent('click', function() {})
```
8. 老版本IE浏览器如何添加事件？
```
el.attachEvent('click', function() {})
```
9. Bookmarklet是什么？可以用来干嘛？
```
书签脚本：
以javascript: jscode;的格式给浏览器创建一个书签，点击书签就会在当前打开的页面中执行jscode
也可以把此格式的代码直接放入地址栏回车即执行。
```
10. 详述各种表单元素的DOM指针指向。
```
from
  .method
  .action
  .encode
input
  .form
select
  .options
checkbox
  .checked
radio
  .checked
option
  .selected
```
11. 实现一个jQuery插件
```
$.fn/prototype.plugin = function(){}

$.prototype.trioleclieck = function(){
  this是当前被包装的jQuery对象，而不是原生节点
  对于一下代码this即为divs
  this.each(function(){
  this.addEventListener('tripleclick', handler)
  })
  return this
  <!-- handler.call(this[0]) -->
}
$.prototype.a
$.prototype.b
$.prototype.c
$.extend($.prototype, {
  a:fn,
  b:fn2,
  c:fn3,
})
Object.assign(target,{a:{b:2}}, source2, ...)
_.merge 深合并
深拷贝，浅拷贝

var divs = $('div').triplecleck(function(){
  
})
```
12. touchend事件有什么坑？
```
拿不到touch的点
想要拿到的话只能从拿到最后一次touchmove事件上取得
```
13. 更复杂的收拾检测最好是怎么做？
```最好用第三方框架：
hammer.js
zepyo.js
```
14. 单页滚动框架有哪些？
```
fullpage.js
swiper.js
```
15. 移动端更保险的是用什么事件？
```
click
```
16. 移动端浏览在处理单击事件时为什么会有延迟？
```
因为在一次单击发生后还可能发生第二次单击，浏览器并不知道首次单击的意图，只能等待一段时间后是否发生第二次单击
如何消除这个延迟呢？
fastclick.js
hammer.js
  给元素加一个css属性
  或者用touchstart事件
```
17. 把用户通过inputL:file选择的的图片文件放在img标签种按原始尺寸预览；画入canvas里按照缩小尺寸预览
```
<input type="file" multiplesss>
<img src="" alt="">
<script>
  fileSelect = document.querySelector('input')
  imgTag = document.querySelector('img')

  fileSelect.onchange = function() {
    var file = this.files[0]
    imgTag.src = file.path
  }
</script>
```
18. 如何创建自定义事件并调用，另外给出相关文档
```
https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Creating_and_triggering_events
```
19. 如何得到光标在文本框中的位置？
```
el.selectionStart
el.selectionEnd
```
20. 什么是属性描述符？他可以用来干嘛？
```
property descriptor
是用于描述一个属性的各项特征的对象
如何获得一个属性的属性描述符？
Object.getOwnPropertyDescriptor(obj, 'prop')
Object.defineProperty(obj, 'prop', {
  value:,
  writeable:,
  enumerable:,
  get:,
  set:,
})
Object.defineProperties(obj, {
  prop1: {
    value,
    writeable,
    enumerable,
    get,
    set,
  },
  prop2: {

  }
})

Object.create(null, {
  a: {
    value: 1
  },
  b: {
    value: 2
  }
})
```
21. 列出不能冒泡的的事件
22. innerHTML跟textContent有什么区别？
```
innerHTML 是直接设置元素内部的DOM
textContent 是直接设置元素的字符串内容
```
23. select元素如何支持多选？多选时如何取到所有被选中的元素？
```
<select name="" multiple id=""></select>
select.value
for(optain of select.options){
  if(optain.selected){
    ...
  }
}

Array.from(select.options)filter(it => it.selected).map(it => it.value)
```
24. 请列出尽量多的es6的新语法。
```
反引号
  var str = `abc ${expr + `abc`}`
  fn`abcdef${x}${y}`

箭头函数
  var fn = () => {}
  var fn = _ => 2
  var that = this
  var fn = _ => (this === that) 

解构赋值
  var a = 1
  var b = 2

  var [c, d] = [a, b]
  var {a, b} = {
  a: 1,
  b: 2,
  c: 3
  }

形参解构
  function a({x, y}){
  console.log(x * y)
  }
  a({
  x:1,
  y:8,
  })

  function b([x, y]){

  }

  b([1, 2, 3, 4, 5])

计算属性
  var obj = {
    a: 8,
  }
  obj[x*y] = 9
  var obj = {
    [expr]: 3,
    expr: 5,
    get [a]() {

    },
    set [](value) {

    },
  }

restpara 剩余参数
  function(a, b, c, ...args){

  }

spread operator 数组展开
  Math.max(...[1,2,3,4,5,6,7,8,9]) === Math.max(1,2,3,4,5,6,7,8,9)

let
  用let声明的变量不提升，TDZ， temaper Dead Zone
  {
    var a = 8
    ...
    ...
    ...
    let b =9
    console.log(a * b)
  }

默认参数
  function f(x = 8, y = 9, z = function(){})  

const
  阻止被const声明变量指向其他的值
  const a = expr
  a = xxx //报错

class
  class A {
    //静态方法
    //挂在A上
    //即A.f
    static f(){
      return 8
    }
    //构造函数体
    //即function A(){}
    constructor() {
      this.x = 9
      this.fn = function(){}
    }
    //实例方法
    //即A.prototype.methodA
    methodA(){

    }
  }

forof
对象方法简写
对象属性简写

Map/Set
Symbol
Proxy
gennerator
```
25. 简述你对模板引擎的理解。
```
模板+数据 => 期望的内容
DOM模板
一般是框架接收到被解析完成的DOM节点及数据后就地解析并渲染（in place）
可以使用框架特定的方式绑定/相应事件
```
26. 如何在DOM元素上触发自定义事件
27. 实现一个lazyload功能：页面中的图片默认不显示，之只有快要滚动到视口内才加载并显示出来
```
<img data-src="xx.jpg" width="400" height="500">
不能写src属性，因为浏览器读到后就会立马下载
最后协商witch/height，防止图片加载前后产生的回流（reflow/relayout）（重绘repaint）
el.getBoundingClientRect()//获取能够包裹元素所有矩形块的最小矩形区域
el.getClientRects()//获取组成元素的各个矩形块，一般为内联元素
```
28. 写出各个不同类型的dom元素的原生api：普通元素，表单元素等等。
```
el
  .childNodes
  .children
  .first/lastChild
  .first/lastElementChild
  .parentNode/Element
  .insertBefore(child, newChild)
  .appendChild(newChild)
  .get/setAttribute('attr', value)
  .addEventListener()
```
29. 想要拦截用户的粘贴事件并对粘贴的内容做过滤，应该如何实现？说出思路
```
zeroClipboard.js 点击自动粘贴
========
监听粘贴事件发生时读取剪切板数据，preventDefault()
过滤读取到的剪切板内容
使用selectStart/End来替换选中的文本，达到类似于粘贴的效果
```
30. 说出css常用的单位有哪些，以及他们的意义。
```
相对单位
  px => css像素。一般来说页面，屏幕，等全部一比一的时候一个物理像素就是1px。但是页面放大或者缩小，或者分辨率跟屏幕物理分辨率不同，就不一定是了。
  em => 字号大小
  rem => html（根元素）元素的字号大小
  vh/vw =>视口宽高的百分之一，包含滚动条
  ex => x字符的高度
  ch => 0字符的宽度
  百分比 

绝对单位
  cm/pt/in => 虽然理论上是绝对单位,但是大多数时候都不不符合实际长度。
```
31. polyfill、与shim的区别是什么？
```
polyfill
  能够把新的api在老浏览器里完全实现，这个实现就称为polyfill
shim 垫片
  能够让新的api在老的浏览器中不报错，这个实现就称为shim

  es5-shim
```
32. 详述Node require函数查找模块文件的过程
```
内置模块，直接返回
如果参数像路径（以点开头），则相对于当前文件所在目录查找
  如果这个路径是一个文件，直接加载文件本身/.js/.json/.node
  如果这个路径是一个文件夹
    如果文件夹内没有package.json
      则加载文件夹内的index.js/json/node
    如果文件夹内有package.json
      则加载json.main字段对应的文件
如果即不像路径，又不是内置模块，则是第三方模块。在当前及祖先文件夹的 node_modules 文件夹内部找与模块名相同的文件夹，再读取package.json。

https://nodejs.org/dist/latest-v7.x/docs/api/modules.html#modules_all_together

```
33. 用npm安装模块时，有无-g的区别在哪里？
```
有-g的时候是全局安装
  安装在C:\Users\
  同事，一般来说会安装一个命令行工具
无-g时安装在当前目录的node_modulules文件夹里

npm install
把当前文件夹视作一个node项目
按照语义化版本号要求，安装package.json下的dependences字段下的所有第三方模块
^x.y.z => x不可动（默认）
~x.y.z => x, y都不可动
```
34. 2.71828的二进制形式时多少/（尝试手动转换，二进制同样精确到小数点后5位）
```
10.101101
0.71828 * 2 
1.xx
小数部分*2取整
```
35. 2.71828用IEEE754标准使用32位二进制表示时在计算机中的存储是什么样的？给出内
存中的二进制形式
```
10.10110111111000010011001010110101010111101111001
1.010110111111000010011001010110101010111101111001 * 2 ^ 1

0[10000000]01011011111100001001100
01000000 00101101 11111000 01001100
```
36. 计算中为什么要便用补码来表示负数？
```
补码能够让符号位也参与运算
原理这是同余理论
```
37. 简述对数据库系统以下各个概念的理解：数据库，表，主键，外键，事务，脱敏，连
接，视图，索引，聚集。
```
数据库 - 相当于一个excel文件
表 - 相当于里面的一个sheet
主键 - 表的某一列的值不为空且唯一。也就是说知道主键就可以定位表中的特定的某“一”行
外键 - 表中的某一列的数据来自另一张表（也可以是本表）的主键
事物 - transtation 交易 一手交钱一手交货。数据库西永需要的能够以保证操作的ACID：原子性
脱敏 - 
连接 - 将两张表按照制定的规则生成一张新表。
视图 - 虚表由一个选择结果组成的表。
索引 - 可以为某一列或者多列创建索引，使查找更快。索引会占用空间吗同时也需要与表的内容包吃一致，所以每次修改表的内容时，索引也会相应的修改，所以是会花时间的，但其会让查找变得非常快。
聚集 - aggregate
https://www.sqlite.org/lang_aggfunc.html

sqlite> select * from user;
username    age         gender
----------  ----------  ----------
a           67          1
b           67          0
c           5           1
d           23          1
e           39          0
f           30          1
g           34          0
sqlite> SELECT avg(age), gender from user ;
avg(age)          gender
----------------  ----------
37.8571428571429  0
sqlite> SELECT avg(age), gender from user group by gender;
avg(age)          gender
----------------  ----------
46.6666666666667  0
31.25             1
sqlite> SELECT sum(age), gender from user group by gender;
sum(age)    gender
----------  ----------
140         0
125         1
sqlite> SELECT count(age), gender from user group by gender;
count(age)  gender
----------  ----------
3           0
4           1
sqlite> SELECT count(age), gender from user where gender=1 group by gender;
count(age)  gender
----------  ----------
4           1
sqlite> SELECT count(age) as count, gender from user where gender=1 group by gender;
count       gender
----------  ----------
4           1

```
38. Seajs能够在浏览器中异步加载文件但又同步require的原理是什么？
```
其实是把所有的依赖都下载好之后才开始执行的
那如何在不执行的情况下就分析好依赖呢？
其实是八行书toString然后用正则匹配出内部的require语句
所以，seajs/requirejs中的require语句中只能写字符串常量
seajs.use('a/' + 'jquery.js')
```
39. 如何编写一个自己的Node模块？其原理是什么？需要注意些什么？
```
var fs = require('fs')
exports.a = xxx
exports.b = yyy

moudule.exports = zzz //保险的做法

exports = 8//错误

原理就是module其实是外界传入的一个对象，我们的模块只是在修改这个对象，修改完成之后结束了，外界就能改得到被我们修改过的对象。而我们是在一个闭包（我们的代码被主动包裹在一个闭包内执行）里修改的这个对象嘛所以不会产生全局变量污染的问题。

(function(require, moudule, exports, __dirname, __filename){
  mycode...
  })()
```
40. .gitignore文件的作用是什么？
```
让git忽略对某些文件的主动跟踪
是一个文本文件，一行一个路径
其可以存在于项目中的任何一个文件夹中。可以出现多次，里面的路径都是相对于其所在的文件夹的。

想要把一个文件夹提交上去，但是又要忽略里面所有文件
```
41. 简述你对多线程的理解，以及其与异步的关系
```
多线程就是从宏观角度，有多段代码同时执行。
触发了异步任务之后，其实异步的任务就是在另一个线程中执行的。执行完成之后通知主线程（或触发异步任务的线程）。
```
42. 简述你对事件循环的理解
```
浏览器会每隔一段时间去检查任务队列中是否有需要执行的任务，有的话，就执行。
两次事件循环之间大约为4毫秒的间隔。
process.nextTick(fn)把fn放在当次事件循环之后调用，而不是下一次事件循环里面
```
43. 简述你对tcp协议及http协议的理解，说解释tcp与http的区别
```
TCP就是字节流协议，连接建立好之后，就可以发送或接收任何字节流。
http是基于TCP的应用层协议
http协议只能按照指定的格式在tcp层发送字节流
================
GET / HTTP / 1.1
Host: www.example.com
----------------
HTTP /1.1 200 OK
Content-Type: text/html; charset=utf8
<!DOCTYPE html>
================
```
44. host文件是干嘛用的？
```
本机DNS，如果某个域名条件会出现在hosts文件中，则不会向DNS服务器询问其IP地址。

在一些开发中，可以用来做调试用。
a.com -> 1.2.3.4 //a.com的真实ip地址
a.com 127.0.0.1 //写在hosts中的条目
最终访问的的就是127.0.0.1这个ip地址的服务器
然后可以在127.0.0.1上搭一个跟线上一样的服务器，就可以本地调试了。
```
45. 调度复杂的同步异步混合代码需要注意什么？
```
时序。即哪段代码先执行哪段代码后执行。
解决方案：promise
```
46. cookie是什么？
```
cookie就是服务器通过http头（Set-Cookie）或者JS通过document.cookie设置的保存到浏览器的一段文本内容，会在浏览器每次发送请求时都通过cookie头带上并发送到服务器。

标识用户。
一半来说用户登陆之后，服务器就会下发一段加了密的cookie。
```
47. JSONP的原理是？
```
JSON Padding
用途：合理的跨域访问。

a.com:
<script>
function jsonp12345(data){

}
</script>
<script src="b.com/data?x=1&y=2&callback=jsonp12345"></script>
<!-- 
jsonp12345({

})
 -->
<script src="aaa.com/"></script>
<img src="xxxx.com" alt="">

不能发POST请求
能不能处理错误
script.onerror

window.onerror
img.onerror
script.onerror

能不能处理超时的请求呢？？？
xhr
setTimeout(fn, timeoutDuration)

```
作业：
实现JSONP请求的超时处理，调用方式如下：
jsonp('path?querystring&callback=?', onsuccess, ontimeout)
```js
function jsonp(url, ansuccess, ontimeout) {
  var loaded = false
  var timeout = false

  var globalCallbackName = '__jsonp__callback__' + Date.now() + Math.random()
  window.[globalCallbackName] = function(data) {
    if (!timeout) {
      onsuccess(data)
    }
  }

  url = url + '&callback=' + globalCallbackName
  //path?a=b&c=d&callback=__jsonp__callback__
  var scripttag = document.createElement('script')
  scriptTag.onload = function(){//加载并执行完成后触发
    document.body.removeChild(scriptTag)
    delete window[globalCallbackName]
    loaded = true
  }
  scriptTag.src = url
  document.body.appendChild(scriptTag)

  setTimeOut(function(){
    if (!loaded) {
      onTimeout()
      timeout = true
    }
  },5e3)
}

__jsonp__callback__({
  data: {
    name: 'xieran',
    age: 30,
  }
  }) 
```
