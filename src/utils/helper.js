export function parseBalance(balanceWei) {
  if (!balanceWei) {
    return 0;
  }
  let afterDecimal;
  const weiString = balanceWei.toString();
  const trailingZeros = /0+$/u;

  const beforeDecimal = weiString.length > 18 ? weiString.slice(0, weiString.length - 18) : '0';
  afterDecimal = `000000000000000000${balanceWei}`.slice(-18).replace(trailingZeros, '');
  if (afterDecimal === '') {
    afterDecimal = '0';
  } else if (afterDecimal.length > 3) {
    afterDecimal = afterDecimal.slice(0, 3);
  }
  return parseFloat(`${beforeDecimal}.${afterDecimal}`);
}
