import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { depositToken } from 'store/actions';
import './style.scss';

export default function Pool({ apy, token, phoneStake, pendingIPhone, poolSelected }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const handleDeposit = (e) => {
    dispatch(depositToken(poolSelected, 0));
  };

  return (
    <div className='deposited-and-iphone'>
      <div className='pool_iphone'>
        <div className='ip_center'>
          <p className='ip_number'>{pendingIPhone}</p>
          <p className='ip'>IPHONE</p>
        </div>
        <Button
          type='primary'
          shape='round'
          size='small'
          className='bt-collect'
          disabled={pendingIPhone === 0}
          loading={loading}
          onClick={() => handleDeposit()}
        >
          Collect
        </Button>

        <p className='gray'>Profit {token === 'PHONE' ? ' x 100' : ''}</p>
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
