import { getSymbol } from 'utils/getErc20';
export async function getAPY(chainId, pools, poolSelected, tokenLocked) {
  if (pools.length === 0 || tokenLocked.length === 0) {
    return 0;
  }
  let symbol = getSymbol(chainId, pools[poolSelected].lpToken);
  symbol = symbol.toUpperCase();
  let tokenPrice;
  if (symbol === 'PHONE') {
    let res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT');
    let obj = await res.json();
    tokenPrice = parseInt(obj.price) / 1e3;
  } else {
    let res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=' + symbol + 'USDT');
    let obj = await res.json();
    tokenPrice = obj.price;
  }

  let blockTime = 14; // In Sec
  let iPhonePrice = 0.5; // in USD
  let iPhonePerBlock = 100;
  let totalSecInYear = 31556952; //in Sec
  let valueLocked = tokenPrice * tokenLocked[poolSelected];

  let totalAllocPoint = pools.reduce(
    (allocPoint, item) => allocPoint + parseInt(item.allocPoint),
    0
  );

  let valueIPhoneEarn =
    (iPhonePrice * (totalSecInYear / blockTime) * iPhonePerBlock * pools[poolSelected].allocPoint) /
    totalAllocPoint;
  let apy = valueIPhoneEarn / valueLocked;
  if (!isFinite(apy)) {
    apy = 'Pending';
  }
  return apy;
}
