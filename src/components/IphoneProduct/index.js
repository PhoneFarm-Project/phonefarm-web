import React from 'react';
import getIphoneLayout from 'utils/getIphoneLayout';
import { Col, Row } from 'reactstrap';
import TokenIphone from 'assets/icons/Iphone-token-128.png';
import './style.scss';

export default function IphoneProduct({ iPhone, listColorModel, changeCurrentPhone }) {
  return (
    <div className='product-style'>
      <div span={8}>
        <img
          className='ip_product_image'
          src={getIphoneLayout(iPhone.model, iPhone.color).img}
          alt='icon'
        />
      </div>
      <div className='center ip_font'>
        <p className='quantity'>
          MINTED: {iPhone.totalSupply} | <b>{iPhone.maxSupply - iPhone.totalSupply} LEFT</b>
        </p>
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
        <p className='price_font'>
          Price: {iPhone.price / 10 ** 18}
          <img className='tokenIcon' src={TokenIphone} alt='iphone token icon' /> IPHONE
        </p>
      </div>
    </div>
  );
}
