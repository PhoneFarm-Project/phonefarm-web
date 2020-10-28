import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Tabs } from 'antd';
import { getSymbol } from 'utils/getErc20';
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

  const pendingIPhone = useSelector((state) => state.pendingIPhone);
  const tokenAllowance = useSelector((state) => state.tokenAllowance);
  const listTokenStake = useSelector((state) => state.listTokenStake);
  const loading = useSelector((state) => state.loading);
  const pools = useSelector((state) => state.pools);
  const tokenLocked = useSelector((state) => state.tokenLocked);

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
    let getApy = async () => {
      let apy = await getAPY(pools, poolSelected, tokenLocked);
      setApy(apy);
    };
    getApy();
  }, [pools, poolSelected, tokenLocked]);

  function selectPool(key) {
    setPoolSelected(key);
    dispatch(setTokenStake());
  }

  useInterval(() => {
    dispatch(setPendingIPhone());
  }, 15000);

  return (
    <Layout className='styleStake stake'>
      <ButtonBack url='/home?preset=moveToRightFromLeft' />
      <div className='boxStake'>
        <h4>
          ( <b>APY</b> {apy} )
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
              <DepositModal
                statusDeposit={statusDeposit}
                poolSelected={poolSelected}
                marks={marks}
                loading={loading}
                getSymbol={getSymbol}
                tokenAllowance={tokenAllowance}
              />
            </div>
            <div className='col-6'>
              <WithdrawModal
                listTokenStake={listTokenStake}
                poolSelected={poolSelected}
                marks={marks}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Stake;
