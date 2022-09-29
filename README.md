# chrome extension

- [chrome extension](#chrome-extension)
  - [1、项目功能](#1项目功能)
    - [1、新标签页](#1新标签页)
  - [2、chrome 核心内容介绍](#2chrome-核心内容介绍)
    - [manifest.json](#manifestjson)
    - [content-scripts](#content-scripts)
    - [injected-script](#injected-script)
    - [background](#background)
    - [event-pages](#event-pages)
    - [popup](#popup)
    - [homepage_url](#homepage_url)
  - [3、chrome 插件形式](#3chrome-插件形式)
    - [browserAction(浏览器右上角)](#browseraction浏览器右上角)
    - [右键菜单](#右键菜单)
    - [override(覆盖特定页面)](#override覆盖特定页面)
    - [devtools(开发者工具)](#devtools开发者工具)
    - [option(选项页)](#option选项页)
    - [omnibox](#omnibox)
    - [桌面通知](#桌面通知)
  - [4、消息通信](#4消息通信)
  - [5、5种类型的JS对比](#55种类型的js对比)
## 1、项目功能

### 1、新标签页

![newtab](/images/newtab.png)

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

### injected-script

通过DOM操作的方式向页面注入的一种JS.

在content-script中通过DOM方式向页面注入inject-script, 在web中直接访问插件中的资源的话必须显示声明，配置文件中增加如下：

```json
{
 // 普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的
 "web_accessible_resources": ["js/inject.js"],
}
```

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

### event-pages

鉴于background生命周期太长，长时间挂载后台可能会影响性能，所以Google又弄一个event-pages，在配置文件上，它与background的唯一区别就是多了一个persistent参数：

```json
{
 "background":
 {
 "scripts": ["event-page.js"],
 "persistent": false
 },
}
```

生命周期是：在被需要时加载，在空闲时被关闭，什么叫被需要时呢？比如第一次安装、插件更新、有content-script向它发送消息，等等。

### popup

popup 是点击 browser_action 或者 page_action 图标时打开的一个小窗口网页，焦点离开网页就立即关闭，一般用来做一些临时性的交互。

### homepage_url

开发者或者插件主页设置

## 3、chrome 插件形式

### browserAction(浏览器右上角)

通过配置browser_action可以在浏览器的右上角增加一个图标，一个browser_action可以拥有一个图标，一个tooltip，一个badge和一个popup。  

```json
"browser_action": {
 "default_icon": "img/icon.png",
 "default_title": "这是一个示例Chrome插件",
 "default_popup": "popup.html"
}
```

> 图标

一般推荐png，可以通过manifest中default_icon字段配置，也可以调用setIcon()方法。

> tooltip

修改browser_action的manifest中default_title字段，或者调用setTitle()方法。

> badge

就是在图标上显示一些文本，可以用来更新一些小的扩展状态提示信息。因为badge空间有限，所以只支持4个以下的字符（英文4个，中文2个）。badge无法通过配置文件来指定，必须通过代码实现，设置badge文字和颜色可以分别使用setBadgeText()和setBadgeBackgroundColor()。

```js
chrome.browserAction.setBadgeText({text: 'new'});
chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
```

### 右键菜单

https://developer.chrome.com/extensions/contextMenus  

自定义浏览器的右键菜单，主要是通过chrome.contextMenusAPI实现，右键菜单可以出现在不同的上下文，比如普通页面、选中的文字、图片、链接，等等，如果有同一个插件里面定义了多个菜单，Chrome会自动组合放到以插件名字命名的二级菜单里



```js
chrome.contextMenus.create({
 type: 'normal'， // 类型，可选：["normal", "checkbox", "radio", "separator"]，默认 normal
 title: '菜单的名字', // 显示的文字，除非为“separator”类型否则此参数必需，如果类型为“selection”，可以使用%s显示选定的文本
 contexts: ['page'], // 上下文环境，可选：["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"]，默认page
 onclick: function(){}, // 单击时触发的方法
 parentId: 1, // 右键菜单项的父菜单项ID。指定父菜单项将会使此菜单项成为父菜单项的子菜单
 documentUrlPatterns: 'https://*.baidu.com/*' // 只在某些页面显示此右键菜单
});
// 删除某一个菜单项
chrome.contextMenus.remove(menuItemId)；
// 删除所有自定义右键菜单
chrome.contextMenus.removeAll();
// 更新某一个菜单项
chrome.contextMenus.update(menuItemId, updateProperties);
```

### override(覆盖特定页面)

使用override页可以将Chrome默认的一些特定页面替换掉，改为使用扩展提供的页面。

扩展可以替代如下页面：

- 历史记录：从工具菜单上点击历史记录时访问的页面，或者从地址栏直接输入chrome://history
- 新标签页：当创建新标签的时候访问的页面，或者从地址栏直接输入chrome://newtab
- 书签：浏览器的书签，或者直接输入chrome://bookmarks

注意：

- 一个扩展只能替代一个页面；
- 不能替代隐身窗口的新标签页；
- 网页必须设置title，否则用户可能会看到网页的URL，造成困扰；

```json
"chrome_url_overrides": {
 "newtab": "newtab.html",
 "history": "history.html",
 "bookmarks": "bookmarks.html"
}
```

### devtools(开发者工具)

https://developer.chrome.com/extensions/devtools

每打开一个开发者工具窗口，都会创建devtools页面的实例，F12窗口关闭，页面也随着关闭，所以devtools页面的生命周期和devtools窗口是一致的。devtools页面可以访问一组特有的DevTools API以及有限的扩展API，这组特有的DevTools API只有devtools页面才可以访问，background都无权访问，这些API包括：

- chrome.devtools.panels：面板相关；
- chrome.devtools.inspectedWindow：获取被审查窗口的有关信息；
- chrome.devtools.network：获取有关网络请求的信息；

```json
{
 // 只能指向一个HTML文件，不能是JS文件
 "devtools_page": "devtools.html"
}
```

### option(选项页)

就是插件的设置页面，有2个入口，一个是右键图标有一个“选项”菜单，还有一个在插件管理页面.

### omnibox

omnibox是向用户提供搜索建议的一种方式。

### 桌面通知

```js
chrome.notifications.create(null, {
 type: 'basic',
 iconUrl: 'img/icon.png',
 title: '这是标题',
 message: '您刚才点击了自定义右键菜单！'
});
```

## 4、消息通信

|  | injected-script	| content-script	| popup-js	| background-js
|  ----  | ----  |  ----  | ----  | ----  | 
| injected-script	| -	| window.postMessage	| -	| - | 
| content-script	| window.postMessage	| -	| chrome.runtime.sendMessage chrome.runtime.connect	| chrome.runtime.sendMessage chrome.runtime.connect| 
| popup-js	| -	| chrome.tabs.sendMessage chrome.tabs.connect	-	chrome.extension. getBackgroundPage()
| background-js	| -	| chrome.tabs.sendMessage chrome.tabs.connect	chrome.extension.getViews	-| 
| devtools-js	| chrome.devtools. inspectedWindow.eval	| -	| chrome.runtime.sendMessage	| chrome.runtime.sendMessage| 



## 5、5种类型的JS对比

Chrome插件的JS主要可以分为这5类：injected script、content-script、popup js、background js和devtools js。

权限对比

| JS种类	| 可访问的API	| DOM访问情况	| JS访问情况 | 	直接跨域 | 
|  ----  | ----  |  ----  | ----  | ----  | 
| injected script	| 和普通JS无任何差别，不能访问任何扩展API	| 可以访问	| 可以访问	| 不可以| 
| content script	| 只能访问 extension、runtime等部分API	| 可以访问	| 不可以| 	不可以| 
| popup js	| 可访问绝大部分API，除了devtools系列	不可直接访问	| 不可以	| 可以| 
| background js	| 可访问绝大部分API，除了devtools系列| 	不可直接访问	| 不可以| 	可以| 
| devtools js| 只能访问 devtools、extension、runtime等部分API	| 可以	| 可以| 	不可以| 
