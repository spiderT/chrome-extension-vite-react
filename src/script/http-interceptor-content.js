// 在页面上插入代码
const script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute(
  'src',
  chrome.runtime.getURL('packages/devtools/http-interceptor.js')
);
document.documentElement.appendChild(script);

script.addEventListener('load', () => {
  chrome.storage.local.get(
    ['ajaxInterceptorSwitchOn', 'ajaxInterceptorRules'],
    (result) => {
      if (result.hasOwnProperty('ajaxInterceptorSwitchOn')) {
        postMessage({
          type: 'ajaxInterceptor',
          to: 'pageScript',
          key: 'ajaxInterceptorSwitchOn',
          value: result.ajaxInterceptorSwitchOn,
        });
      }
      if (result.ajaxInterceptorRules) {
        postMessage({
          type: 'ajaxInterceptor',
          to: 'pageScript',
          key: 'ajaxInterceptorRules',
          value: result.ajaxInterceptorRules,
        });
      }
    }
  );
});
