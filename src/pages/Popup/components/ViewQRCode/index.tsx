import './index.scss';
import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const { TextArea } = Input;

export default function ViewQRCode() {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [dataurl, setDataUrl] = useState<string>('');

  function getcurrent() {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
      setCurrentUrl(tabs[0].url);
      getQRCode(tabs[0].url);
    });
  }

  const getQRCode = (data: string) => {
    QRCode.toDataURL(data).then((url: string) => {
      setDataUrl(url);
    });
  };

  useEffect(() => {
    getcurrent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setCurrentUrl(v);
    getQRCode(v);
  };

  return (
    <div className="qr-wrap">
      <img src={dataurl} alt="" />
      <TextArea rows={3} onChange={handleChange} value={currentUrl} />
    </div>
  );
}
