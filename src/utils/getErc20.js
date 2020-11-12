const tokenInfo = {
  // Mainnet
  1: {
    '0xb25e362cc62bcb50566736cb4e41a01434a9021d': {
      symbol: 'PHONE',
    },
    '0x6b175474e89094c44da98b954eedeac495271d0f': {
      symbol: 'DAI',
    },
    '0x514910771af9ca656af840dff83e8264ecf986ca': {
      symbol: 'LINK',
    },
  },
  // Ropsten network
  3: {
    '0xb6493327D607b14028747aa195A7EEEFE98F2B4C': {
      symbol: 'PHONE',
    },
    '0xaD6D458402F60fD3Bd25163575031ACDce07538D': {
      symbol: 'DAI',
    },
    '0xb4f7332ed719Eb4839f091EDDB2A3bA309739521': {
      symbol: 'LINK',
    },
  },
  4: {
    '0xEA68aB261B92584458023f2C1aF87154a38F9A3F': {
      symbol: 'PHONE',
    },
    '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735': {
      symbol: 'DAI',
    },
    '0x01be23585060835e02b77ef475b0cc51aa1e0709': {
      symbol: 'LINK',
    },
  },
};

export const getSymbol = (_chainId, _address) => {
  return tokenInfo[_chainId][_address].symbol;
};
