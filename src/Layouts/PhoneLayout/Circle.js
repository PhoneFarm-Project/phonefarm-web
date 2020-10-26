import React from 'react';

const Circle = (props) => {
  let classes = ['circle'];
  classes.push(`bg-${props.type || 'primary'}`);
  if (props.blur) {
    classes.push('blurred');
  }
  let styles = {
    top: props.top || '50%',
    left: props.left || '50%',
    width: props.size || '130px',
    height: props.size || '130px',
  };
  return <div className={classes.join(' ')} style={styles}></div>;
};

export default Circle;
