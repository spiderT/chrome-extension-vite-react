import './index.scss';
import { Tabs } from 'antd';
import JsonFormat from './components/JsonFormat';
import Encode from './components/Encode';
import QRCode from './components/QRCode';
import { getQuery } from '../../utils/commom';

const App: React.FC = () => {
  const items = [
    {
      label: '生成二维码',
      key: 'qrcode',
      children: <QRCode />,
    },
    {
      label: 'JSON格式化',
      key: 'json',
      children: <JsonFormat />,
    },
    {
      label: '加解密',
      key: 'encode',
      children: <Encode />,
    },
  ];

  return (
    <div className="tools-wrap">
      <Tabs tabPosition="left" defaultActiveKey={getQuery()?.key} items={items} />
    </div>
  );
};

export default App;
