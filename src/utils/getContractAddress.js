const contractAddress = {
  // Mainnet
  1: {
    factoryAddress: '0x9a73910F2318fb4A77f48c3cB99eae51F0f3209a',
    saleAddress: '0x763995F6C680FBac2870524CbE17c235F2049418',
    iPhoneTokenAddress: '0x77fde3242eaA67E7ee21bEf8247d9909dbA06ee4',
    storeAddress: '0xD506A7d0E3d259E1A20c2A6299Bb24e0dF8622f3',
    devicesAddress: '0x16Cb6125928D7908c620d732e16b0D1ab4C5Ab96',
    phoneTokenAddress: '0xb25E362cc62BCB50566736Cb4e41A01434a9021d',
  },
  // Ropsten network
  3: {
    factoryAddress: '0xfa194fdf554B4d8FabFDD1408697fE9BD461dbc6',
    saleAddress: '0xCa83F16D41dDdE8a0bFF84be42fbdfFcF1eDF4aA',
    iPhoneTokenAddress: '0xdEf86B35655D1FCA6c0701Ec410faE1a10CE3548',
    storeAddress: '0x16b8DE47f40497ad16FDd615633a717A7C5e9326',
    devicesAddress: '0x3332717b59136F9dDD16DE1405fE17a4AA12F2f2',
    phoneTokenAddress: '0xC1186e2fAAF10D19A264aB16850B724AB99B7561',
  },
  // Rinkeby network
  4: {
    factoryAddress: '0xc899eC73d502631824388dB7939d6fc964547Fb2',
    saleAddress: '0x726BaDE2562bea689AF8DC7cEFaF54e6e66A4298',
    iPhoneTokenAddress: '0xF6f6b5D4abcff2D2703C2EcF6cF99827CA916711',
    storeAddress: '0x457d9CC10D4ee468e7F12cfaBBe076C21de809f1',
    devicesAddress: '0x6E8a21C20742809Bf600d578Cc3dd4f1Ec06e3B0',
    phoneTokenAddress: '0x256C92B35967630bdF1f026914a4C75c8Fe2D5Ac',
  },
};

export const getContractAddress = (_chainId) => {
  return contractAddress[_chainId];
};
