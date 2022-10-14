import './index.scss';
import React, { useState } from 'react';
import { Avatar, Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import ModuleTitle from '../ModuleTitle';
import CollectionCreateForm from '../CollectionCreateForm';
import { Type, UrlProps, ModuleItemProps } from '../../interface';
import { transInterfaceToForm } from '../../utils';

interface IProps extends ModuleItemProps {
  onEdit: (values: UrlProps) => void;
  onRemove: (values: UrlProps) => void;
}

const Module: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<UrlProps>({ type: Type.DEVELOP });

  const handleEdit = (v, e) => {
    e.stopPropagation();
    setOpen(true);
    const fromValue = transInterfaceToForm(v);
    console.log('fromValue', fromValue);
    setInitialValues(fromValue);
  };

  const onCreate = (values: UrlProps) => {
    props.onEdit(values);
    setOpen(false);
  };

  const handleRemove = (v, e) => {
    e.stopPropagation();
    props.onRemove(v);
  };

  const renderItem = (item: UrlProps) => {
    return (
      <div className="module-item" onClick={() => item.url && window.open(item.url)}>
        {item.edit && (
          <Popover
            content={
              <div>
                <p className="edit-item" onClick={(e) => handleEdit(item, e)}>
                  修改快捷方式
                </p>
                <p className="edit-item" onClick={(e) => handleRemove(item, e)}>
                  移除
                </p>
              </div>
            }
            title={null}
            trigger="hover"
            placement="bottom"
          >
            <div className="edit" onClick={(e) => e.stopPropagation()}>
              <EllipsisOutlined />
            </div>
          </Popover>
        )}
        <Avatar shape="square" src={item.icon} />
        <div className="content">
          <p className="title">{item.name}</p>
          <p className="desc">{item.desc}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <ModuleTitle title={props.name} />
      <div className="module-item-wrap"> {props.value?.map((item) => renderItem(item))}</div>
      {open && (
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          initialValues={initialValues}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Module;
