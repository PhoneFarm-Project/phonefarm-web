import React from 'react';
import { Button, Row, Col } from 'antd';
import getIphoneLayout from 'utils/getIphoneLayout';
import './style.scss';
import { parseBalance } from 'utils/helper';
import IphoneIcon from 'assets/icons/Iphone-token-128.png';

export default function OwnedDevice({ iPhone, loading, preview, currentLayout }) {
  return (
    <Row className='boxStake mgb_15'>
      <Col span={8}>
        <img
          className='ip_product_image'
          src={getIphoneLayout(iPhone.model, iPhone.color).img}
          alt='icon'
        />
      </Col>
      <Col className='center' span={16}>
        <p className='ip_font price_font'>
          <strong>{parseBalance(iPhone.price, 18)}</strong>{' '}
          <img src={IphoneIcon} alt='token icon' />
        </p>
        <p className='ip_font product_name_font'>
          {iPhone.model} {iPhone.color}
        </p>
        <p className='ip_font'>{iPhone.balance} Item</p>
        {currentLayout.model === iPhone.model && currentLayout.color === iPhone.color ? (
          <Button className='product_bt ip_font btn-using'>Using</Button>
        ) : (
          <Button className='product_bt ip_font' loading={loading} onClick={() => preview(iPhone)}>
            Apply
          </Button>
        )}
      </Col>
    </Row>
  );
}
