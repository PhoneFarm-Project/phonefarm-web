import dai from 'assets/icons/dai.png';
import eth from 'assets/icons/eth.png';
import link from 'assets/icons/link.png';
import usdt from 'assets/icons/tether.png';
import uni from 'assets/icons/uni.png';
import usdc from 'assets/icons/usdc.png';

const tokenInfo = {
  1: [
    { symbol: 'ETH', address: '0', decimals: 18, icon: eth },
    {
      symbol: 'DAI',
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 18,
      icon: dai,
    },
    {
      symbol: 'LINK',
      address: '0x514910771af9ca656af840dff83e8264ecf986ca',
      decimals: 18,
      icon: link,
    },
    {
      symbol: 'UNI',
      address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      decimals: 18,
      icon: uni,
    },
    {
      symbol: 'USDC',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      decimals: 6,
      icon: usdc,
    },
    {
      symbol: 'USDT',
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      decimals: 6,
      icon: usdt,
    },
  ],
  3: [
    { symbol: 'ETH', address: '0', decimals: 18, icon: eth },
    {
      symbol: 'DAI',
      address: '0xaD6D458402F60fD3Bd25163575031ACDce07538D',
      decimals: 18,
      icon: dai,
    },
    {
      symbol: 'LINK',
      address: '0xb4f7332ed719Eb4839f091EDDB2A3bA309739521',
      decimals: 18,
      icon: link,
    },
    {
      symbol: 'USDT',
      address: '0xbd44a489532517d9f864fab59abf02488913ca41',
      decimals: 6,
      icon: usdt,
    },
  ],
  4: [
    { symbol: 'ETH', address: '0', decimals: 18, icon: eth },
    {
      symbol: 'DAI',
      address: '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735',
      decimals: 18,
      icon: dai,
    },
    // {
    //   symbol: 'LINK',
    //   address: '0x01be23585060835e02b77ef475b0cc51aa1e0709',
    //   decimals: 18,
    //   icon: link,
    // },
    {
      symbol: 'USDT',
      address: '0xd92e713d051c37ebb2561803a3b5fbabc4962431',
      decimals: 6,
      icon: usdt,
    },
  ],
};

export const getTokensPresale = (_chainId) => {
  return tokenInfo[_chainId];
};

export const getSymbol = (_chainId, _address) => {
  let symbolToken = '';
  let listToken = tokenInfo[_chainId] ? tokenInfo[_chainId] : [];
  listToken.forEach((token) => {
    if (token.address === _address) {
      symbolToken = token.symbol;
    }
  });
  return symbolToken;
};

export const getDecimals = (_chainId, _address) => {
  let decimalsToken = '';
  let listToken = tokenInfo[_chainId] ? tokenInfo[_chainId] : [];
  listToken.forEach((token) => {
    if (token.address === _address) {
      decimalsToken = token.decimals;
    }
  });
  return decimalsToken;
};
