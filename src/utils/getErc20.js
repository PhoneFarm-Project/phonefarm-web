const tokenInfo = {
  '0x687E7b9e61103F120e3f4eB6a61d6460ccC62042': {
    symbol: 'Phone',
  },
  '0xaD6D458402F60fD3Bd25163575031ACDce07538D': {
    symbol: 'Dai',
  },
  '0xb4f7332ed719Eb4839f091EDDB2A3bA309739521': {
    symbol: 'Link',
  },
};

export const getSymbol = (_address) => {
  return tokenInfo[_address].symbol;
};
