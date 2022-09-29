import './index.scss';
import React from 'react';
import { render } from 'react-dom';
import Portals from './components/Portals';
import Search from './components/Search';

render(
  <div className="chrome-extension-newtab">
    <Search />
    <Portals />
  </div>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
