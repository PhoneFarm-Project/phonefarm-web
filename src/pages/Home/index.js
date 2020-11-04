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

  const changeDefaultBackground = (message) => {
    window.parent.postMessage(message);
  };

  return (
    <Layout className='styleHome'>
      <div className='row'>
        <div className='col-3 pd-none center'>
          <Link
            className='ant-btn ant-btn-dashed btn-icon bg_liner center'
            to='/buy-Iphone?preset=moveToLeftFromRight'
            onClick={() => changeDefaultBackground('buyIphone')}
          >
            <img style={{}} src={iconStore} alt='icon' />
          </Link>
          <p className='app-name'>NFT Store</p>
        </div>
        <div className='col-3 pd-none center'>
          <Link
            className='ant-btn ant-btn-dashed btn-icon bg_liner center'
            to='/buy-Phone?preset=moveToLeftFromRight'
            onClick={() => changeDefaultBackground()}
          >
            <img src={buyToken} alt='icon' />
          </Link>
          <p className='app-name'>Token Store</p>
        </div>
        <div className='col-3 pd-none center'>
          <Link
            className='ant-btn ant-btn-dashed btn-icon bg_liner center'
            to='/collection?preset=moveToLeftFromRight'
            onClick={() => changeDefaultBackground()}
          >
            <img src={iconSettings} alt='icon' />
          </Link>
          <p className='app-name'>Collection</p>
        </div>
        <div className='col-3 pd-none center'>
          <Link
            className='ant-btn ant-btn-dashed btn-icon bg_liner center'
            to='/stake?preset=moveToLeftFromRight'
            onClick={() => changeDefaultBackground()}
          >
            <img src={stake} alt='icon' />
          </Link>
          <p className='app-name'>Stake</p>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
