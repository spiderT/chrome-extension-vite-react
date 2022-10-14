import './index.scss';
import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CollectionCreateForm from '../CollectionCreateForm';
import { UrlProps, Type } from '../../interface';

interface IProps {
  onChange: (values: UrlProps) => void;
}

const Add: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: UrlProps) => {
    props.onChange(values);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="添加快捷方式">
        <div className="add-wrap" onClick={() => setOpen(true)}>
          <PlusOutlined />
        </div>
      </Tooltip>
      {open && (
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          initialValues={{ type: Type.DEVELOP }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Add;
