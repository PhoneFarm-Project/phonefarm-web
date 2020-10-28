const contractAddress = {
  // Mainnet
  1: {},
  // Ropsten network
  3: {
    factoryAddress: '0x4D367690bc883313756Ada1118b76415B835a037',
    preSaleAddress: '0x48AcEFa2A3e130BeeE6ccb37EEA6D0CdE0B524D2',
    iPhoneTokenAddress: '0xE89dee66E86C9e35a88dcdbe7995411430b3DE1a',
    storeAddress: '0x24A2A1b296Aac21C5Db37627B7F97861B277503C',
    devicesAddress: '0x01C3A8eccE85202005132bb24A9613dB9E7d5C45',
  },
};

export const getContractAddress = (_chainId, _contract) => {
  return contractAddress[_chainId];
};
