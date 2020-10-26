import React, { useState, useEffect } from 'react';

import lockIcon from 'assets/icons/iphone-lock-icon.jpg';

import './style.scss';

export default function Lock() {
  const [hours, setHours] = useState(('0' + new Date().getHours()).slice(-2));
  const [minutes, setMinutes] = useState(('0' + new Date().getMinutes()).slice(-2));

  useEffect(() => {
    let interval = setInterval(() => {
      let t = new Date();
      setHours(('0' + t.getHours()).slice(-2));
      setMinutes(('0' + t.getMinutes()).slice(-2));
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className='lock_screen screen_size'>
      <div className='fog screen_size' />
      <div className='lock_area'>
        <img src={lockIcon} className='icon' alt='lock icon' />
        <p className='clock_font ip_font'>{`${hours} : ${minutes}`}</p>
      </div>
    </div>
  );
}
