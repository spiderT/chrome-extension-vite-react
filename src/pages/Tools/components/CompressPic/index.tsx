import './index.scss';
import React, { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Dragger from '../Base64ToImg/Dragger';
import { compressionFile, fileToDataURL, getSize } from './compress';

interface List {
  name: string;
  originSize: number;
  currentSize: number;
  type: string;
  downloadLink?: any;
}

export default function CompressPic() {
  const [list, setList] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = async(file) => {
    setLoading(true);
    const { name, size: originSize, type } = file;
    const newFile = await compressionFile(file);
    list.push({
      name,
      originSize,
      type,
      currentSize: newFile?.size,
      downloadLink: await fileToDataURL(newFile),
    });
    setLoading(false);
    setList([...list]);
  };

  return (
    <Spin spinning={loading} indicator={<LoadingOutlined />}>
      <div>
        <Dragger fileChange={handleChange} className="compress-img-wrap" />
        <div className="compress-wrap">
          {list?.length ? (
            <div className="compress-line">
              <span className="compress-item compress-item-large">文件名</span>
              <span className="compress-item">压缩前</span>
              <span className="compress-item">压缩后</span>
              <span className="compress-item">压缩比</span>
              <span className="compress-item">操作</span>
            </div>
          ) : null}
          {list?.map((item) => (
            <div key={item.name} className="compress-line">
              <span className="compress-item  compress-item-large">{item.name}</span>
              <span className="compress-item">{getSize(item.originSize)}</span>
              <span className="compress-item">{getSize(item.currentSize)}</span>
              <span className="compress-item">{Math.round((item.currentSize / item.originSize) * 100)}%</span>
              <a className="compress-item download" href={item.downloadLink} download={item.name} target="_blank" rel="noreferrer">
                下载
              </a>
            </div>
          ))}
        </div>
      </div>
    </Spin>
  );
}
