import Factory from 'contracts/MasterFactory.json';
import Sale from 'contracts/Sale.json';
import PhoneToken from 'contracts/PhoneToken.json';
import IPhoneToken from 'contracts/IPhoneToken.json';
import Store from 'contracts/Store.json';
import Devices from 'contracts/Devices.json';
import { parseBalance } from 'utils/helper';
import { getTokensPresale, getDecimals } from 'utils/getTokensPresale';
import { getContractAddress } from 'utils/getContractAddress';
import { message } from 'antd';
import ethers from 'ethers';

var contractAddress;

export const SET_WEB3 = 'SET_WEB3';
export const setWeb3 = (web3) => (dispatch, getState) => {
  dispatch({ type: SET_WEB3, web3 });
  let { chainId } = getState();

  contractAddress = getContractAddress(chainId);

  const factoryInstance = new web3.eth.Contract(Factory.abi, contractAddress.factoryAddress);
  const saleInstance = new web3.eth.Contract(Sale.abi, contractAddress.saleAddress);
  const storeInstance = new web3.eth.Contract(Store.abi, contractAddress.storeAddress);
  const devicesInstance = new web3.eth.Contract(Devices.abi, contractAddress.devicesAddress);
  dispatch(setFactory(factoryInstance));
  dispatch(setSale(saleInstance));
  dispatch(setStore(storeInstance));
  dispatch(setDevices(devicesInstance));
  dispatch(setAddressPhoneToken());
};

export const SET_CHAINID = 'SET_CHAINID';
export const setChainId = (chainId) => (dispatch) => {
  dispatch({ type: SET_CHAINID, chainId });
};

export const SET_ADDRESS = 'SET_ADDRESS';
export const setAddress = (walletAddress) => (dispatch) => {
  var shortAddress = `${walletAddress.slice(0, 8)}...${walletAddress.slice(
    walletAddress.length - 6,
    walletAddress.length
  )}`;
  dispatch({
    type: SET_ADDRESS,
    walletAddress,
    shortAddress,
  });
  dispatch(setBalance());
};

export const SET_BALANCE = 'SET_BALANCE';
export const setBalance = () => async (dispatch, getState) => {
  let { web3, walletAddress } = getState();
  let balance;
  if (walletAddress !== null) balance = parseBalance(await web3.eth.getBalance(walletAddress), 18);
  else balance = 0;
  dispatch({
    type: SET_BALANCE,
    balance,
  });
};

export const SET_FACTORY = 'SET_FACTORY';
export const setFactory = (factoryInstance) => (dispatch) => {
  dispatch({ type: SET_FACTORY, factoryInstance });
};

export const SET_SALE = 'SET_SALE';
export const setSale = (saleInstance) => async (dispatch) => {
  let rate = await saleInstance.methods.rate().call();
  dispatch(setRate(rate));
  dispatch({ type: SET_SALE, saleInstance });
};

export const SET_RATE = 'SET_RATE';
export const setRate = (rate) => (dispatch) => {
  dispatch({ type: SET_RATE, rate });
};

export const SET_STORE = 'SET_STORE';
export const setStore = (storeInstance) => (dispatch) => {
  dispatch({ type: SET_STORE, storeInstance });
};

export const SET_DEVICES = 'SET_DEVICES';
export const setDevices = (devicesInstance) => (dispatch) => {
  dispatch({ type: SET_DEVICES, devicesInstance });
};

export const SET_TOKEN_BAL = 'SET_TOKEN_BAL';
export const setTokenBal = () => async (dispatch, getState) => {
  let state = getState();
  const walletAddress = state.walletAddress;
  const web3 = state.web3;
  const pools = state.pools;
  try {
    let tokenBal = [];
    for (let i = 0; i < pools.length; i++) {
      let tokenInstance = new web3.eth.Contract(PhoneToken.abi, pools[i].lpToken);
      let bal = await tokenInstance.methods.balanceOf(walletAddress).call();
      tokenBal.push(parseBalance(bal));
    }
    dispatch({ type: SET_TOKEN_BAL, tokenBal });
  } catch (e) {
    console.error(e);
  }
};

export const SET_TOKEN_STAKE = 'SET_TOKEN_STAKE';
export const setTokenStake = () => async (dispatch, getState) => {
  let state = getState();
  const walletAddress = state.walletAddress;
  const factoryInstance = state.factoryInstance;
  try {
    const poolLength = await factoryInstance.methods.poolLength().call({ from: walletAddress });
    let listTokenStake = [];
    for (let i = 0; i < poolLength; i++) {
      let userInfo = await factoryInstance.methods.userInfo(i, walletAddress).call();
      let tokenStake = userInfo.amount;
      listTokenStake.push(parseBalance(tokenStake));
    }
    dispatch({ type: SET_TOKEN_STAKE, listTokenStake });
  } catch (e) {
    console.error(e);
  }
};

export const SET_PENDING_IPHONE = 'SET_PENDING_IPHONE';
export const setPendingIPhone = () => async (dispatch, getState) => {
  let state = getState();
  const walletAddress = state.walletAddress;
  const factoryInstance = state.factoryInstance;
  try {
    const poolLength = await factoryInstance.methods.poolLength().call();
    let pendingIPhone = [];
    for (let i = 0; i < poolLength; i++) {
      let pending = await factoryInstance.methods.pendingIPhone(i, walletAddress).call();
      pendingIPhone.push(parseInt(parseBalance(pending)));
    }
    dispatch({ type: SET_PENDING_IPHONE, pendingIPhone });
  } catch (e) {
    console.error(e);
  }
};

export const SET_IPHONE_BAL = 'SET_IPHONE_BAL';
export const setIPhoneBal = () => async (dispatch, getState) => {
  let state = getState();
  const walletAddress = state.walletAddress;
  const web3 = state.web3;
  try {
    const iPhoneInstance = new web3.eth.Contract(
      IPhoneToken.abi,
      contractAddress.iPhoneTokenAddress
    );
    let iPhoneBal = await iPhoneInstance.methods.balanceOf(walletAddress).call();
    dispatch({ type: SET_IPHONE_BAL, iPhoneBal });
  } catch (e) {
    console.error(e);
  }
};

export const SET_TOKEN_ALLOWANCE = 'SET_TOKEN_ALLOWANCE';
export const setTokenAllowance = () => async (dispatch, getState) => {
  await dispatch(setPoolInfo);
  let state = getState();
  const walletAddress = state.walletAddress;
  const web3 = state.web3;
  const pools = state.pools;
  try {
    let tokenAllowance = [];
    for (let i = 0; i < pools.length; i++) {
      let tokenInstance = new web3.eth.Contract(PhoneToken.abi, pools[i].lpToken);
      let allowance = await tokenInstance.methods
        .allowance(walletAddress, contractAddress.factoryAddress)
        .call();
      tokenAllowance.push(parseBalance(allowance));
    }
    dispatch({ type: SET_TOKEN_ALLOWANCE, tokenAllowance });
  } catch (e) {
    console.error(e);
  }
};

export const SET_LOADING_APPROVE = 'SET_LOADING_APPROVE';
export const setLoading = (loading) => async (dispatch) => {
  dispatch({ type: SET_LOADING_APPROVE, loading });
};

export const SET_STAKE_APPROVE = 'SET_STAKE_APPROVE';
export const setLoadingStake = (index, loading) => async (dispatch, getState) => {
  let { loadingStake } = getState();
  loadingStake[index] = loading;
  dispatch({ type: SET_STAKE_APPROVE, loadingStake });
};

export const SET_LOADING_WITHDRAW = 'SET_LOADING_WITHDRAW';
export const setLoadingWithdraw = (index, loading) => async (dispatch, getState) => {
  let { loadingWithdraw } = getState();
  loadingWithdraw[index] = loading;
  dispatch({ type: SET_LOADING_WITHDRAW, loadingWithdraw });
};

export const approveToken = (poolSelected, tokenAddress) => async (dispatch, getState) => {
  let state = getState();
  dispatch(setLoadingStake(poolSelected, true));
  const walletAddress = state.walletAddress;
  const web3 = state.web3;
  const weiValue = web3.utils.toWei('1000000000', 'ether');
  try {
    const tokenInstance = new web3.eth.Contract(PhoneToken.abi, tokenAddress);
    await tokenInstance.methods
      .approve(contractAddress.factoryAddress, weiValue)
      .send({ from: walletAddress });
    dispatch(setTokenAllowance());
    dispatch(setLoadingStake(poolSelected, false));
  } catch (e) {
    dispatch(setLoadingStake(poolSelected, false));
    console.error(e);
  }
};

export const SET_POOL_LENTH = 'SET_POOL_LENGTH';
export const setPoolLength = () => async (dispatch, getState) => {
  const { factoryInstance } = getState();
  try {
    const poolLength = await factoryInstance.methods.poolLength().call();
    dispatch({ type: SET_POOL_LENTH, poolLength });
  } catch (e) {
    console.error(e);
  }
};

export const SET_POOL_INFO = 'SET_POOL_INFO';
export const setPoolInfo = () => async (dispatch, getState) => {
  const { factoryInstance } = getState();
  try {
    const poolLength = await factoryInstance.methods.poolLength().call();
    let pools = [];
    for (let i = 0; i < poolLength; i++) {
      let pool = await factoryInstance.methods.poolInfo(i).call();
      pools.push({
        lpToken: pool.lpToken,
        allocPoint: pool.allocPoint,
        lastRewardBlock: pool.lastRewardBlock,
        accIPhonePerShare: pool.accIPhonePerShare,
      });
    }
    dispatch({ type: SET_POOL_INFO, pools });
  } catch (e) {
    console.error(e);
  }
};

export const depositToken = (pid, amount) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const { walletAddress, factoryInstance, web3 } = getState();
  const weiValue = web3.utils.toWei(amount.toString(), 'ether');
  try {
    await factoryInstance.methods.deposit(pid, weiValue).send({ from: walletAddress });
    dispatch(setTokenAllowance());
    dispatch(setTokenStake());
    dispatch(setLoading(false));
    dispatch(setPendingIPhone());
  } catch (e) {
    dispatch(setLoading(false));
    console.error(e);
    return e;
  }
};

export const withdrawToken = (pid, amount) => async (dispatch, getState) => {
  let { walletAddress, factoryInstance, web3 } = getState();
  dispatch(setLoadingWithdraw(pid, true));
  const weiValue = web3.utils.toWei(amount.toString(), 'ether');
  try {
    await factoryInstance.methods.withdraw(pid, weiValue).send({ from: walletAddress });
    dispatch(setTokenAllowance());
    dispatch(setTokenStake());
    dispatch(setLoadingWithdraw(pid, false));
    dispatch(setPendingIPhone());
  } catch (e) {
    dispatch(setLoadingWithdraw(pid, false));
    console.error(e);
    return e;
  }
};

export const SET_IPHONE_ALLOWANCE = 'SET_IPHONE_ALLOWANCE';
export const setIPhoneAllowance = () => async (dispatch, getState) => {
  let state = getState();
  const walletAddress = state.walletAddress;
  const web3 = state.web3;
  try {
    const iPhoneInstance = new web3.eth.Contract(
      IPhoneToken.abi,
      contractAddress.iPhoneTokenAddress
    );
    let iPhoneAllowance = await iPhoneInstance.methods
      .allowance(walletAddress, contractAddress.storeAddress)
      .call();
    dispatch({ type: SET_IPHONE_ALLOWANCE, iPhoneAllowance });
  } catch (e) {
    console.error(e);
  }
};

export const SET_OWNED_DEVICES = 'SET_OWNED_DEVICES';
export const setOwnedDevices = () => async (dispatch, getState) => {
  let state = getState();
  let ownedDevices = state.ownedDevices;
  if (!ownedDevices.length) {
    dispatch(setLoading(true));
  }
  const walletAddress = state.walletAddress;
  const devicesInstance = state.devicesInstance;
  try {
    let ownedDevicesIds = await devicesInstance.methods.getOwnedDevices(walletAddress).call();
    let ownedDevices = [];
    ownedDevices = await Promise.all(
      ownedDevicesIds.map(async (i) => {
        let device = {};
        let deviceInfo = await devicesInstance.methods.getSpecsById(i).call();
        let totalSupply = await devicesInstance.methods.totalSupply(i).call();
        let maxSupply = await devicesInstance.methods.maxSupply(i).call();
        let balance = await devicesInstance.methods.balanceOf(walletAddress, i).call();
        device.id = i;
        device.totalSupply = totalSupply;
        device.maxSupply = maxSupply;
        device.model = deviceInfo.model;
        device.color = deviceInfo.color;
        device.price = deviceInfo.price;
        device.others = deviceInfo.others;
        device.balance = balance;
        return device;
      })
    );
    dispatch({ type: SET_OWNED_DEVICES, ownedDevices });
    dispatch(setLoading(false));
  } catch (e) {
    console.error(e);
    dispatch(setLoading(false));
  }
};

export const SET_ALL_DEVICES = 'SET_ALL_DEVICES';
export const setAllDevices = () => async (dispatch, getState) => {
  let state = getState();
  const devicesInstance = state.devicesInstance;
  const devices = state.allDevices;
  if (!devices.length) {
    dispatch(setLoading(true));
  }
  try {
    let currentTokenId = await devicesInstance.methods.getCurrentTokenId().call();
    let allDevices = [];
    let listTokenId = Array.from({ length: currentTokenId - 1 }, (_, i) => i + 1);
    allDevices = await Promise.all(
      listTokenId.map(async (i) => {
        let device = {};
        let deviceInfo = await devicesInstance.methods.getSpecsById(i).call();
        let totalSupply = await devicesInstance.methods.totalSupply(i).call();
        let maxSupply = await devicesInstance.methods.maxSupply(i).call();
        device.id = i;
        device.totalSupply = totalSupply;
        device.maxSupply = maxSupply;
        device.model = deviceInfo.model;
        device.color = deviceInfo.color;
        device.price = deviceInfo.price;
        device.others = deviceInfo.others;
        return device;
      })
    );
    dispatch({ type: SET_ALL_DEVICES, allDevices });
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.log('Error', error);
  }
};

export const approveIPhone = () => async (dispatch, getState) => {
  let state = getState();
  const walletAddress = state.walletAddress;
  const web3 = state.web3;
  const weiValue = web3.utils.toWei('1000000000', 'ether');
  dispatch(setLoading(true));
  try {
    const iPhoneInstance = new web3.eth.Contract(
      IPhoneToken.abi,
      contractAddress.iPhoneTokenAddress
    );
    await iPhoneInstance.methods
      .approve(contractAddress.storeAddress, weiValue)
      .send({ from: walletAddress });
    dispatch(setIPhoneAllowance());
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
    console.error(e);
  }
};

export const buyDevice = (_id) => async (dispatch, getState) => {
  let state = getState();
  const walletAddress = state.walletAddress;
  const storeInstance = state.storeInstance;
  dispatch(setLoading(true));
  try {
    await storeInstance.methods.buyDevices(_id, 1, '0x').send({ from: walletAddress });
    dispatch(setIPhoneAllowance());
    dispatch(setOwnedDevices());
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.error(error);
  }
};

export const buyTokenPhoneByETH = (amount) => async (dispatch, getState) => {
  let state = getState();
  const { web3, walletAddress, saleInstance } = state;
  const weiValue = web3.utils.toWei(amount.toString(), 'ether');
  dispatch(setLoading(true));
  try {
    await saleInstance.methods.buyByETH().send({ from: walletAddress, value: weiValue });
    dispatch(setLoading(false));
    dispatch(setAllowancesERC20());
    dispatch(setPhoneBalance());
    message.success('Buy Success!');
  } catch (e) {
    dispatch(setLoading(false));
    console.error(e);
    message.error('Buy Error!');
    return e;
  }
};

export const SET_TOKEN_LOCKED = 'SET_TOKEN_LOCKED';
export const setTokenLocked = () => async (dispatch, getState) => {
  let state = getState();
  const web3 = state.web3;
  const pools = state.pools;
  try {
    let tokenLocked = [];
    for (let i = 0; i < pools.length; i++) {
      let tokenInstance = new web3.eth.Contract(PhoneToken.abi, pools[i].lpToken);
      let lock = await tokenInstance.methods.balanceOf(contractAddress.factoryAddress).call();
      tokenLocked.push(parseBalance(lock));
    }
    dispatch({ type: SET_TOKEN_LOCKED, tokenLocked });
  } catch (e) {
    console.error(e);
  }
};

export const approveTokenERC = (_addressERC) => async (dispatch, getState) => {
  let state = getState();
  const walletAddress = state.walletAddress;
  const web3 = state.web3;
  dispatch(setLoading(true));
  try {
    let tokenInstance = new web3.eth.Contract(PhoneToken.abi, _addressERC);
    await tokenInstance.methods
      .approve(
        contractAddress.saleAddress,
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )
      .send({ from: walletAddress });
    await dispatch(setAllowancesERC20());
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
    console.error(e);
  }
};

export const SET_ADDRESS_PHONE_TOKEN = 'SET_ADDRESS_PHONE_TOKEN';
export const setAddressPhoneToken = () => async (dispatch, getState) => {
  let { chainId } = getState();
  let addressPhoneToken = getContractAddress(chainId).phoneTokenAddress;
  dispatch({ type: SET_ADDRESS_PHONE_TOKEN, addressPhoneToken });
};

export const SET_PHONE_BALANCE = 'SET_PHONE_BALANCE';
export const setPhoneBalance = () => async (dispatch, getState) => {
  let state = getState();
  const { walletAddress, addressPhoneToken } = state;
  const web3 = state.web3;
  try {
    const PhoneInstance = new web3.eth.Contract(PhoneToken.abi, addressPhoneToken);
    let phoneBalance = parseBalance(
      await PhoneInstance.methods.balanceOf(walletAddress).call(),
      18
    );
    dispatch({ type: SET_PHONE_BALANCE, phoneBalance });
  } catch (e) {
    console.error(e);
  }
};

export const SET_TOKENS_PRESALE = 'SET_TOKENS_PRESALE';
export const setTokensPresale = () => async (dispatch, getState) => {
  let { chainId } = getState();
  let tokensPresale = getTokensPresale(chainId);
  dispatch({ type: SET_TOKENS_PRESALE, tokensPresale });
};

export const SET_ALLOWANCE_ERC20 = 'SET_ALLOWANCE_ERC20';
export const setAllowancesERC20 = () => async (dispatch, getState) => {
  const { web3, walletAddress, tokensPresale } = getState();
  try {
    let erc20Allowances = [];
    for (let i = 0; i < tokensPresale.length; i++) {
      if (tokensPresale[i].symbol !== 'ETH') {
        let tokenInstance = new web3.eth.Contract(PhoneToken.abi, tokensPresale[i].address);
        let allowance = await tokenInstance.methods
          .allowance(walletAddress, contractAddress.saleAddress)
          .call();
        let balanceERC = await tokenInstance.methods.balanceOf(walletAddress).call();
        erc20Allowances[tokensPresale[i].address] = {
          allowance: parseBalance(allowance, tokensPresale[i].decimals),
          balance: parseBalance(balanceERC, tokensPresale[i].decimals),
        };
      }
    }
    let balance = parseBalance(await web3.eth.getBalance(walletAddress), 18);
    erc20Allowances['0'] = {
      allowance: 10e18,
      balance,
    };
    dispatch({ type: SET_ALLOWANCE_ERC20, erc20Allowances });
  } catch (e) {
    console.error(e);
  }
};

export const buyTokenPhoneByERC = (_token, _amount) => async (dispatch, getState) => {
  let state = getState();
  const { chainId, walletAddress, saleInstance } = state;
  let decimals = getDecimals(chainId, _token);
  const decimalsValue = ethers.utils.parseUnits(_amount.toString(), decimals);
  dispatch(setLoading(true));
  console.log(saleInstance.methods);
  try {
    await saleInstance.methods
      .buyByERC20(_token, decimalsValue.toHexString())
      .send({ from: walletAddress });
    dispatch(setLoading(false));
    dispatch(setAllowancesERC20());
    dispatch(setPhoneBalance());
    message.success('Buy Success!');
  } catch (e) {
    dispatch(setLoading(false));
    message.error('Buy Error!');
    console.error(e);
    return e;
  }
};
