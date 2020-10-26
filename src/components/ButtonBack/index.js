import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import './style.scss';

export default function ButtonBack(props) {
  return (
    <div className='box-btn-back'>
      <Link to={props.url} className='link-btn-back'>
        <Button type='text' className='btn-back'>
          <LeftOutlined className='iconLeftOutlined' />
          <span className='text-btn-back'>Home</span>
        </Button>
      </Link>
    </div>
  );
}
