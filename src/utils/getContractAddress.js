const contractAddress = {
  // Mainnet
  1: {
    saleAddress: '',
    phoneTokenAddress: '0xb25E362cc62BCB50566736Cb4e41A01434a9021d',
  },
  // Ropsten network
  3: {
    factoryAddress: '',
    saleAddress: '',
    iPhoneTokenAddress: '',
    storeAddress: '',
    devicesAddress: '',
    phoneTokenAddress: '',
  },
  // Rinkeby network
  4: {
    factoryAddress: '0xe81790EF8f83C7eFf25d128F95d6E2B996338a1a',
    saleAddress: '0xdf6e4Ac5C90548E4833ad9F510Ef9D994f3D075C',
    iPhoneTokenAddress: '0x749F733bf080b03Eb4475eD5534B1d1EDf504803',
    storeAddress: '0xE3C5aF10922bA0462A1c6dEd363DdaBcAFcC18f0',
    devicesAddress: '0x4C9FD1f58A8827f423E1A06cA36519864461272D',
    phoneTokenAddress: '0x083B1547BEa0844e8347132219d6bEce496F87a1',
  },
};

export const getContractAddress = (_chainId) => {
  return contractAddress[_chainId];
};
