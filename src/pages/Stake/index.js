import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import {
  setTokenAllowance,
  approveToken,
  setTokenBal,
  setPendingIPhone,
  setTokenStake,
  depositToken,
  withdrawToken,
  setPoolInfo,
} from 'store/actions';
import { Layout, Button, Modal, InputNumber, Slider } from 'antd';
import ButtonBack from 'components/ButtonBack';
import Pool from 'components/Pool';
import { getSymbol } from 'utils/getErc20';
import './style.scss';
const { TabPane } = Tabs;
const marks = {
  0: '0%',
  25: '25%',
  50: '50%',
  75: '75%',
  100: '100%',
};

function Stake() {
  let [modalDeposit, setModalDeposit] = useState(false);
  let [modalWithdraw, setModalWithdraw] = useState(false);
  let [statusDeposit, setStatusDeposit] = useState(true);
  let [amountDeposit, setAmountDeposit] = useState(0.1);
  let [amountWithdraw, setAmountWithdraw] = useState(0.1);
  let [poolSelected, setPoolSelected] = useState(0);

  const tokenBal = useSelector((state) => state.tokenBal);
  const pendingIPhone = useSelector((state) => state.pendingIPhone);
  const tokenAllowance = useSelector((state) => state.tokenAllowance);
  const listTokenStake = useSelector((state) => state.listTokenStake);
  const loading = useSelector((state) => state.loading);
  const pools = useSelector((state) => state.pools);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTokenAllowance());
    dispatch(setTokenBal());
    dispatch(setPendingIPhone());
    dispatch(setTokenStake());
    dispatch(setPoolInfo());
  }, [listTokenStake.length, dispatch, pools.length]);

  useEffect(() => {
    tokenAllowance[poolSelected] > 0 ? setStatusDeposit(false) : setStatusDeposit(true);
  }, [poolSelected, tokenAllowance]);
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

  const handleCancelDeposit = (e) => {
    setModalDeposit(false);
  };
  const handleCancelWitdraw = (e) => {
    setModalWithdraw(false);
  };

  const handleApprove = (e) => {
    let tokenAddress = pools[poolSelected].lpToken;
    dispatch(approveToken(tokenAddress));
  };

  function depositChange(value) {
    setAmountDeposit(parseFloat(value) >= tokenBal[poolSelected] ? tokenBal[poolSelected] : value);
  }

  function withdrawChange(value) {
    setAmountWithdraw(
      parseFloat(value) >= listTokenStake[poolSelected] ? listTokenStake[poolSelected] : value
    );
  }

  function changeSliderDeposit(value) {
    if (value <= 0) {
      setAmountDeposit(0.1);
    } else if (value >= 100) {
      setAmountDeposit(tokenBal[poolSelected]);
    } else {
      setAmountDeposit((value / 100) * tokenBal[poolSelected]);
    }
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
  function selectPool(key) {
    setPoolSelected(key);
    dispatch(setTokenStake());
  }

  return (
    <Layout className='styleStake stake'>
      <ButtonBack url='/home?preset=moveToRightFromLeft' />
      <div className='boxStake'>
        <h4>
          ( <b>100</b> IPH / block )
        </h4>
        <div className='arrow-top'>
          <div className='chevron'></div>
          <div className='chevron'></div>
          <div className='chevron'></div>
        </div>

        <Tabs defaultActiveKey='0' onChange={selectPool}>
          {pools.map((e, i) => {
            return (
              <TabPane tab={getSymbol(e.lpToken)} key={i}>
                <Pool
                  phoneStake={listTokenStake[i]}
                  pendingIPhone={pendingIPhone[i]}
                  token={getSymbol(e.lpToken)}
                />
              </TabPane>
            );
          })}
        </Tabs>
        <div className='deposit-and-withdraw'>
          <div className='row'>
            <div className='col-6'>
              <Button
                type='primary'
                shape='round'
                size='large'
                onClick={() => setModalDeposit(true)}
              >
                Deposit
              </Button>
            </div>
            <div className='col-6'>
              <Button
                type='primary'
                shape='round'
                size='large'
                onClick={() => setModalWithdraw(true)}
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>
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
              loading={tokenAllowance[poolSelected] === 0 && loading}
            >
              Approve
            </Button>,
            <Button
              key='submit'
              type='primary'
              shape='round'
              disabled={statusDeposit}
              loading={tokenAllowance[poolSelected] > 0 && loading}
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
                Balance : {tokenBal[poolSelected]} {getSymbol(pools[poolSelected].lpToken)}
              </p>
            ) : (
              <p>Balance : 0</p>
            )}
          </div>
        </Modal>

        <Modal
          title={[
            <h2 key='title-withdraw' className='text-center'>
              <b>WITHDRAW</b>
            </h2>,
          ]}
          visible={modalWithdraw}
          onCancel={() => handleCancelWitdraw()}
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
            <p>Balance : {listTokenStake[poolSelected]} IPH</p>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}

export default Stake;
