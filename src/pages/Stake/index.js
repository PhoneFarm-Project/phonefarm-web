import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Tabs } from 'antd';
import { getSymbol } from 'utils/getErc20';
import { getIcon } from 'utils/getTokenStake';
import Pool from 'components/Pool';
import ButtonBack from 'components/ButtonBack';
import DepositModal from 'components/DepositModal';
import WithdrawModal from 'components/WithdrawModal';
import useInterval from 'utils/useInterval';
import { getAPY } from 'utils/calcApy';
import {
  setTokenAllowance,
  setTokenBal,
  setPendingIPhone,
  setTokenStake,
  setPoolInfo,
  setTokenLocked,
} from 'store/actions';

import PhoneFarm from 'assets/images/logo.png';
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
  let [statusDeposit, setStatusDeposit] = useState(true);

  let [poolSelected, setPoolSelected] = useState(0);
  let [apy, setApy] = useState(0);
  const [symbol, setSymbol] = useState(null);

  const pendingIPhone = useSelector((state) => state.pendingIPhone);
  const tokenAllowance = useSelector((state) => state.tokenAllowance);
  const listTokenStake = useSelector((state) => state.listTokenStake);
  const pools = useSelector((state) => state.pools);
  const tokenLocked = useSelector((state) => state.tokenLocked);
  const chainId = useSelector((state) => state.chainId);
  const tokenBal = useSelector((state) => state.tokenBal);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTokenAllowance());
    dispatch(setTokenBal());
    dispatch(setPendingIPhone());
    dispatch(setTokenStake());
    dispatch(setPoolInfo());
    dispatch(setTokenLocked());
  }, [listTokenStake.length, dispatch, pools.length]);

  useEffect(() => {
    tokenAllowance[poolSelected] > 0 ? setStatusDeposit(false) : setStatusDeposit(true);
  }, [poolSelected, tokenAllowance]);

  useEffect(() => {
    if (!!pools[poolSelected]) setSymbol(getSymbol(chainId, pools[poolSelected].lpToken));
  }, [chainId, pools, poolSelected]);

  useEffect(() => {
    let getApy = async () => {
      let apy = await getAPY(chainId, pools, poolSelected, tokenLocked);
      setApy(apy);
    };
    getApy();
  }, [chainId, pools, poolSelected, tokenLocked]);

  function selectPool(key) {
    setPoolSelected(key);
    dispatch(setTokenStake());
  }

  useInterval(() => {
    dispatch(setPendingIPhone());
  }, 5000);

  return (
    <Layout className='styleStake stake audio_font'>
      <div className='phone_header flex_between'>
        <div className='w32px'>
          <ButtonBack url='/home?preset=moveToRightFromLeft' />
        </div>
        <img src={PhoneFarm} alt='phonefarm' />
        <div className='w32px' />
      </div>

      <div className='phone_body flex_between'>
        {!!pools[poolSelected] ? (
          <div className='w50 flex'>
            <div className='phoneicon'>
              <img src={getIcon(chainId, pools[poolSelected].lpToken)} alt='icon phone' />
            </div>
            <div>
              <p className='phone_font'>{symbol}</p>
              <p className='phonefarm_font'>PhoneFarm</p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className='w50'>
          <p className='number_font'>{Math.round(tokenBal[poolSelected] * 100) / 100}</p>
          <p className='balance_font'>balance</p>
        </div>
      </div>

      <Tabs defaultActiveKey='0' onChange={selectPool}>
        {pools.map((e, i) => {
          return (
            <TabPane tab={getSymbol(chainId, e.lpToken)} key={i}>
              <Pool
                phoneStake={listTokenStake[i]}
                pendingIPhone={pendingIPhone[i]}
                token={getSymbol(chainId, e.lpToken)}
                apy={apy}
              />
            </TabPane>
          );
        })}
      </Tabs>
      <div className='deposit-and-withdraw'>
        <div className='row'>
          <div className='col-6'>
            <DepositModal
              statusDeposit={statusDeposit}
              poolSelected={poolSelected}
              marks={marks}
              getSymbol={getSymbol}
              tokenAllowance={tokenAllowance}
            />
          </div>
          <div className='col-6'>
            <WithdrawModal
              listTokenStake={listTokenStake}
              poolSelected={poolSelected}
              marks={marks}
              getSymbol={getSymbol}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Stake;
