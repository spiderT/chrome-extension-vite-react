/* eslint-disable camelcase */

interface LoggerModel {
  login_id: string;
  event: string;
  distinct_id: string;
  properties: {
    event_type: string;
    desc: string;
    distinctId: string;
    v_aid: string;
    referrer: string;
    current_url: string;
    scenario: string;
    channel: string;
    source: string;
    current_page: string;
  };
}

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
