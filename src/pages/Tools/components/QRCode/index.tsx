import './index.scss';
import { Button, message } from 'antd';
import { useState } from 'react';
import QRCode from 'qrcode';
import ClipboardInput from '../ClipboardInput';

export default function ViewQRCode() {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [dataurl, setDataUrl] = useState<string>('');

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
    <div className="qr-wrap">
      <div className="input-wrap">
        <ClipboardInput type="textarea" rows={10} onChange={(v) => setCurrentUrl(v)} />
        <Button onClick={getQRCode} type="primary" className="btn">
          生成二维码
        </Button>
      </div>
      <img src={dataurl} alt="" />
    </div>
  );
}
