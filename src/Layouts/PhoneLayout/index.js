import React, { useEffect, useState } from 'react';
import Square from './Square';
import Circle from './Circle';
import Dots from './Dots';
import Lock from 'Layouts/Lock';
import { useSelector } from 'react-redux';
import { connectMetaMask } from 'utils/connectMetaMask';
import getIphoneLayout from 'utils/getIphoneLayout';

import './style.scss';
import './styleLayoutPhone.scss';

function PhoneLayout() {
  let layoutStorage = JSON.parse(localStorage.getItem('device'));
  const [layout, setLayout] = useState();
  useEffect(() => {
    if (!layoutStorage) {
      localStorage.setItem(
        'device',
        JSON.stringify({ brand: 'iphone', model: '4', color: 'Black' })
      );
      setLayout(getIphoneLayout('4', 'Black'));
    } else {
      setLayout(getIphoneLayout(layoutStorage.model, layoutStorage.color));
    }
    window.addEventListener(
      'message',
      (event) => {
        if (event.data === 'ChangeLayout') {
          let newLayout = JSON.parse(localStorage.getItem('device'));
          setLayout(getIphoneLayout(newLayout.model, newLayout.color));
        }
      },
      false
    );
  }, [setLayout, layoutStorage]);

  const walletAddress = useSelector((state) => state.walletAddress);

  const connect = () => {
    connectMetaMask();
  };

  return (
    <div className='style_home_layout'>
      <Circle top='60%' left='80%' size='80px' type='warning' />
      <Square top='50px' left='20px' size='140px' type='info' blur />
      <Dots />
      {layout ? (
        <div className={`phone ${layout && layout.style ? layout.style : ''}`}>
          <img className='phone_size zd' src={layout.layout} alt='iphone case' />
          <div className='content_box phone_size'>
            <div className='default_layout' />
            <iframe
              className={`style_iframe ${walletAddress ? 'open_a' : ''}`}
              src='/home'
              title='home'
              id='iframe-layout-phone'
            />
            {walletAddress ? (
              <></>
            ) : (
              <div className='lock'>
                <Lock />
              </div>
            )}
          </div>
          {!walletAddress ? (
            <img
              className='phone_notch'
              src={layout.layout}
              alt='iphone head'
              onClick={() => connect()}
            />
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default PhoneLayout;
