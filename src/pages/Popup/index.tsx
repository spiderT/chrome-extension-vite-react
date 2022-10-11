import './index.scss';
import { QrcodeOutlined, OrderedListOutlined, SplitCellsOutlined, GithubOutlined } from '@ant-design/icons';

export default function App() {
  const datas = [
    {
      label: '生成二维码',
      key: 'qrcode',
      icon: <QrcodeOutlined />,
    },
    {
      label: 'JSON格式化',
      key: 'json',
      icon: <OrderedListOutlined />,
    },
    {
      label: '加解密',
      key: 'encode',
      icon: <SplitCellsOutlined />,
    },
  ];

  return (
    <div className="chrome-extension-popup">
      {datas.map((item) => (
        // todo 部署后文件路径
        <div key={item.key} className="popup-item" onClick={() => window.open(`chrome-extension://ddpbhaihbclnhppipnjoiofdoblmopnm/index.html#/tools?key=${item.key}`)}>
          {item.icon}
          <span> {item.label}</span>
        </div>
      ))}
      <p className="github" onClick={() => window.open('https://github.com/spiderT/chrome-extension')}>
        <GithubOutlined style={{ marginLeft: 4, fontSize: 20 }} />
      </p>
    </div>
  );
}
