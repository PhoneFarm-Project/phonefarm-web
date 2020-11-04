import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, InputNumber, Select, Layout, Slider } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import {
  setAllowancesERC20,
  approveTokenERC,
  setPhoneBalance,
  buyTokenPhoneByETH,
  buyTokenPhoneByERC,
  setTokensPresale,
} from 'store/actions';
import { parseBalance } from 'utils/helper';
import { getDecimals } from 'utils/getTokensPresale';
import ethers from 'ethers';
import ButtonBack from 'components/ButtonBack';
import './style.scss';

const { Option } = Select;

const marks = {
  0: '0%',
  25: '25%',
  50: '50%',
  75: '75%',
  100: '100%',
};

function BuyPhone() {
  const dispatch = useDispatch();
  const web3 = useSelector((state) => state.web3);
  const walletAddress = useSelector((state) => state.walletAddress);
  const loading = useSelector((state) => state.loading);
  const phoneBalance = useSelector((state) => state.phoneBalance);
  const saleInstance = useSelector((state) => state.saleInstance);
  const erc20Allowances = useSelector((state) => state.erc20Allowances);
  const tokensPresale = useSelector((state) => state.tokensPresale);
  const rate = useSelector((state) => state.rate);
  const chainId = useSelector((state) => state.chainId);
  const [tokenCurrent, setTokenCurrent] = useState('0');
  const [amount, setAmount] = useState(0.1);
  const [amountPhoneToken, setAmountPhoneToken] = useState(0);
  const [balanceToken, setBalanceToken] = useState(0);

  useEffect(() => {
    dispatch(setTokensPresale());
    if (web3 && walletAddress) {
      dispatch(setAllowancesERC20());
      dispatch(setPhoneBalance());
    }
    if (web3 && erc20Allowances[tokenCurrent]) {
      setBalanceToken(erc20Allowances[tokenCurrent].balance);
    }
  }, [dispatch, web3, walletAddress, tokenCurrent, erc20Allowances]);

  useEffect(() => {
    if (web3) {
      calculatePhoneTokenAmount();
    }
  });

  const onChangeToken = async (value) => {
    setTokenCurrent(value);
    setBalanceToken(erc20Allowances[value].balance);
    setAmount(0.1);
  };

  const changeAmount = (value) => {
    if (web3) {
      if (value <= 0.1) {
        setAmount(0.1);
      } else if (value >= balanceToken) {
        setAmount(parseInt(balanceToken));
      } else if (value > 0.1 && value < balanceToken) {
        setAmount(value);
      }
    } else {
      setAmount(value);
    }
  };

  const approveToken = () => {
    dispatch(approveTokenERC(tokenCurrent));
  };

  const buyPhone = async () => {
    if (tokenCurrent === '0') {
      dispatch(buyTokenPhoneByETH(amount));
    } else {
      dispatch(buyTokenPhoneByERC(tokenCurrent, amount));
    }
  };

  const calculatePhoneTokenAmount = async () => {
    if (web3 && saleInstance && !isNaN(amount) && !isNaN(parseFloat(amount))) {
      let decimals = getDecimals(chainId, tokenCurrent);
      const decimalsValue = ethers.utils.parseUnits(
        parseFloat(amount).toFixed(3).toString(),
        decimals
      );
      if (tokenCurrent === '0') {
        let amountPhone = parseFloat(amount).toFixed(3) * rate;
        setAmountPhoneToken(amountPhone);
      } else {
        let amountPhone = parseBalance(
          await saleInstance.methods
            .erc20ToPhoneToken(tokenCurrent, decimalsValue.toString())
            .call(),
          18
        );
        setAmountPhoneToken(amountPhone);
      }
    }
  };

  const setMaxAmount = () => {
    console.log(amount);
    if (web3 && erc20Allowances.length > 0 && balanceToken >= amount) {
      setAmount(parseInt(balanceToken));
    }
  };

  function changeSliderBuyPhone(value) {
    if (value <= 0) {
      setAmount(0.1);
    } else if (value >= 100) {
      setAmount(parseInt(balanceToken));
    } else {
      setAmount((value / 100) * balanceToken);
    }
  }

  return (
    <Layout className='styleStake buy-phone'>
      <div className='phone_header flex_between'>
        <ButtonBack url='/home?preset=moveToRightFromLeft' />
      </div>
      <div className='page-sale'>
        <div className='offering-content'>
          <div className='offering-buy-token'>
            <div className='col-12 col-md-6 order-1 order-md-2'>
              <div className='offering-box-buy-token'>
                <div className='offering-text-exchange'>Buy PHONE</div>
                <div className='offering-amount-to-phone'>
                  <div className='offering-amount'>
                    <InputNumber
                      size='large'
                      min={0.1}
                      step={0.1}
                      placeholder='0.0'
                      className='offering-amount-input'
                      value={amount}
                      onChange={(e) => changeAmount(e)}
                    />
                    <button
                      className='offering-amount-btn-max'
                      onClick={() => setMaxAmount()}
                      disabled={!web3}
                    >
                      Max
                    </button>
                    <div height='24px' className='offering-amount-seperate'></div>
                    <Select
                      value={tokenCurrent}
                      className='offering-amount-select-token'
                      showSearch
                      placeholder='Select Token'
                      optionFilterProp='children'
                      onChange={(e) => onChangeToken(e)}
                      defaultValue='0'
                      filterOption={(input, option) =>
                        option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {tokensPresale.map((token, index) => {
                        return (
                          <Option value={token.address} key={index}>
                            {token.icon ? (
                              <img
                                src={token.icon}
                                alt='icon-token'
                                key={'token' + index}
                                className='offering-icon-token'
                              />
                            ) : (
                              ''
                            )}
                            {token.symbol}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                  <div className='offering-balance-token'>
                    <span>Balance:</span>
                    {web3 && erc20Allowances.length > 0 ? balanceToken : ''}
                    &nbsp; &nbsp;
                  </div>
                  <div className='clear-both'></div>
                  <div className='offering-icon-arrow-down'>
                    <ArrowDownOutlined />
                  </div>
                  <div className='offering-to-phone'>
                    <div className='offering-phone'>{amountPhoneToken}</div>
                    <span className='offering-phone-text'>PHONE</span>
                  </div>
                  <div className='offering-balance-token'>
                    <span>Balance:</span>
                    {web3 ? phoneBalance : ''}
                    &nbsp; &nbsp;
                  </div>
                  <div className='clear-both'></div>
                  <div className='offering-slider'>
                    <Slider
                      marks={marks}
                      step={null}
                      min={0.1}
                      max={100}
                      onChange={(e) => changeSliderBuyPhone(e)}
                      value={(amount / (erc20Allowances[tokenCurrent] ? balanceToken : 0)) * 100}
                    />
                  </div>
                </div>
                {web3 &&
                tokenCurrent !== '0' &&
                erc20Allowances[tokenCurrent] &&
                erc20Allowances[tokenCurrent].allowance <= 0 ? (
                  <Button
                    shape='round'
                    className='offering-button-exchange'
                    disabled={!web3}
                    onClick={() => approveToken()}
                    loading={loading}
                  >
                    Approve
                  </Button>
                ) : (
                  <Button
                    shape='round'
                    className='offering-button-exchange'
                    disabled={!web3 || (erc20Allowances.length > 0 && amount > balanceToken)}
                    onClick={() => buyPhone()}
                    loading={loading}
                  >
                    Buy
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BuyPhone;
