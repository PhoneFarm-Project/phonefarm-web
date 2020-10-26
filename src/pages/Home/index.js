import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { connectMetaMask } from 'utils/connectMetaMask';

import './style.scss';

import iconStore from 'assets/icons/store-2.png';
import iconSettings from 'assets/icons/Settings.png';
import buyToken from 'assets/icons/buy-token.png';
import stake from 'assets/icons/stake.png';

function Home() {
  useEffect(() => {
    connectMetaMask();
  });
  return (
    <Layout className='styleHome'>
      <div className='row'>
        <div className='col-3'>
          <Link
            className='ant-btn ant-btn-dashed btn-icon'
            to='/buy-Iphone?preset=moveToLeftFromRight'
          >
            <img src={iconStore} alt='icon' />
          </Link>
        </div>
        <div className='col-3'>
          <Link
            className='ant-btn ant-btn-dashed btn-icon'
            to='/buy-Phone?preset=moveToLeftFromRight'
            style={{ background: 'rgb(26,133,232,0.93)' }}
          >
            <img src={buyToken} alt='icon' />
          </Link>
        </div>
        <div className='col-3'>
          <Link
            className='ant-btn ant-btn-dashed btn-icon'
            to='/collection?preset=moveToLeftFromRight'
          >
            <img src={iconSettings} alt='icon' />
          </Link>
        </div>
        <div className='col-3'>
          <Link
            className='ant-btn ant-btn-dashed btn-icon'
            style={{ background: 'rgb(4,148,130,0.76)' }}
            to='/stake?preset=moveToLeftFromRight'
          >
            <img src={stake} alt='icon' />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
