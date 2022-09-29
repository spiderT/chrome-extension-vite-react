import './index.scss';
import React from 'react';
import { data } from './data';
import Module from '../Module';

export default function Portals() {
  return (
    <div>
      {Object.values(data).map((item) => (
        <Module {...item} key={item.name} />
      ))}
    </div>
  );
}
