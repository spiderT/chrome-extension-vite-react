import React from 'react';
import ViewQRCode from './components/ViewQRCode';
import './Popup.scss';

const Popup = () => {
  return (
    <div className="chrome-extension-popup">
      <ViewQRCode />
    </div>
  );
};

export default Popup;
