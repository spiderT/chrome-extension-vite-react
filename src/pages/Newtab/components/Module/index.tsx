import './index.scss';
import React from 'react';
import { Avatar } from 'antd';
import ModuleTitle from '../ModuleTitle';

interface ModuleValue {
  name: string;
  icon: string;
  desc: string;
  url?: string;
}

interface ModuleItemProps {
  name: string;
  value: ModuleValue[];
}

const Module: React.FC<ModuleItemProps> = (props) => {
  const renderItem = (item: ModuleValue) => {
    return (
      <div className="module-item" onClick={() => item.url && window.open(item.url)}>
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
    </div>
  );
};

export default Module;
