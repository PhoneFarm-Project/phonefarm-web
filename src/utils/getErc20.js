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
    '0x687E7b9e61103F120e3f4eB6a61d6460ccC62042': {
      symbol: 'PHONE',
    },
    '0xaD6D458402F60fD3Bd25163575031ACDce07538D': {
      symbol: 'DAI',
    },
    '0xb4f7332ed719Eb4839f091EDDB2A3bA309739521': {
      symbol: 'LINK',
    },
  },
};

export const getSymbol = (_chainId, _address) => {
  return tokenInfo[_chainId][_address].symbol;
};
