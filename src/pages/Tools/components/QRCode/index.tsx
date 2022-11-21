import './index.scss';
import { Button, message } from 'antd';
import React, { useState } from 'react';
import { SwapOutlined } from '@ant-design/icons';
import QRCode from 'qrcode';
import qrcodeParser from 'qrcode-parser';
import Dragger from '../Base64ToImg/Dragger';
import TextArea from '../Base64ToImg/TextArea';
import ClipboardInput from '../ClipboardInput';

export default function ViewQRCode() {
  const [parseUrl, setParseUrl] = useState<string>('');
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [dataurl, setDataUrl] = useState<string>('');
  const [isToQrCode, switchType] = useState<boolean>(true);

  const handleType = () => {
    switchType(!isToQrCode);
    setDataUrl('');
  };

  const getQRCode = () => {
    if (!currentUrl) {
      message.error('请输入网址');
      return;
    }
    QRCode.toDataURL(currentUrl).then((url: string) => {
      setDataUrl(url);
    });
  };

  return (
    <>
      <Button type="text" className="change-btn" icon={<SwapOutlined />} onClick={handleType}>
        {isToQrCode ? '切换为 解码 模式' : '切换为 二维码生成器 模式'}
      </Button>
      <p className="img-base64-title"> {isToQrCode ? '二维码生成器' : '二维码解码器'}</p>
      {isToQrCode ? (
        <div className="qr-wrap">
          <div className="input-wrap">
            <ClipboardInput type="textarea" rows={10} onChange={(v) => setCurrentUrl(v)} />
            <Button onClick={getQRCode} type="primary" className="btn">
              生成二维码
            </Button>
          </div>
          <img src={dataurl} alt="" />
        </div>
      ) : (
        <div className="parse-wrap">
          <Dragger
            onChange={(src) => {
              qrcodeParser(src).then((res) => {
                setParseUrl(res);
              });
            }}
          />
          <TextArea edit={false} url={parseUrl} />
        </div>
      )}
    </>
  );
}
