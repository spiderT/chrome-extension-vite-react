import './Panel.scss';
import React from 'react';
import { Tabs } from 'antd';
import Encode from './components/Encode';
import HttpInterceptor from './components/HttpInterceptor';

const { TabPane } = Tabs;

const App = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="接口mock" key="1">
      <HttpInterceptor />
    </TabPane>
    <TabPane tab="加解密" key="2">
      <Encode />
    </TabPane>
  </Tabs>
);

export default App;
