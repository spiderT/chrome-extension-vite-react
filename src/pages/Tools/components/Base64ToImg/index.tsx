import React, { useState } from 'react';
import { SwapOutlined, PictureOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Dragger from './Dragger';
import TextArea from './TextArea';
import './index.scss';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [isToBase64, switchType] = useState<boolean>(true);

  const handleType = () => {
    switchType(!isToBase64);
    setUrl('');
  };

  const renderImg = (src) => {
    if (src) {
      return <img src={src} alt="" />;
    }
    return <PictureOutlined className="img-icon" />;
  };

  return (
    <>
      <Button type="text" className="change-btn" icon={<SwapOutlined />} onClick={handleType}>
        {isToBase64 ? '切换为图片转Base64' : '切换为Base64转图片'}
      </Button>
      <p className="img-base64-title"> {isToBase64 ? 'Base64转图片' : '图片转Base64'}</p>
      <div className="img-base64-wrap">
        {isToBase64 ? (
          <>
            <Dragger onChange={(src) => setUrl(src)} />
            <TextArea edit={false} url={url} />
          </>
        ) : (
          <>
            <TextArea edit={true} onChange={(src) => setUrl(src)} />
            <div className="img-wrap">{renderImg(url)}</div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
