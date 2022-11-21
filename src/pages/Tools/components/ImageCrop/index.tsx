import './index.scss';
import React, { useState } from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined, ScissorOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import Cropper from 'react-cropper';

export default function ImageCrop() {
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState('');
  const [cropper, setCropper] = useState<any>();

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const props: UploadProps = {
    name: 'file',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as any);
        };
        reader.readAsDataURL(info.file?.originFileObj);
      }
    },
  };

  return (
    <div style={{ width: '100%' }}>
      <Upload {...props}>
        <Button icon={<UploadOutlined />} type="primary">选择图片</Button>
      </Upload>
      {image ? (
        <div style={{ width: '100%' }}>
          <div style={{ width: '100%' }}>
            <Cropper
              style={{ height: 400, width: '100%' }}
              zoomTo={0.5}
              initialAspectRatio={1}
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => setCropper(instance)}
              guides={true}
            />
          </div>
          <div className="box" style={{ height: '300px' }}>
            <Button icon={<ScissorOutlined />} onClick={getCropData}>
              裁剪
            </Button>
            {cropData ? <img style={{ width: '100%' }} src={cropData} alt="cropped" /> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
