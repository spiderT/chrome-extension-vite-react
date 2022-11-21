import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import './index.scss';

interface Props {
  onChange?: (src: any) => void;
  fileChange?: (src: any) => void;
  className?: string;
}

const Dragger: React.FC<Props> = (props) => {
  const [url, setUrl] = useState<string>('');

  const handleImgSrc = async(file) => {
    const src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as RcFile);
      reader.onload = () => resolve(reader.result as string);
    });
    setUrl(src as string);
    props.onChange?.(src);
  };

  const uploadProps: UploadProps = {
    className: `upload-img-wrap ${props.className}`,
    name: 'file',
    multiple: false,
    fileList: [],
    async onChange(info) {
      const file = info.file.originFileObj;
      props.fileChange?.(file);
      await handleImgSrc(file);
    },
  };

  return (
    <Upload.Dragger {...uploadProps}>
      {url ? (
        <img className="thumb-img" src={url} />
      ) : (
        <div>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">选择一张图片，或拖拽图片到这里</p>
        </div>
      )}
    </Upload.Dragger>
  );
};

export default Dragger;
