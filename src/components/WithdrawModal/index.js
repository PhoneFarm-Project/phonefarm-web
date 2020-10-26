import React, { useState } from 'react';
import { withdrawToken } from 'store/actions';
import { useDispatch } from 'react-redux';
import { Button, Modal, InputNumber, Slider } from 'antd';

export default function WithdrawModal({ listTokenStake, poolSelected, marks, loading }) {
  const dispatch = useDispatch();

  let [modalWithdraw, setModalWithdraw] = useState(false);
  let [amountWithdraw, setAmountWithdraw] = useState(0.1);

  const handleWithdraw = (e) => {
    if (amountWithdraw <= 0) {
      setAmountWithdraw(0.1);
    }
    if (amountWithdraw > 0 && parseFloat(amountWithdraw) <= listTokenStake[poolSelected]) {
      dispatch(withdrawToken(poolSelected, amountWithdraw)).then((data) => {
        if (!data) {
          setModalWithdraw(false);
          setAmountWithdraw(0);
        }
      });
    }
  };

  const handleCancelWithdraw = (e) => {
    setModalWithdraw(false);
  };

  function withdrawChange(value) {
    setAmountWithdraw(
      parseFloat(value) >= listTokenStake[poolSelected] ? listTokenStake[poolSelected] : value
    );
  }

  function changeSliderWithdraw(value) {
    if (value <= 0) {
      setAmountWithdraw(0.1);
    } else if (value >= 100) {
      setAmountWithdraw(listTokenStake[poolSelected]);
    } else {
      setAmountWithdraw((value / 100) * listTokenStake[poolSelected]);
    }
  }

  return (
    <div>
      <Button
        className='bt-width'
        type='primary'
        shape='round'
        size='large'
        onClick={() => setModalWithdraw(true)}
      >
        Withdraw
      </Button>
      <Modal
        title={[
          <h2 key='title-withdraw' className='text-center'>
            <b>WITHDRAW</b>
          </h2>,
        ]}
        visible={modalWithdraw}
        onCancel={() => handleCancelWithdraw()}
        footer={[
          listTokenStake[poolSelected] > 0.1 ? (
            <Button
              key='withdraw'
              type='primary'
              shape='round'
              onClick={() => handleWithdraw()}
              loading={loading}
            >
              Withdraw
            </Button>
          ) : (
            ''
          ),
        ]}
      >
        <div className='w_100 text-center'>
          <InputNumber
            className='iph_input'
            step={0.1}
            min={0.1}
            placeholder='PHONE'
            onChange={withdrawChange}
            value={amountWithdraw}
          />
        </div>
        <div className='w_100 text-center'>
          <div className='iph_input'>
            <Slider
              marks={marks}
              min={0.1}
              max={100}
              step={null}
              onChange={(e) => changeSliderWithdraw(e)}
              value={(amountWithdraw / listTokenStake[poolSelected]) * 100}
            />
          </div>
        </div>
        <div className='w_100 text_left'>
          <p>Balance : {listTokenStake[poolSelected]} IPHONE</p>
        </div>
      </Modal>
    </div>
  );
}
