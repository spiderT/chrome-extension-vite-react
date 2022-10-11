import './index.scss';
import { Tabs } from 'antd';
import JsonFormat from './components/JsonFormat';
import Encode from './components/Encode';
import QRCode from './components/QRCode';

import { getQuery } from '../../utils/commom';

const { TabPane } = Tabs;

const App: React.FC = () => {
  const datas = [
    {
      label: '生成二维码',
      key: 'qrcode',
      component: QRCode,
    },
    {
      label: 'JSON格式化',
      key: 'json',
      component: JsonFormat,
    },
    {
      label: '加解密',
      key: 'encode',
      component: Encode,
    },
  ];

  return (
    <div className="tools-wrap">
      <Tabs tabPosition="left" defaultActiveKey={getQuery()?.key}>
        {datas.map((item) => (
          <TabPane tab={item.label} key={item.key}>
            {item.component()}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default App;
