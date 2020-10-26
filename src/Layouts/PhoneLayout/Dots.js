import React from 'react';

const Dots = () => {
  let dots = [];
  for (let i = 0; i < 25; i++) {
    dots.push(<span className='dot' key={i}></span>);
  }
  return <div className='dots'>{dots}</div>;
};

export default Dots;
