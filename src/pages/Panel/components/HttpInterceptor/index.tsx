import './index.scss';
import React, { useState, useEffect } from 'react';
import { Switch, Collapse, Input, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
const Panel = Collapse.Panel;
const TextArea = Input.TextArea;

const DEFAULT_SETTING = {
  ajaxInterceptorSwitchOn: false,
  ajaxInterceptorRules: [],
};

const changeBadge = () => {
  if (chrome.browserAction) {
    if (window.setting.ajaxInterceptorSwitchOn) {
      chrome.browserAction.setBadgeText({ text: 'mock' });
    } else {
      chrome.browserAction.setBadgeText({ text: '' });
    }
  }
};

if (chrome.storage) {
  chrome.storage.local.get(['ajaxInterceptorSwitchOn', 'ajaxInterceptorRules'], (result) => {
    window.setting = {
      ...DEFAULT_SETTING,
      ...result,
    };
    changeBadge();
  });
} else {
  window.setting = DEFAULT_SETTING;
}

export default function App() {
  const [rules, setRule] = useState<HttpModel[]>(window.setting?.ajaxInterceptorRules);

  useEffect(() => {
    chrome.runtime.sendMessage(chrome.runtime.id, {
      type: 'ajaxInterceptor',
      to: 'background',
      iframeScriptLoaded: true,
    });
  }, []);

  // 发送给background.js
  const set = (key, value) => {
    chrome.runtime.sendMessage(chrome.runtime.id, {
      type: 'ajaxInterceptor',
      to: 'background',
      key,
      value,
    });
    chrome.storage && chrome.storage.local.set({ [key]: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, type: string) => {
    rules[index][type] = e.target.value;
    setRule([...rules]);
    window.setting.ajaxInterceptorRules = rules;
    set('ajaxInterceptorRules', [...rules]);
  };

  const handleSwitch = (checked: boolean, index: number, type: string) => {
    rules[index][type] = checked;
    setRule([...rules]);
    window.setting.ajaxInterceptorRules = rules;
    set('ajaxInterceptorRules', [...rules]);
  };

  const handleAdd = () => {
    const newObj = {
      name: '',
      path: '',
      switchOn: false,
      key: new Date().getTime(),
      response: '',
    };
    setRule([...rules, newObj]);
    window.setting.ajaxInterceptorRules.push(newObj);
  };

  const handleDelete = (index) => {
    rules.splice(index, 1);
    setRule([...rules]);
    window.setting.ajaxInterceptorRules = rules;
    set('ajaxInterceptorRules', [...rules]);
  };

  const handleAllChange = () => {
    window.setting.ajaxInterceptorSwitchOn = !window.setting.ajaxInterceptorSwitchOn;
    set('ajaxInterceptorSwitchOn', window.setting.ajaxInterceptorSwitchOn);

    changeBadge();
  };

  return (
    <div className="http-interceptor-wrap">
      <div className="all-switch">
        <Switch checkedChildren="on" unCheckedChildren="off" onChange={handleAllChange} defaultChecked={window.setting?.ajaxInterceptorSwitchOn} />
      </div>
      <Collapse>
        {rules?.map((item, index) => (
          <Panel
            key={item.key}
            header={
              <div className="panel-header" onClick={(e) => e.stopPropagation()}>
                <Input.Group compact>
                  <Input placeholder="apiName" style={{ width: '25%' }} onChange={(e) => handleChange(e, index, 'name')} defaultValue={item.name} />
                  <Input placeholder="apiPath" style={{ width: '75%' }} onChange={(e) => handleChange(e, index, 'path')} defaultValue={item.path} />
                </Input.Group>
                <Switch className="one-switch" onChange={(v) => handleSwitch(v, index, 'switchOn')} defaultChecked={item.switchOn} />
                <Button danger shape="circle" icon={<MinusOutlined />} onClick={() => handleDelete(index)} />
              </div>
            }
          >
            <TextArea rows={6} placeholder="mock接口返回值" onChange={(e) => handleChange(e, index, 'response')} defaultValue={item.response} />
          </Panel>
        ))}
      </Collapse>
      <div className="btn-wrap">
        <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" onClick={handleAdd} />
      </div>
    </div>
  );
}
