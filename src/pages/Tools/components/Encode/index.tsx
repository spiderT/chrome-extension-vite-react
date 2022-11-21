import './index.scss';
import React, { useState } from 'react';
import Base64 from './base64';
import { Input, Button } from 'antd';
import ClipboardInput from '../ClipboardInput';

export default function Encode() {
  const { TextArea } = Input;
  const [value, setValue] = useState<string>('');
  const [decodeValue, setDecodeValue] = useState<string>('');

  const handleUrlEncode = () => setDecodeValue(encodeURIComponent(value));
  const handleUrDecode = () => setDecodeValue(decodeURIComponent(value));
  const handleBaseEncode = () => setDecodeValue(Base64.encode(value));
  const handleBaseDecode = () => setDecodeValue(Base64.decode(decodeURIComponent(value).replace(/%([0-9A-F]{2})/g, '')));

  return (
    <div className="encode-wrap">
      <p>字符串：</p>
      <ClipboardInput type="textarea" rows={6} onChange={(v) => setValue(v)} className="input-textarea" />
      <div className="btns-wrap">
        <Button type="primary" onClick={handleUrlEncode}>
          UrlEncode
        </Button>
        <Button type="primary" danger onClick={handleUrDecode}>
          UrlDecode
        </Button>
        <Button type="primary" onClick={handleBaseEncode}>
          base64加密
        </Button>
        <Button type="primary" danger onClick={handleBaseDecode}>
          base64解密
        </Button>
      </div>
      <p>结果：</p>
      <TextArea rows={6} value={decodeValue} />
    </div>
  );
}
