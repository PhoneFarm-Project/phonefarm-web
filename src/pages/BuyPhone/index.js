import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, InputNumber, Slider, Button } from 'antd';
import ButtonBack from 'components/ButtonBack';
import { buyTokenPhone } from 'store/actions';
import EthIcon from 'assets/icons/eth-icon.png';
import PhoneIcon from 'assets/icons/phoneFarm-logo-128.png';

import './style.scss';

const marks = {
  0: '0%',
  25: '25%',
  50: '50%',
  75: '75%',
  100: '100%',
};

export default function BuyPhone() {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance);
  const loading = useSelector((state) => state.loading);
  const [amount, setAmount] = useState(0.1);

  function onChange(value) {
    setAmount(value);
  }

  const handleBuyToken = () => {
    if (amount <= 0) {
      setAmount(0.1);
    }

    if (amount > 0 && parseFloat(amount) <= balance) {
      dispatch(buyTokenPhone(amount)).then((data) => {
        if (!data) {
          setAmount(0);
        }
      });
    }
  };

  function changeSliderBuyPhone(value) {
    if (value <= 0) {
      setAmount(0.1);
    } else if (value >= 100) {
      setAmount(balance);
    } else {
      setAmount((value / 100) * balance);
    }
  }

  return (
    <Layout className='styleStake buy-phone'>
      <ButtonBack url='/home?preset=moveToRightFromLeft' />
      <div className='boxStake'>
        <p>
          <img className='token-transfer' src={EthIcon} /> <i className='arrow' />
          <i className='arrow' />
          <img className='token-transfer' src={PhoneIcon} />
        </p>
        <div className='w_100'>
          <InputNumber
            className='iph_input'
            min={0}
            placeholder='ETH'
            onChange={onChange}
            value={amount}
          />
        </div>
        <div className='w_100'>
          <InputNumber
            className='iph_input'
            placeholder='PHONE'
            min={0}
            readOnly={true}
            value={amount * 1000}
          />
        </div>
        <div className='w_100'>
          <div className='iph_input'>
            <Slider
              marks={marks}
              step={null}
              min={0.1}
              max={100}
              onChange={(e) => changeSliderBuyPhone(e)}
              value={(amount / balance) * 100}
            />
          </div>
        </div>
        <div className='w_100 text_left'>
          <p>Balance : {balance} ETH</p>
        </div>
        <div className='w_100'>
          <Button className='iph_input buy_bt' onClick={() => handleBuyToken()} loading={loading}>
            BUY
          </Button>
        </div>
      </div>
    </Layout>
  );
}
