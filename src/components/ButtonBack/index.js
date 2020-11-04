import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import './style.scss';

export default function ButtonBack({ url, text, color }) {
  return (
    <div className='box-btn-back'>
      <Link to={url} className='link-btn-back'>
        <Button type='text' className='btn-back'>
          <LeftOutlined className='iconLeftOutlined' style={color} />
          <span className='text-btn-back'>{text}</span>
        </Button>
      </Link>
    </div>
  );
}
