const AjaxInterceptorSetting = {
  settings: {
    ajaxInterceptorSwitchOn: false,
    ajaxInterceptorRules: [],
  },
  originalXHR: window.XMLHttpRequest,
  myXHR: function() {
    let pageScriptEventDispatched = false;
    const modifyResponse = () => {
      AjaxInterceptorSetting.settings.ajaxInterceptorRules.forEach(({ switchOn, path, response: overrideTxt }) => {
        if (switchOn && path && this.responseURL.includes(path)) {
          this.responseText = overrideTxt;
          this.response = overrideTxt;

          if (!pageScriptEventDispatched) {
            window.dispatchEvent(
              new CustomEvent('pageScript', {
                detail: { url: this.responseURL, path },
              })
            );
            pageScriptEventDispatched = true;
          }
        }
      });
    };

    const xhr = new AjaxInterceptorSetting.originalXHR();
    // eslint-disable-next-line guard-for-in
    for (const attr in xhr) {
      if (attr === 'onreadystatechange') {
        xhr.onreadystatechange = (...args) => {
          if (this.readyState == 4) {
            if (AjaxInterceptorSetting.settings.ajaxInterceptorSwitchOn) {
              modifyResponse();
            }
          }
          // eslint-disable-next-line prefer-spread
          this.onreadystatechange && this.onreadystatechange.apply(this, args);
        };
        continue;
      } else if (attr === 'onload') {
        xhr.onload = (...args) => {
          if (AjaxInterceptorSetting.settings.ajaxInterceptorSwitchOn) {
            modifyResponse();
          }
          // eslint-disable-next-line prefer-spread
          this.onload && this.onload.apply(this, args);
        };
        continue;
      }

      if (typeof xhr[attr] === 'function') {
        this[attr] = xhr[attr].bind(xhr);
      } else {
        // responseText和response不是writeable的，但拦截时需要修改它，所以修改就存储在this[`_${attr}`]上
        if (attr === 'responseText' || attr === 'response') {
          Object.defineProperty(this, attr, {
            get: () => (this[`_${attr}`] == undefined ? xhr[attr] : this[`_${attr}`]),
            set: (val) => {
              this[`_${attr}`] = val;
            },
            enumerable: true,
          });
        } else {
          Object.defineProperty(this, attr, {
            get: () => xhr[attr],
            set: (val) => {
              xhr[attr] = val;
            },
            enumerable: true,
          });
        }
      }
    }
  },

  originalFetch: null,
  myFetch: function(...args) {
    return AjaxInterceptorSetting.originalFetch(...args).then((response) => {
      let txt = undefined;
      AjaxInterceptorSetting.settings.ajaxInterceptorRules.forEach(({ switchOn, path, response: overrideTxt }) => {
        if (switchOn && path && response.url.includes(path)) {
          window.dispatchEvent(
            new CustomEvent('pageScript', {
              detail: { url: response.url, path },
            })
          );
          txt = overrideTxt;
        }
      });

      if (txt !== undefined) {
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(txt));
            controller.close();
          },
        });

        const newResponse = new Response(stream, {
          headers: response.headers,
          status: 200,
          statusText: response.statusText,
        });
        const proxy = new Proxy(newResponse, {
          get: function(target, name) {
            switch (name) {
              case 'ok':
              case 'redirected':
              case 'type':
              case 'url':
              case 'useFinalURL':
              case 'body':
              case 'bodyUsed':
                return response[name];
            }
            return target[name];
          },
        });

        for (const key in proxy) {
          if (typeof proxy[key] === 'function') {
            proxy[key] = proxy[key].bind(newResponse);
          }
        }

        return proxy;
      }
      return response;
    });
  },
};

window.addEventListener(
  'message',
  function(event) {
    const data = event.data;
    if (!AjaxInterceptorSetting.originalFetch) {
      AjaxInterceptorSetting.originalFetch = window.fetch.bind(window);
    }

    if (data.type === 'ajaxInterceptor' && data.to === 'pageScript') {
      AjaxInterceptorSetting.settings[data.key] = data.value;
    }

    if (AjaxInterceptorSetting.settings.ajaxInterceptorSwitchOn) {
      window.XMLHttpRequest = AjaxInterceptorSetting.myXHR;
      window.fetch = AjaxInterceptorSetting.myFetch;
    } else {
      window.XMLHttpRequest = AjaxInterceptorSetting.originalXHR;
      window.fetch = AjaxInterceptorSetting.originalFetch;
    }
  },
  false
);
