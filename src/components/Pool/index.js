import React from 'react';
import TokenBox from 'components/TokenBox';

import PhoneIcon from 'assets/icons/phoneFarm-logo-128.png';
import IphoneIcon from 'assets/icons/Iphone-token-128.png';
import DaiIcon from 'assets/icons/dai-icon.png';

export default function Pool({ token, phoneStake, pendingIPhone }) {
  return (
    <div className='deposited-and-iphone'>
      <div className='row'>
        <div className='col-6'>
          <TokenBox
            image={token === 'DAI' ? DaiIcon : PhoneIcon}
            symbol={token}
            amout={phoneStake}
          />
        </div>
        <div className='col-6'>
          <TokenBox image={IphoneIcon} symbol='IPHONE' amout={pendingIPhone} />
        </div>
      </div>
    </div>
  );
}
