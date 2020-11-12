const tokenInfo = {
  // Mainnet
  1: {
    '0xb25E362cc62BCB50566736Cb4e41A01434a9021d': {
      symbol: 'PHONE',
    },
    '0x6B175474E89094C44Da98b954EedeAC495271d0F': {
      symbol: 'DAI',
    },
    '0x514910771af9ca656af840dff83e8264ecf986ca': {
      symbol: 'LINK',
    },
    '0xdac17f958d2ee523a2206206994597c13d831ec7': {
      symbol: 'USDT',
    },
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': {
      symbol: 'USDC',
    },
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984': {
      symbol: 'UNI',
    },
  },
  // Ropsten network
  3: {
    '0xC1186e2fAAF10D19A264aB16850B724AB99B7561': {
      symbol: 'PHONE',
    },
    '0xaD6D458402F60fD3Bd25163575031ACDce07538D': {
      symbol: 'DAI',
    },
    '0xb4f7332ed719Eb4839f091EDDB2A3bA309739521': {
      symbol: 'LINK',
    },
    '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': {
      symbol: 'UNI',
    },
  },
  4: {
    '0x256C92B35967630bdF1f026914a4C75c8Fe2D5Ac': {
      symbol: 'PHONE',
    },
    '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735': {
      symbol: 'DAI',
    },
    '0x01be23585060835e02b77ef475b0cc51aa1e0709': {
      symbol: 'LINK',
    },
    '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': {
      symbol: 'UNI',
    },
  },
};

export const getSymbol = (_chainId, _address) => {
  return tokenInfo[_chainId][_address].symbol;
};
