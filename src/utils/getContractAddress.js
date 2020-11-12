const contractAddress = {
  // Mainnet
  1: {
    saleAddress: '',
    phoneTokenAddress: '0xb25E362cc62BCB50566736Cb4e41A01434a9021d',
  },
  // Ropsten network
  3: {
    factoryAddress: '0x0944817b3C8fCcDbD85352bB34B416e723CDdC96',
    saleAddress: '0xBA7640d6C2e30Cc2AF993e32FA9Bc93cDF42E8A1',
    iPhoneTokenAddress: '0x72ae532ef71DECaC97D1cebd4948b16fCE725581',
    storeAddress: '0xE69Da532bcE239349117acB87B50E1eFfa7Fd744',
    devicesAddress: '0x8dE0A70E6f0Dc187A5dA3796bE87D022038F3D1D',
    phoneTokenAddress: '0xb6493327D607b14028747aa195A7EEEFE98F2B4C',
  },
  // Rinkeby network
  4: {
    factoryAddress: '0x0765f1C23C5b15d67Dd6499fbEeeBC2aD00480de',
    saleAddress: '0xde2EAEfA0630B7bC5dcA1b3B06527aeFb41586a4',
    iPhoneTokenAddress: '0x8A1CDE948C940e8Ab8127Af1a7b2638FE5EB5bC4',
    storeAddress: '0xbF157D8693fcfEFeA3918Aa5C5f224DF017ec7ec',
    devicesAddress: '0x968Bdb84D85ad852E15f1eC6deEfde50940fDf43',
    phoneTokenAddress: '0xEA68aB261B92584458023f2C1aF87154a38F9A3F',
  },
};

export const getContractAddress = (_chainId) => {
  return contractAddress[_chainId];
};
