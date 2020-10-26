import React from 'react';

import './index.scss';

export default function TokenBox({ image, symbol, amout }) {
  return (
    <div className='token_box'>
      <img src={image} alt='token icon' />
      <p className='amout'>{amout}</p>
      <p className='symbol'>{symbol}</p>
    </div>
  );
}
