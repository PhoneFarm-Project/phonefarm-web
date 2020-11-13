import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, InputNumber, Slider } from 'antd';

import { approveToken, depositToken } from 'store/actions';

export default function DepositModal({
  statusDeposit,
  poolSelected,
  marks,
  loading,
  getSymbol,
  tokenAllowance,
}) {
  let [modalDeposit, setModalDeposit] = useState(false);
  let [amountDeposit, setAmountDeposit] = useState(0.1);

  const loadingStake = useSelector((state) => state.loadingStake);
  const tokenBal = useSelector((state) => state.tokenBal);
  const pools = useSelector((state) => state.pools);
  const chainId = useSelector((state) => state.chainId);

  const dispatch = useDispatch();

  const handleDeposit = (e) => {
    if (amountDeposit <= 0) {
      setAmountDeposit(0.1);
    }

    if (amountDeposit > 0 && parseFloat(amountDeposit) <= tokenBal[poolSelected]) {
      dispatch(depositToken(poolSelected, amountDeposit)).then((data) => {
        if (!data) {
          setModalDeposit(false);
          setAmountDeposit(0);
        }
      });
    }
  };

  function changeSliderDeposit(value) {
    if (value <= 0) {
      setAmountDeposit(0.1);
    } else if (value >= 100) {
      setAmountDeposit(tokenBal[poolSelected]);
    } else {
      setAmountDeposit((value / 100) * tokenBal[poolSelected]);
    }
  }

  const handleApprove = () => {
    let tokenAddress = pools[poolSelected].lpToken;
    dispatch(approveToken(poolSelected, tokenAddress));
  };

  function depositChange(value) {
    setAmountDeposit(parseFloat(value) >= tokenBal[poolSelected] ? tokenBal[poolSelected] : value);
  }

  const handleCancelDeposit = (e) => {
    setModalDeposit(false);
  };

  return (
    <div>
      <Button
        className='bt-liner'
        type='primary'
        shape='round'
        size='large'
        onClick={() => setModalDeposit(true)}
      >
        Deposit
      </Button>
      <Modal
        title={[
          <h2 key='title-deposit' className='text-center'>
            <b>DEPOSIT</b>
          </h2>,
        ]}
        visible={modalDeposit}
        onCancel={() => handleCancelDeposit()}
        footer={[
          <Button
            key='approve'
            type='primary'
            shape='round'
            disabled={!statusDeposit}
            onClick={() => handleApprove()}
            loading={tokenAllowance[poolSelected] === 0 && !!loadingStake[poolSelected]}
          >
            Approve
          </Button>,
          <Button
            key='submit'
            type='primary'
            shape='round'
            disabled={statusDeposit}
            loading={tokenAllowance[poolSelected] > 0 && !!loadingStake[poolSelected]}
            onClick={() => handleDeposit()}
          >
            Deposit
          </Button>,
        ]}
      >
        <div className='w_100 text-center'>
          <InputNumber
            className='iph_input'
            step={0.1}
            min={0.1}
            placeholder='PHONE'
            onChange={(e) => depositChange(e)}
            value={amountDeposit}
          />
        </div>
        <div className='w_100 text-center'>
          <div className='iph_input'>
            <Slider
              marks={marks}
              min={0.1}
              max={100}
              step={null}
              onChange={(e) => changeSliderDeposit(e)}
              value={(amountDeposit / tokenBal[poolSelected]) * 100}
            />
          </div>
        </div>
        <div className='w_100 text_left'>
          {pools[poolSelected] ? (
            <p>
              Balance : {tokenBal[poolSelected]} {getSymbol(chainId, pools[poolSelected].lpToken)}
            </p>
          ) : (
            <p>Balance : 0</p>
          )}
        </div>
      </Modal>
    </div>
  );
}
