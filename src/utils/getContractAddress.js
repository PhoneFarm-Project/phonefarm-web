const contractAddress = {
  // Mainnet
  1: {},
  // Ropsten network
  3: {
    factoryAddress: '0x4D367690bc883313756Ada1118b76415B835a037',
    saleAddress: '0x48AcEFa2A3e130BeeE6ccb37EEA6D0CdE0B524D2',
    iPhoneTokenAddress: '0xE89dee66E86C9e35a88dcdbe7995411430b3DE1a',
    storeAddress: '0x24A2A1b296Aac21C5Db37627B7F97861B277503C',
    devicesAddress: '0x01C3A8eccE85202005132bb24A9613dB9E7d5C45',
  },
  // Rinkeby network
  4: {
    factoryAddress: '0xb2BEfE869614D03C850039dE8d19dDfce62D0253',
    saleAddress: '0xEF37C86C93dD73c2e574276432D471027C8DDE95',
    iPhoneTokenAddress: '0x4152B58Cf953698424d12bB239835a370055D3bB',
    storeAddress: '0x710802C0da451Ad5e6fA16894eA0494d245Bb6b8',
    devicesAddress: '0xd553a95F30E801c760A878F4d92c8304df5b01Aa',
  },
};

export const getContractAddress = (_chainId) => {
  return contractAddress[_chainId];
};
