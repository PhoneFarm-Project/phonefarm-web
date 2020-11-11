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
  const [background, setBackground] = useState(0);

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
  }, [setLayout, layoutStorage]);

  useEffect(() => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.data === 'ChangeLayout') {
          let newLayout = JSON.parse(localStorage.getItem('device'));
          setLayout(getIphoneLayout(newLayout.model, newLayout.color));
        } else if (event.data === 'home') {
          setBackground(0);
        } else if (event.data === 'buyIphone') {
          setBackground(1);
        } else if (event.data === 'buyPhone') {
          setBackground(2);
        } else if (event.data === 'collection') {
          setBackground(3);
        } else if (event.data === 'stake') {
          setBackground(4);
        }
      },
      false
    );
  });

  const walletAddress = useSelector((state) => state.walletAddress);

  const connect = () => {
    connectMetaMask();
  };

  return (
    <div className='style_home_layout'>
      <p className='wallet_address'>
        {!!walletAddress
          ? `Address : ${walletAddress.slice(0, 8)}...${walletAddress.slice(
              walletAddress.length - 6,
              walletAddress.length
            )}`
          : ''}
      </p>
      <Circle top='60%' left='80%' size='80px' type='warning' />
      <Square top='50px' left='20px' size='140px' type='info' blur />
      <Dots />

      {layout ? (
        <div className={`phone ${layout && layout.style ? layout.style : ''}`}>
          {background === 0 ? (
            <div className='default_layout bg_w bg_image' />
          ) : background === 1 ? (
            <div className='default_layout bg_w'>
              <div className='bg_line bg_liner bg_liner_buyIphone' />
            </div>
          ) : background === 2 ? (
            <div className='default_layout bg_w '>
              <div className='bg_line bg_liner bg_liner_buyPhone' />
            </div>
          ) : background === 3 ? (
            <div className='default_layout bg_w bg_image '>
              <div className='bg_line bg_liner bg_liner_collection' />
            </div>
          ) : (
            <div className='default_layout bg_liner'>
              <div className='bg_line bg_w bg_image bg_stake' />
            </div>
          )}
          <img className='phone_size p_abs' src={layout.layout} alt='iphone case' />
          <div className='content_box phone_size'>
            <iframe
              className={`style_iframe ${walletAddress ? 'open_a' : ''}`}
              src='/home'
              title='home'
              id='iframe-layout-phone'
              allowtransparency='true'
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
