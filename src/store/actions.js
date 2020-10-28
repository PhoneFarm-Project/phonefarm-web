import Factory from 'contracts/MasterFactory.json';
import PreSale from 'contracts/PreSale.json';
import PhoneToken from 'contracts/PhoneToken.json';
import IPhoneToken from 'contracts/IPhoneToken.json';
import Store from 'contracts/Store.json';
import Devices from 'contracts/Devices.json';
import { parseBalance } from 'utils/helper';
import { getContractAddress } from 'utils/getContractAddress';
var contractAddress;

export const SET_WEB3 = 'SET_WEB3';
export const setWeb3 = (web3) => (dispatch, getState) => {
  dispatch({ type: SET_WEB3, web3 });
  let { chainId } = getState();

  contractAddress = getContractAddress(chainId);

  const factoryInstance = new web3.eth.Contract(Factory.abi, contractAddress.factoryAddress);
  const preSaleInstance = new web3.eth.Contract(PreSale.abi, contractAddress.PreSaleAddress);
  const storeInstance = new web3.eth.Contract(Store.abi, contractAddress.storeAddress);
  const devicesInstance = new web3.eth.Contract(Devices.abi, contractAddress.devicesAddress);
  dispatch(setFactory(factoryInstance));
  dispatch(setPreSale(preSaleInstance));
  dispatch(setStore(storeInstance));
  dispatch(setDevices(devicesInstance));
};

export const SET_CHAINID = 'SET_CHAINID';
export const setChainId = (chainId) => (dispatch) => {
  dispatch({ type: SET_CHAINID, chainId });
};

export const SET_ADDRESS = 'SET_ADDRESS';
export const setAddress = (walletAddress) => (dispatch) => {
  dispatch({
    type: SET_ADDRESS,
    walletAddress,
  });
  dispatch(setBalance());
};

export const SET_BALANCE = 'SET_BALANCE';
export const setBalance = () => async (dispatch, getState) => {
  let { web3, walletAddress } = getState();
  let balance;
  if (walletAddress !== null) balance = parseBalance(await web3.eth.getBalance(walletAddress));
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

export const SET_PRESALE = 'SET_PRESALE';
export const setPreSale = (preSaleInstance) => (dispatch) => {
  dispatch({ type: SET_PRESALE, preSaleInstance });
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
      pendingIPhone.push(parseBalance(pending));
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

export const approveToken = (tokenAddress) => async (dispatch, getState) => {
  let state = getState();
  dispatch(setLoading(true));
  const walletAddress = state.walletAddress;
  const web3 = state.web3;
  const weiValue = web3.utils.toWei('1000000000', 'ether');
  try {
    const tokenInstance = new web3.eth.Contract(PhoneToken.abi, tokenAddress);
    await tokenInstance.methods
      .approve(contractAddress.factoryAddress, weiValue)
      .send({ from: walletAddress });
    dispatch(setTokenAllowance());
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
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
  dispatch(setLoading(true));
  const weiValue = web3.utils.toWei(amount.toString(), 'ether');
  try {
    await factoryInstance.methods.withdraw(pid, weiValue).send({ from: walletAddress });
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
  dispatch(setLoading(true));
  const walletAddress = state.walletAddress;
  const devicesInstance = state.devicesInstance;
  try {
    let ownedDevicesIds = await devicesInstance.methods.getOwnedDevices(walletAddress).call();
    let ownedDevices = [];
    for (let i = 0; i < ownedDevicesIds.length; i++) {
      let device = {};
      let deviceInfo = await devicesInstance.methods.getSpecsById(ownedDevicesIds[i]).call();
      let totalSupply = await devicesInstance.methods.totalSupply(ownedDevicesIds[i]).call();
      let maxSupply = await devicesInstance.methods.maxSupply(ownedDevicesIds[i]).call();
      let balance = await devicesInstance.methods
        .balanceOf(walletAddress, ownedDevicesIds[i])
        .call();
      device.id = ownedDevicesIds[i];
      device.totalSupply = totalSupply;
      device.maxSupply = maxSupply;
      device.model = deviceInfo.model;
      device.color = deviceInfo.color;
      device.price = deviceInfo.price;
      device.others = deviceInfo.others;
      device.balance = balance;
      ownedDevices.push(device);
    }
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
  dispatch(setLoading(true));
  const devicesInstance = state.devicesInstance;
  try {
    let currentTokenId = await devicesInstance.methods.getCurrentTokenId().call();
    let allDevices = [];
    for (let i = 1; i < currentTokenId; i++) {
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
      allDevices.push(device);
    }
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

export const buyTokenPhone = (amount) => async (dispatch, getState) => {
  let state = getState();
  const { web3, walletAddress } = state;
  const preSaleInstance = state.preSaleInstance;
  const weiValue = web3.utils.toWei(amount.toString(), 'ether');
  dispatch(setLoading(true));
  try {
    await preSaleInstance.methods.buyTokenPhone().send({ from: walletAddress, value: weiValue });
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
    console.error(e);
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
