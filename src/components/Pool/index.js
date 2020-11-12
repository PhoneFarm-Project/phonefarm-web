import React from 'react';
import './style.scss';

export default function Pool({ apy, token, phoneStake, pendingIPhone }) {
  return (
    <div className='deposited-and-iphone'>
      <div className='pool_iphone'>
        <div className='ip_center'>
          <p className='ip_number'>{pendingIPhone}</p>
          <p className='ip'>IPHONE</p>
        </div>

        <p className='gray'>Profit</p>
      </div>
      <div className='pool_apy'>
        <div className='apy' />
        <div className='arrow-top'>
          <div className='chevron'></div>
          <div className='chevron'></div>
          <div className='chevron'></div>
        </div>
        <div className='apy'>
          <p className='apy_number'>
            {typeof apy === 'string' ? apy : Math.round(apy * 100) / 100 + ' %'}
          </p>
          <p className='gray'>APY</p>
        </div>
      </div>

      <div className='pool_staked'>
        <div className='staked_center'>
          <p className='staked_number'>{phoneStake}</p>
          <p className='staked'>{token}</p>
        </div>
        <p>Staked</p>
      </div>
    </div>
  );
}
