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
    factoryAddress: '0xe81790EF8f83C7eFf25d128F95d6E2B996338a1a',
    saleAddress: '0x8C8CdbBfec86A1b023c4fDCE880866F68F8955aC',
    iPhoneTokenAddress: '0x749F733bf080b03Eb4475eD5534B1d1EDf504803',
    storeAddress: '0xE3C5aF10922bA0462A1c6dEd363DdaBcAFcC18f0',
    devicesAddress: '0x4C9FD1f58A8827f423E1A06cA36519864461272D',
  },
};

export const getContractAddress = (_chainId) => {
  return contractAddress[_chainId];
};
