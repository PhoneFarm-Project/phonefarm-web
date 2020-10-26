import React from 'react';
import { Button, Row, Col } from 'antd';
import getIphoneLayout from 'utils/getIphoneLayout';
import './style.scss';

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
        <p className='ip_font product_name_font'>{iPhone.name}</p>
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
