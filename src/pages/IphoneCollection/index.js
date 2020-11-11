import React, { useEffect, useState, useRef, Fragment } from 'react';
import OwnedDevice from 'components/OwnedDevice';
import ButtonBack from 'components/ButtonBack';
import { useSelector, useDispatch } from 'react-redux';
import { setOwnedDevices } from 'store/actions';
import { Spin, Empty, Carousel } from 'antd';
import { LoadingOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

import './style.scss';

export default function IphoneCollection() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  let layoutStorage = JSON.parse(localStorage.getItem('device'));
  let [currentLayout, setCurrentLayout] = useState(layoutStorage);
  const [doubleDevices, setDoubleDevices] = useState([]);
  const ownedDevices = useSelector((state) => state.ownedDevices);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const slider = useRef(null);

  const formatDevices = (devices) => {
    var a = [];
    for (var j = 0; j < devices.length / 2; j++) {
      let c = [];
      c.push(devices[2 * j]);
      if (!!devices[2 * j + 1]) {
        c.push(devices[2 * j + 1]);
      }
      a.push(c);
    }
    return a;
  };

  useEffect(() => {
    dispatch(setOwnedDevices());
  }, [dispatch, ownedDevices.length]);

  useEffect(() => {
    if (ownedDevices.length !== 0) setDoubleDevices(formatDevices(ownedDevices));
  }, [ownedDevices]);

  const preview = (phone) => {
    let model = phone.model;
    let color = phone.color.replace(/-/g, '');
    localStorage.setItem('device', JSON.stringify({ brand: 'iphone', model, color }));
    window.parent.postMessage('ChangeLayout');
    setCurrentLayout({ brand: 'iphone', model, color });
  };

  return (
    <div className='styleStake flex_justify_content'>
      <div className='phone_header flex_between'>
        <div className='w32px'>
          <ButtonBack url='/home?preset=moveToRightFromLeft' />
        </div>
        <p>Your iPhone Collection</p>
        <div className='w32px' />
      </div>
      <div className='phone_body collection_body'>
        <Spin indicator={antIcon} spinning={loading} className='spin-center-screen'>
          {!loading && doubleDevices.length <= 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description='No device'
              className='stye-empty-box'
            />
          ) : null}
          <Fragment>
            <LeftOutlined className='icon_lr icon_left' onClick={() => slider.current.prev()} />
            <Carousel ref={slider} effect='scrollx'>
              {doubleDevices.map((iPhone, index) => {
                return (
                  <div key={index}>
                    <OwnedDevice
                      iPhone={iPhone[0]}
                      preview={preview}
                      currentLayout={currentLayout}
                    />
                    {!!iPhone[1] ? (
                      <OwnedDevice
                        iPhone={iPhone[1]}
                        preview={preview}
                        currentLayout={currentLayout}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </Carousel>
            <RightOutlined className='icon_lr icon_right' onClick={() => slider.current.next()} />
          </Fragment>
        </Spin>
      </div>
    </div>
  );
}
