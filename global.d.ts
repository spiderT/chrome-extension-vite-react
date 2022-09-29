interface HttpModel {
  name?: string;
  path?: string;
  switchOn?: boolean;
  key?: number;
  response?: string;
}

interface Window {
  setting: {
    ajaxInterceptorRules?: HttpModel[];
    ajaxInterceptorSwitchOn?: boolean;
  };
}
