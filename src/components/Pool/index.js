import React from 'react';

export default function Pool({ token, phoneStake, pendingIPhone }) {
  return (
    <div className='deposited-and-iphone'>
      <div className='row'>
        <div className='col-6'>
          <h4>
            {phoneStake + ' '} {token}
          </h4>
        </div>
        <div className='col-6'>
          <h4>{pendingIPhone} IPH</h4>
        </div>
      </div>
    </div>
  );
}
