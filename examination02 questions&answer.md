###面试题

* 盒模型
  - box-sizing
  - doctype ie6 有的话按照content box来渲染，又有的话按照border box来渲染
  - z-index
  - position
  - inlinebox/block/inlineblock/flex
* 原型链
  - 在对象的ownprop上访问不到某个prop的时候那就到对象的__proto__访问同名属性
  - a = new A()
    + a.__proto__ === A.prototype
  - 继承在js里就是用这两个特性实现的
* 闭包
  - 从一个函数内部返回了一个在那个作用域内创建的函数
  - 外部（不一定是全局）有一个变量指向一个局部作用域内的函数
  - 在离开此作用域之后，只有这个函数能够操作此作用域内的变量
  - 这就实现了一定程度的封装
* 作用域链 scope chain
  - 某段代码在访问某个变量时，首先在当前作用域访问
  - 如果访问不到，就在当前作用域的父作用域下访问
  - 还是访问不到，就在父父作用域下访问
  - 最终访问到全局作用域
* Array.sort
  - [{},{},{}].sort((a,b) = {-/0/+})
  - [{},{},{},'[Object object]'].sort()
  - 多级排序
    + [].sort(最低优先级).sort().sort(最高优先级)
    + 自己实现一个稳定的排序算法
    + 第三方库（例如lodash）
    + _.sortBy/With
    + _.sortByAll([], 'sum', 'yunwen', 'shuxue')
  - [].sort(_ => Math.radom() - 0.5)
    + 洗牌算法
    + https://bost.ocks.org/mike/shuffle/compare.html
* 事件流（即事件模型）顺序：捕获和冒泡
  - 此处“流”的意思是事件对象从哪个元素到哪个元素的
  - event passive mode
* 网址解析过程
  - 可以从tcp层开始讲起，监听，连接，浏览器的解析
  - 百度fex团队写过一篇过于详细的文章，可作为参考
  - 解析网址的各个部分（协议，域名，端口，路径）
    + 在hosts文件中查找域名对应的ip
    + 没有的话请求DNS
      * DNS是少有的基于UDP的协议，默认端口是53
        - 速度快
        - 包体小
  - 连接到服务器对应的端口（http80, http442）（ssh23）（FTP21,22）
  - 连接建立成功后，就发送http请求
  - 服务器收到请求后，会读取url，cookie
  - 从数据库中查询出相应的数据，读取模板，拼接html
  - 返回给浏览器（可以说很细）
  - 浏览器收到响应之后，通过Content-Type来决定如何渲染页面
  - 解析html，解析过程构建dom树（又可以说一大堆东西）
  - 解析过程中遇到了需要的外部资源（css，js，img），就会启动一个线程去下载响应的资源。但是一般浏览器针对同一服务器端口（即域）的并行下载数量为6到8个，这也就是为什么不少网站把图片，css等放在另一个域名上的原因
  - css的下载是不会阻塞页面渲染的
  - js的下载会阻塞
    + 如果让js的下载也不阻塞页面render呢
      * defer，async
  - 当css/图片下载完的时候，就需要渲染页面，会产生回流（会闪一下）
    + 所以呢页面有时会白屏一小会，如果这个时间段css下载完成了，浏览器就一次性渲染，就不会产生闪烁了。
    + 另一种实践就是把首页首屏直接放在style标签中内联。
      * taobao.com
  - 如果浏览器中有缓存，可能就不去下载了
    + 304协商缓存，会发请求，可能会没有响应
    + 强缓存，只要过期时间没到，就不发请求
* 目录计算问题 ./a/b/../../../ac/../...
  - 化为最简形式
  - 面试者提了一个正则算法，多级../../的怎么优化没有考虑到
  - 解决方案
    + path.resolve() （只能在node中用）
    + path.resolve由于是用纯js写的，所以可以直接用到浏览器中，node模块是直接可以用在浏览器中
    + a = document.createElement('a')
    + a.href = path
    + return a.href ,done!
    + 正则，'..'与其前面一个路径中和，然后一致找不到可中和项为止
    + 直接按照path.sep进行split，然后用一个栈搞定：
      * 遇到一个内容就把他压入栈中，遇到'..'就把栈顶的元素弹出来，如果遇到'..'时栈为空，就什么也不做。拆分后的数组全部处理完就搞定了。
    ```js
    function resolive(path) {
      return path.split("/").reduce((arr,seg) => {
      if (seg =='.') {
        if ((arr[arr.length - 1] != '..' )|| (arr.length == 0)) {
          arr.pop()
        } else {
          arr.push(seg)
        }
      } else if (seg == '.') {

      } else{
        arr.push(seg)
      }
      return arr
      },[]).join('/')
    }
    ```
* jQuery
  - 实现方式
    + rAF
    + setTimeout
  - 使用方式
    + $(el).animate({
      prop:targetValue
      prop2:'+=diffvalue'
    },'fastnormal/slow/500',callback)
    + $(el).toggle/show/hide/slideToggle/slideDown/slideUp()
  - 动画还爱问的问题
    + 动画队列
    + $(el).css({width:10,height:10}).animate({width:100}).animate({hight:100})
    + 前面的动画执行完才执行后面的动画。
    + 有一个选项可以选择模式，默认是队列模式。
    + 在animate函数增加第二个参数queue:false
* 服务器分辨不同的用户
  - 就是想问cookie
  - Set-Cookie:
  - document.cookie = 'cookie content'
  - document.cookie -> all cookies
  - Cookies: all cookies
* css文件标签
  - <a href="a.pdf">下载</a>
  - [href$=.pdf]::after{content:url(pdf,gif);...}
* 事件代理/委托
  - 原理：事件冒泡
  - 功能：节省内存
  - 让动态添加进来的节点也能够方便的响应事件
* cookie和session
  - session
  - sessionStorage 浏览器关闭就会清空
* HTML和XHTML的区别
  - XHTML是按照XML的格式来写HTML，语法限制更加严格
    + 必须双引号
    + 纸币和标签也必须有结束的斜杠<hr/><br/>
    + <a @click="f()">click</a>可能就不符合xml规范了
* 清除浮动/闭合浮动
  - 清除浮动 针对浮动元素父元素的兄弟元素
  - 闭合浮动 针对浮动元素的父元素
* Ajax
  - XMLHttpRequest
  - $.ajax(url,{option})
  - $.get/post/getScript/getJSON
  - fetch(url,optain).then()
    + 不能撤销
    + 默认不发cookie
  - http.request(url,option)
  - xhr
  - superagent/axious/request.js这些第三方库，在node和ajax下都封装一致
    + 谢大喵鼎力推荐axious
* jQuery扩展
  - jQuery.extend/Object.assign/_.assign
  - jQuery工具函数
* 包装对象与原始对象，及之间的转换
  - wrapped.valueOf() -> 原始类型
  - Object(原始类型) -> 包装类型
* 如何跨域
  - CORS
  - JSONP
  - 代理（很少有网站这么做）
  - iframe也可以跨域
  - chrome.exe --disabled-web-security --user-data-dir="c:/data"
* 类型判断 
  - typeof
  - instanceof
  - a.constructor
    + A.prototype.constructor === A
  - Object.prototype.toString.call(obj) -> '[Object Array]'
* css reset的作用和用途
  - reset.css
    + 一般来说，reset是把元素弄成一样的
  - normalize.css
    + 这个是把所有元素弄到在不同浏览器里一样就好了
    + 现在一般用这个方案
    + 可以看一下这个项目的源代码
  - Reset重置浏览器的css默认属性
  - 浏览器的品种不同，样式不同，然后重置，让他们统一
* css3 flex布局玩转程度
  - flex froggy
  - flex containter/item
  - flex-basis/grow/shrink
  - main/cross axis
* css图像精灵（Image Sprites）
  - 图像精灵是放入一张个单独的图片中的一系列图像
  - 包含大量图像的网页需要更长事件来下载，同时会生成多个服务器请求。
  - 使用图像精灵将减少服务器请求数量并且节约带宽
  - 现在更多用iconfont/svg解决
  - 在http2shidai ,sprite应该会淡出的
* css中单位px，em，rem的区别
  - px像素（pixel）相对长度单位。像素px是相对于显示器屏幕分辨率而言的
    + 大小取决于
      * 屏幕的宏观尺寸
      * 操作系统的显示分辨率
      * 网页的放大倍数
* 什么叫优雅降级和渐进增强
  - 渐进增强 progressive enhancement: 针对低版本浏览器进行构建页面，保证最基本的功能，然后在针对高级浏览器进行效果，交互等改进和追加功能达到更好的用户体验。
* 如何消除一个数组里不重复的元素
  - 数组去重
    + 注意NaN与自己不相等
  - lodash.unique
* 如何将一个数组快速排序
  - 排序稳定性问题
  - 直接调用sort还是自己实现
  - 是否考虑多级排序
* 对象复制
  - 深复制/拷贝
    + 复制对象的属性及属性的属性一直到原始类型
  - 潜复制/拷贝
    + 只复制对象自己一层的属性
      * 对数组来说，a.slice()即可
      * 对于对象来说，一次for in Own就可以了
  - 一般情况下用递归就可以了
  - 与isEqual差不多，只不过一个是递归对比，一个事递归复制
  - 注意循环引用
  ```
  a = {x: 1, y: 2}
  a.z = a
  ```
  - 上面这种情况lodash的相关函数是可以搞定的
    + Lodash.clone
* 描述一下cookies，sessionStorage和localStorage的区别？
  - cookie每次都会跟着请求发送，流量问题等
  - sessionStorage与localStorage是存在浏览器中，由js去读取
  - sessionStorage会在浏览器关闭时清空，localStorage这回一直等到你主动清空。
* javascript事件不会事件冒泡以及委托机制
  - 事件委托即事件代理
* fiddler调试代理工具
  - fiddler本质上是一个http代理服务器
  - 他会经过它的所有tcp流量都捕获并显示出来，方便调试
* 行内元素有哪些？块级元素有哪些?
  - 块级元素
    + div,p,h1,h2,h3,h4,from,ul
  - 行内元素
    + a,b,br,i,span,input,select
* css选择符有哪些？那些属性可以继承？
  - el
  - .class
  - #id
  - [attr]
  - [attr*^$~|=value]
  - :hover:active:link:visited
  - el.class#id[attr]:hover
  - a b c d > e > f
  - a ~ b
  - a + b
  - prop: inherit;
  - 默认继承的属性
    + color
    + font
    + line-height
* 清除浮动有哪些方式，比较好的是哪一种
  - .clearfix::after {clear:both;content:'';display:block}
  - overflow:hidden
* css3实现圆角（border-radius），阴影（box-shadow）对文字加特效（text-shadow）
* 响应式布局用什么实现？
  - media query
  - block flow
    + min/max-width
  - flex
  - <meta name="viewport" content="width=device-width">
* 如何消除一个数组里面重复的元素？
  - uniqed = Array.from(new Set(arr)) //es6方法
* 添加，删除，替换，插入到某个节点的方法
  - obj.appendChild(child)
  - obj.innersetBefore(oldChild,newChild)
  - obj.replaceChild(oldChild,newChild)
  - obj.removeChild(child)
* split()/join()的区别
  - 前者是切割成数组的形式，后者是将数组转换成字符串
* this的指向
  - 是由所在函数的调用方式决定的
* "==="和"=="的不同
  - 前者会自动转换类型，后者不会
* 如何阻止事件冒泡的默认机制
  - preventDefault()
  - stopPropagation()
  - return false
* 如何理解和应用js闭包
* 同源策略
  - 一段脚本只能读取来自于同以来元的窗口和文档的属性
  - 这里的同一来源指的是主机名，协议和端口号的组合
* http状态吗有哪些？分别表示什么
  - 100 101
  - 200 201
  - 301 302 304 307
  - 401 403 404
  - 500 501 502
* 网页打不开了，如何检查是哪的问题？
  - cmd打开 ping当前网站
    + 是域名不存在，还是dns服务器没有连接上
  - 打开控制台查看network,刷新页面
    + 查看状态码，以及错误码(failed)
  - 本地hosts是否更新
  - network_error
  - 4xx/5xx
  - 首先要做的就是打开devtools然后查看network面板
* jQuery熟悉程度，它由哪些模块组成，分别的作用？
  - DOM操作
  - Ajax
  - 动画
  - 选择器
  - 属性操作
  - 内容筛选
  - 事件
  - 详情《锋利的JQ》一书中有介绍
* 你认为node可以用在哪些方面中，最近在用node做什么？
  - 因为js有完全的网络，文件等的访问能力，理论上可以拿来做任何其他语言可以做的事情
  - 目前社区主要用来做
    + 前端开发构建工具
      * grunt/gulp 任务运行期 task runner 
      * browserify/webpack 打包工具
      * uglifyjs(混淆js代码)
    + 高性能HTTP服务器
      * 其实并没有nginx性能高
  - 让自己成为全栈工程师（划掉）
* 前端的理解
  - 把数据展现出来，有一些交互
  - 可以做网站，webapp
  - 前端工程化
* 行内元素如何设置高度？
  - 设置成行内块元素
* 如何用js取到当前访问页面的url，如何从url中获取？之后的东西
  - location.href
  - location.search
    + .href
    + .hash
    + .search
    + host
    + protocol
    + .pathname
* web安全
  - xss Cross Size Scripting 跨站式脚本 网页中执行了代码片段
    + 防御手段：过滤，把有可能出现的脚本的位置转义
  - csrf Cross Site Request Forgery 跨站请求伪造 通过跨域的方式请求一个url
    + 防御手段：用token来做验证，而token只能被同域的代码访问到
  - 《Web前端黑客技术揭秘》
* position的取值
  - absolute 绝对定位
  - relative 相对定位
  - fixed 固定定位
  - sticky 粘性定位
* 如何布局
  - flexbox
  - float
  - inline-block
  - block content
  - BFC(块级格式化上下文)
  - position
* 如何判断一个变量是数组
  - Array.isArray
  - arr instanceof Array
  - arr.__proto__ === Array.prototype
  - arr.constructor === Array
  - Object.prototype.toString.call(arr) === '[object Array]'
  - lodash中 _.isArray
* 十六进制转换十进制
  - parseInt('ff039B', 16)
  - 11 * 16^0 + 9 * 16^1 + 3*16^2 + 0 + 15 * 16^4 + 15 * 16^5
* typeof 返回值有哪些？
  - undefined
  - string
  - number
  - object
  - boolean
  - function
  - symbol
* Function是对象还是函数，和function有什么关系
  - Function是函数，构造出来的对象是函数的实例
  - Function instanceof Object -> ture
  - Object instanceof Function -> ture
  - Object instanceof Object -> ture
  - Function instanceof Function -> ture
* 什么是http代理
  - 中转站，相当于路由
  - 代为处理你的网路请求
* http方法有哪些？怎么决定用哪个？
  - get 往url后面拼参数                                 SELECT
  - post 把请求的数据放进body里去                       UPDATE
  - delete 删除服务器上某一个东西，当然你需要有权限     DELETE FROM
  - put 往服务器放置一些东西，当然也需要有权限          INSERT INTO
  - 其实就是增删改查 C R U D （Create Retrieve Update Delate）
  ========================
  DELETE /user/123 HTTP/1.1
  ...
  PUT /register HTTP/1.1
  ========================
* $函数接收哪些类型的参数，分别有什么用？
  - 传css选择器，返回一个DOM的jquery对象
  - 传HTML，包裹成一个和query对象
  - 传js对象，$([1,2,3,4,5]) $(document.querySelectorAll('span'))
  - 传jquery对象，制造副本
* 如何用jQuery修改img的src
  - .attr('src', 'xxx')
  - 设置textarea的值(记混)
    + $('textarea').val('the content')
* 现在node的长期支持版本（LTS Long term Support)版本是多少？最新版本是多少？
  - LTS 6.9.5
  - 最新 7.5.0 （还在飞速更新）
* node的异步是如何实现的
  - 异步背后是用多线程实现的
  - 具体实现是libuv 其实是用C++写的
  - 跨平台的异步I/O
  - 线程池/连接池 pool
  - HTTP 1.1
  - connection: keep-alive
* 设计一个dialog组件 （弹出窗口）
  - 点击按钮，绑定click事件
  - 让dialog display: none; 切换成block弹窗的样式
  - 屏幕居中
  - 加上遮罩层
  - 防止滚动（overflow:hidden）
  ```js
  //初始接口
  var clicked = openDialog('are you OK?', function onClickYes(){
    coding...
    }, function onClickNo(){
    coding...
  })
  //可以封装成
  openDialog('are you OK?').then().catch()
  ```
  - 第三方库
    + smalltalk
    + https://github.com/coderaiser/smalltalk
* html标签里的js,css可以从其他域加载
  - 为什么可以呢？
    + 信任问题
  - ajax域名不同于跨域
* 如何热解决跨域
  - jsonp
  - cors http header里添加字段 
    + Access-Control-Allow-Origin: a.com, b.com
    + Access-Control-Allow-Origin: * 
* websocket 没有跨域问题
  - ws = newWebSock('ws://a.com/a/b/c')
  - ws.onmessage
  - ws.send()
  - Socked.IO
* 如何获取 UserAgent
  - JS: navigator.userAgent
  - 服务器: User-Agent头
* web安全
  - xss
  - csrf
  - sql inject sql注入
* 事件模型，事件监听，事件捕获，事件冒泡
* 阻止冒泡
  - e.stopP的一个方法
  - jQuery return false
* mobile 图片切图
  - 移动端小米商城
  - viewport
  - rem
  - vh/vw
  - flex
  - media query
* prototype 和__proto__
  - prototype，js用来构造函数作为实例工厂
  - 实例的__proto__指向构造函数的prototype
  - 函数有prototype
  - 实例有__proto__
* 什么是http代理
  - 一个遵循协议的代理
  ```
  ============
  GET http://a.com/a.html HTTP/1.1
  User-Agent:xxx
  ============
  ```
* 设计一个dataTable,至少包含分页，单选多选，搜索。
  - Dom结构
  ```html
  <input type="text" id="search">
  <select name="" id="">
    <option value="">请选择要搜索的字段</option>
  </select>
  <table>
    
  </table>
  <ul>
    <li>第一页</li>
    <li>第二页</li>
    <li>第三页</li>
  </ul>
  ```
  - 搜索
    + 搜索的结果尽可能的多
  - 分页
    + 一页显示多少条数据
  - 排序
    + 按任意的列去排序
    + 可能必须要用稳定的排序算法
  - 大致接口设计
  ```js
  var dt = new DataTable({
    data:[{name:'a', score: 100},{name:'b', score: 90},{name:'c', score: 80}],
    data:[['a', 100], ['b', 90], ['c', 80]],
    tableHead: ['name', 'score'],
    el: '#table',
    theme: 'light/dark'
    pageSize: Infinity,
    pageNum: 8,
    pageChange: function(prevPage, nowPage){

      },
    sortBy:['abc', 'def'],
    search: function(text){

      },
    })

    dt.set('pageSize', 20)
    dt.on('...')
  ```
  - 缓存
    + DOM缓存 
* 排序算法的复杂度
  - 复杂度从最快到最慢排序
    + 1
    + logN
    + N -> 桶排序
    + N*logN -> 快排，堆排
    + N*N -> 冒泡，插入，选择
    + N*N*N
    + N^x
    + x ^ N
* 链表倒叙
  - 将链表倒叙并返回倒叙后链表的头节点
  ```js
  function reverse(linkList){
    if (!linkList) {
      return linkList
    }
    var head = linkList //当前链表的头节点
    var tail = linkList.next //从第二个节点开始的子链表
    var reversed = reverse(tail) //把子链表倒叙并返回子链表性的头节点（即原来的尾部）
    //head.next = null
    tail.next = head
    return reversed
  }
  ```
  - 上述代码缺点是链表长度无法超过栈的深度，超过会爆栈。
  - leetCode上206题
    + 可以先算出栈的长度，超过长度分割成多个链表，倒叙每一个链表后在合并
* inline/block/inline-block的区别
  - inline元素折行时折行处的垂直border是否还有
    + 答案是没有
  - 如果我就是想要折行处有border怎么办呢？
    + 面试官说他也不知道，就想问一问
    + 其实答案是可以用box-shadow代替那一块的缺失
    + 要是问水平方向的padding怎么办？
      * 再用box-shadow试试。
* stream
  - 有什么优缺点
    + 节省内存
    + 因为是异步的，所以空闲事件主线程可以干别的事
  - 既然十八一个流里的内容导到另一个流里，为什么不能用for循环呢？例如如下
  ```js
  rs = fs.createReadStream('a.txt')
  ws = fs.createReadStream(...)
  for(;;){
    ws.write(rs.send())
  }
  ```
      + 答案：for循环是同步的，而流的过程是异步的，for循环执行完毕前都需要等待
* iframe的各种作用
  - 跨域
  - 沙盒
  - 在没有ajax的时候做不刷新页面的表单提交
* svg在页面上有多少种使用方法？
  - 直接嵌入
  - img/iframe/object等标签引入
  - viewBOx
  - use
  - 都能算是不是的用法
  - 具体看你了解多少
* line-height计算方式
  - 1.5
  - 150%
* webfont闪烁加载的原因及解决方案与fonc的区别
  - 做字体子集
  - 把字体转成datauri内嵌到css里面
* 双向绑定的解决方案，如何实现
  - getter/setter
  - 脏检查（dirty check），angular用的方式
  ```js
  var data = {}

  dirtyCheck(data, function(){
    console.log(8)
  })
  ```
* 如何处理异步复杂流程
  - 在promise之前有node的domain，不过已废弃
  - promise，可polyfill到ie6
  - es7：async
