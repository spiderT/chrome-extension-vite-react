import './index.scss';
import React from 'react';
import { Tabs } from 'antd';
import JsonFormat from './components/JsonFormat';
import Encode from './components/Encode';
import QRCode from './components/QRCode';
import MpQrCode from './components/MpQrCode';
import Base64ToImg from './components/Base64ToImg';
import Timestamp from './components/Timestamp';
import CompressPic from './components/CompressPic';
import ImageCrop from './components/ImageCrop';

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
    {
      label: '图片转Base64',
      key: 'image-base64',
      children: <Base64ToImg />,
    },
    {
      label: '图片压缩',
      key: 'compresspic',
      children: <CompressPic />,
    },
    {
      label: '时间戳转换',
      key: 'timestamp',
      children: <Timestamp />,
    },
    {
      label: '图片裁剪',
      key: 'image-crop',
      children: <ImageCrop />,
    },
  ];

  return (
    <div className="tools-wrap">
      <Tabs tabPosition="left" defaultActiveKey={getQuery()?.key} items={items} />
    </div>
  );
};

export default App;
