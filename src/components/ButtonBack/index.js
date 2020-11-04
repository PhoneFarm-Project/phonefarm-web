import React from 'react';
import { Link } from 'react-router-dom';
import BackIcon from 'assets/icons/backicon.png';
import './style.scss';

export default function ButtonBack({ url, text }) {
  const changeDefaultBackground = () => {
    window.parent.postMessage('home');
  };
  return (
    <div className='box-btn-back'>
      <Link to={url} className='link-btn-back' onClick={() => changeDefaultBackground()}>
        <button className='btn-back'>
          <img className='iconLeftOutlined' src={BackIcon} alt='back icon' />
          <span className='text-btn-back'>{text}</span>
        </button>
      </Link>
    </div>
  );
}
