### 性能优化

* 减少HTTP请求
  - 合并请求
  - css sprite
* 使用CDN (Content Delivery Network)
  - 6-8, 10,  以域名为单位的同一个服务器
  - 增加浏览器同时请求的资源数量
  ```html
  <html>
    <script src="1.a.com/a.js"></script>
    <script src="1.a.com/a.js"></script>
    <script src="1.a.com/a.js"></script>
    ...
    <link rel="stylesheet" href="1.a.com/a.js">
    <link rel="stylesheet" href="1.a.com/a.js">
    <link rel="stylesheet" href="1.a.com/a.js">
    ...
  </html>
  ``` 
  * 使用缓存
    - 各种不同类型的缓存类型
    - If-Modified-Since
    - Last-Modified
    - Expores
    - Cache-Control
* 压缩
  - 在http链接上启用gzip压缩
  - 用node实现一下
  ```js
  http.createServer(function(request, response) {

  var compressStream = gzip.createGzip()
  response.setHeaders({
    "Content-Encoding": gzip
  })
  fs.createReadStream('a.js')
  .pipe(compressStream)
  .pipe(response)
  })
  ```
* 将css文件放在页面底部
  - 把css内联在在页面利么一般首页
* 将JS文件放在底部
  - JS的下载和运行都会阻塞/暂停页面的解析和渲染
    + 解析：解析HTML并构建DOM树
    + 渲染：把页面画在屏幕上
  - 为什么JS的下载和运行都会阻塞页面
    + 单线程
    + 页面解析，渲染和js的运行全都是在同一个线程里执行的
    + 执行线程跟UI线程是同一个线程
  - JS的代码是有可能操作DOM的
  ```html
  <p id="p"></p>
  <script>
    document.getElementById('p').innerHTML = 'abc'
  </script>
  ```
* 避免css表达式
  - width: expression('document.body.innerHTML')
  - 已过时
* 使用外部的JS和css
  - 因为不同页面使用相同的个文件的话，缓存就会起作用
* 分赛域名(Domain sharding)
* 减少DNS查找
  - 现在可以用DNS prefetch
* 精简JS
  - 混淆，minifity
    + 去掉多余的空格，注释，换行等所有不必要的内容，同时混淆代码
    + 混淆既能减少代码体积，也能保护知识产权
    ```js
    var a=(f)=>function a(){if(!0){console.log(!0)}};a().then()
    ```
    + uglifyjs a.js b.js
* 避免重定向
  - 响应头
  ```
  HTTP/1.1 302 Removed Temp
  Location: c.com/a.html
  ```
  - 即避免30x请求（缓存除外）
* 移除重复脚本
* 配置ETag
  - ETag是一个http头，类似于文件的hash
  - 一般来说如果服务检测到相同，就可以回复一个304请求
  - 不同的机器上，http服务器(apache)的默认位置
    + 会导致相同的文件内容在不同的机器上返回不同的ETag头
* 使ajax可以缓存
  - $.get('url') -> $.get('url?_=timestamp')
  - 不仅缓存一段内容，还缓存ajax
  - 但要注意不要把不该缓存的内容缓存了
* 把资源存在localStorage里
  - 我们写过POC
  - imququ.com
* HTTP2
  - 强制要求走https
    + https需要证书
    + 证书需要找响应的CA机构去买
