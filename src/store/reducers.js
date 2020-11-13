import * as actions from './actions';

const initialState = {
  web3: null,
  chainId: null,
  walletAddress: null,
  shortAddress: null,
  balance: 0,
  factoryInstance: null,
  saleInstance: null,
  storeInstance: null,
  devicesInstance: null,
  tokenBal: [],
  listTokenStake: [],
  pendingIPhone: [],
  iPhoneBal: 0,
  tokenAllowance: [],
  loading: false,
  loadingStake: [],
  loadingWithdraw: [],
  iPhoneAllowance: 0,
  ownedDevices: [],
  allDevices: [],
  poolLength: 0,
  pools: [],
  tokenLocked: [],
  phoneBalance: 0,
  addressPhoneToken: null,
  rate: 1,
  tokensPresale: [],
  erc20Allowances: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_WEB3:
      return {
        ...state,
        web3: action.web3,
      };
    case actions.SET_CHAINID:
      return {
        ...state,
        chainId: action.chainId,
      };
    case actions.SET_ADDRESS:
      return {
        ...state,
        walletAddress: action.walletAddress,
        shortAddress: action.shortAddress,
      };
    case actions.SET_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };
    case actions.SET_FACTORY:
      return {
        ...state,
        factoryInstance: action.factoryInstance,
      };
    case actions.SET_SALE:
      return {
        ...state,
        saleInstance: action.saleInstance,
      };
    case actions.SET_STORE:
      return {
        ...state,
        storeInstance: action.storeInstance,
      };
    case actions.SET_DEVICES:
      return {
        ...state,
        devicesInstance: action.devicesInstance,
      };
    case actions.SET_TOKEN_BAL:
      return {
        ...state,
        tokenBal: action.tokenBal,
      };
    case actions.SET_TOKEN_STAKE:
      return {
        ...state,
        listTokenStake: action.listTokenStake,
      };
    case actions.SET_PENDING_IPHONE:
      return {
        ...state,
        pendingIPhone: action.pendingIPhone,
      };
    case actions.SET_IPHONE_BAL:
      return {
        ...state,
        iPhoneBal: action.iPhoneBal,
      };
    case actions.SET_TOKEN_ALLOWANCE:
      return {
        ...state,
        tokenAllowance: action.tokenAllowance,
      };
    case actions.SET_LOADING_APPROVE:
      return {
        ...state,
        loading: action.loading,
      };
    case actions.SET_STAKE_APPROVE:
      return {
        ...state,
        loadingStake: action.loadingStake,
      };
    case actions.SET_LOADING_WITHDRAW:
      return {
        ...state,
        loadingWithdraw: action.loadingWithdraw,
      };
    case actions.SET_IPHONE_ALLOWANCE:
      return {
        ...state,
        iPhoneAllowance: action.iPhoneAllowance,
      };
    case actions.SET_OWNED_DEVICES:
      return {
        ...state,
        ownedDevices: action.ownedDevices,
      };
    case actions.SET_ALL_DEVICES:
      return {
        ...state,
        allDevices: action.allDevices,
      };
    case actions.SET_POOL_LENTH:
      return {
        ...state,
        poolLength: action.poolLength,
      };
    case actions.SET_POOL_INFO:
      return {
        ...state,
        pools: action.pools,
      };
    case actions.SET_TOKEN_LOCKED:
      return {
        ...state,
        tokenLocked: action.tokenLocked,
      };
    case actions.SET_ADDRESS_PHONE_TOKEN:
      return {
        ...state,
        addressPhoneToken: action.addressPhoneToken,
      };
    case actions.SET_PHONE_BALANCE:
      return {
        ...state,
        phoneBalance: action.phoneBalance,
      };
    case actions.SET_TOKENS_PRESALE:
      return {
        ...state,
        tokensPresale: action.tokensPresale,
      };
    case actions.SET_ALLOWANCE_ERC20:
      return {
        ...state,
        erc20Allowances: action.erc20Allowances,
      };
    case actions.SET_RATE:
      return {
        ...state,
        rate: action.rate,
      };
    default:
      return state;
  }
};
export default rootReducer;
