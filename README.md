# chrome extension

## 1、项目功能

## 2、chrome 核心内容介绍

### manifest.json

用来配置所有和插件相关的配置，必须放在根目录。其中，manifest_version、name、version3 个是必不可少的。

```js
{
 // 清单文件的版本，这个必须写，而且必须是2
 "manifest_version": 2,
 // 插件的名称
 "name": "demo",
 // 插件的版本
 "version": "1.0.0",
 // 插件描述
 "description": "简单的Chrome扩展demo",
 // 图标，一般偷懒全部用一个尺寸的也没问题
 "icons":
 {
 "16": "img/icon.png",
 "48": "img/icon.png",
 "128": "img/icon.png"
 },
 // 会一直常驻的后台JS或后台页面
 "background":
 {
 // 2种指定方式，如果指定JS，那么会自动生成一个背景页
 "page": "background.html"
 //"scripts": ["js/background.js"]
 },
 // 浏览器右上角图标设置，browser_action、page_action、app必须三选一
 "browser_action":
 {
 "default_icon": "img/icon.png",
 // 图标悬停时的标题，可选
 "default_title": "这是一个示例Chrome插件",
 "default_popup": "popup.html"
 },
 // 当某些特定页面打开才显示的图标
 /*"page_action":
 {
 "default_icon": "img/icon.png",
 "default_title": "我是pageAction",
 "default_popup": "popup.html"
 },*/
 // 需要直接注入页面的JS
 "content_scripts":
 [
 {
 //"matches": ["http://*/*", "https://*/*"],
 // "<all_urls>" 表示匹配所有地址
 "matches": ["<all_urls>"],
 // 多个JS按顺序注入
 "js": ["js/jquery-1.8.3.js", "js/content-script.js"],
 // JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式
 "css": ["css/custom.css"],
 // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
 "run_at": "document_start"
 },
 // 这里仅仅是为了演示content-script可以配置多个规则
 {
 "matches": ["*://*/*.png", "*://*/*.jpg", "*://*/*.gif", "*://*/*.bmp"],
 "js": ["js/show-image-content-size.js"]
 }
 ],
 // 权限申请
 "permissions":
 [
 "contextMenus", // 右键菜单
 "tabs", // 标签
 "notifications", // 通知
 "webRequest", // web请求
 "webRequestBlocking",
 "storage", // 插件本地存储
 "http://*/*", // 可以通过executeScript或者insertCSS访问的网站
 "https://*/*" // 可以通过executeScript或者insertCSS访问的网站
 ],
 // 普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的
 "web_accessible_resources": ["js/inject.js"],
 // 插件主页，这个很重要，不要浪费了这个免费广告位
 "homepage_url": "https://www.baidu.com",
 // 覆盖浏览器默认页面
 "chrome_url_overrides":
 {
 // 覆盖浏览器默认的新标签页
 "newtab": "newtab.html"
 },
 // Chrome40以前的插件配置页写法
 "options_page": "options.html",
 // Chrome40以后的插件配置页写法，如果2个都写，新版Chrome只认后面这一个
 "options_ui":
 {
 "page": "options.html",
 // 添加一些默认的样式，推荐使用
 "chrome_style": true
 },
 // 向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字
 "omnibox": { "keyword" : "go" },
 // 默认语言
 "default_locale": "zh_CN",
 // devtools页面入口，注意只能指向一个HTML文件，不能是JS文件
 "devtools_page": "devtools.html"
}
```

### content-scripts

Chrome 插件中向页面注入脚本的一种形式（虽然名为 script，其实还可以包括 css 的），借助 content-scripts 我们可以实现通过配置的方式轻松向指定页面注入 JS 和 CSS，最常见的比如：广告屏蔽、页面 CSS 定制，等等。

```js
{
 // 需要直接注入页面的JS
 "content_scripts":
 [
 {
 //"matches": ["http://*/*", "https://*/*"],
 // "<all_urls>" 表示匹配所有地址
 "matches": ["<all_urls>"],
 // 多个JS按顺序注入
 "js": ["js/jquery-1.8.3.js", "js/content-script.js"],
 // JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式
 "css": ["css/custom.css"],
 // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
 "run_at": "document_start"
 }
 ],
}
```

如果没有主动指定 run_at 为 document_start（默认为 document_idle），下面这种代码是不会生效的：

```js
document.addEventListener('DOMContentLoaded', function () {
  console.log('我被执行了！');
});
```

content-scripts 和原始页面共享 DOM，但是不共享 JS，如要访问页面 JS（例如某个 JS 变量），只能通过 injected js 来实现。content-scripts 不能访问绝大部分 chrome.xxx.api，除了下面这 4 种：

- chrome.extension(getURL , inIncognitoContext , lastError , onRequest , sendRequest)
- chrome.i18n
- chrome.runtime(connect , getManifest , getURL , id , onConnect , onMessage , sendMessage)
- chrome.storage

### background

是一个常驻的页面，它的生命周期是插件中所有类型页面中最长的，它随着浏览器的打开而打开，随着浏览器的关闭而关闭，所以通常把需要一直运行的、启动就运行的、全局的代码放在 background 里面。

background 的权限非常高，几乎可以调用所有的 Chrome 扩展 API（除了 devtools），而且它可以无限制跨域，也就是可以跨域访问任何网站而无需要求对方设置 CORS。

background 可以通过 page 指定一张网页，也可以通过 scripts 直接指定一个 JS，Chrome 会自动为这个 JS 生成一个默认的网页：

```js
{
 // 会一直常驻的后台JS或后台页面
 "background":
 {
 // 2种指定方式，如果指定JS，那么会自动生成一个背景页
 "page": "background.html"
 //"scripts": ["js/background.js"]
 },
}
```

### NewTab

新标签页加上一些方便的功能。

### popup

popup 是点击 browser_action 或者 page_action 图标时打开的一个小窗口网页，焦点离开网页就立即关闭，一般用来做一些临时性的交互。

## 3、chrome 插件的 8 种形式

## 4、消息通信
