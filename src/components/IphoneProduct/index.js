import React from 'react';
import { Button } from 'antd';
import getIphoneLayout from 'utils/getIphoneLayout';
import './style.scss';
import { Col, Row } from 'reactstrap';

export default function IphoneProduct({
  iPhone,
  hiddenBtn,
  buyDevice,
  approveIPhone,
  loading,
  isApproved,
  listColorModel,
  changeCurrentPhone,
}) {
  return (
    <div className='boxStake product-style'>
      <div span={8}>
        <img
          className='ip_product_image'
          src={getIphoneLayout(iPhone.model, iPhone.color).img}
          alt='icon'
        />
      </div>
      <div className='center'>
        {/* <p className='ip_font product_name_font'>
          iPhone {iPhone.model} {iPhone.color}
        </p> */}
        <Row className='box-color'>
          {listColorModel.map((color, index) => {
            return (
              <Col key={index}>
                <button
                  className={`colornav-link ${color.color === iPhone.color ? 'current' : ''}`}
                  onClick={() => changeCurrentPhone(iPhone.model, color.color)}
                >
                  <figure className='colornav-swatch' style={{ backgroundColor: `${color.code}` }}>
                    <figcaption className='colornav-label'>
                      {color.color === iPhone.color ? color.color : ''}
                    </figcaption>
                  </figure>
                </button>
              </Col>
            );
          })}
        </Row>
        <p className='ip_font price_font'>Price: {iPhone.price / 10 ** 18} IPH</p>
        {isApproved ? (
          <Button
            className='product_bt ip_font'
            onClick={() => buyDevice()}
            disabled={hiddenBtn}
            loading={loading}
          >
            Buy
          </Button>
        ) : (
          <Button className='product_bt ip_font' onClick={() => approveIPhone()} loading={loading}>
            Approve IPH
          </Button>
        )}
      </div>
    </div>
  );
}
