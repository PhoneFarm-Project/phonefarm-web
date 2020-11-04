import React, { useEffect, useState } from 'react';
import OwnedDevice from 'components/OwnedDevice';
import ButtonBack from 'components/ButtonBack';
import { useSelector, useDispatch } from 'react-redux';
import { setOwnedDevices } from 'store/actions';
import { Spin, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function IphoneCollection() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  let layoutStorage = JSON.parse(localStorage.getItem('device'));
  let [currentLayout, setCurrentLayout] = useState(layoutStorage);
  const ownedDevices = useSelector((state) => state.ownedDevices);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOwnedDevices());
  }, [dispatch, ownedDevices.length]);

  const preview = (phone) => {
    let model = phone.model;
    let color = phone.color.replace(/-/g, '');
    localStorage.setItem('device', JSON.stringify({ brand: 'iphone', model, color }));
    window.parent.postMessage('ChangeLayout');
    setCurrentLayout({ brand: 'iphone', model, color });
  };
  return (
    <div className='styleStake scroll_able'>
      <div className='phone_header flex_between'>
        <ButtonBack url='/home?preset=moveToRightFromLeft' text='Home' />
      </div>
      <div className='phone_body'>
        <Spin indicator={antIcon} spinning={loading} className='spin-center-screen'>
          <p className='ip_font head_font'>Your iPhone Collection</p>
          {!loading && ownedDevices.length <= 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description='No device'
              className='stye-empty-box'
            />
          ) : null}

          {ownedDevices.map((iPhone, index) => {
            return (
              <OwnedDevice
                iPhone={iPhone}
                preview={preview}
                key={index}
                currentLayout={currentLayout}
              />
            );
          })}
        </Spin>
      </div>
    </div>
  );
}
