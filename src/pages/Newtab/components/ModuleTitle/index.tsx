import React from 'react';
import './style.scss';

interface Props {
  title: string;
}

const ModuleTitle: React.FC<Props> = (props) => (
  <div className="module-title">
    <p className="title">{props.title}</p>
  </div>
);

export default ModuleTitle;
