import React, { useEffect, useState } from 'react';
import IphoneProduct from 'components/IphoneProduct';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAllDevices,
  approveIPhone,
  setIPhoneAllowance,
  setIPhoneBal,
  buyDevice,
} from 'store/actions';
import { Spin, Select, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ButtonBack from 'components/ButtonBack';
import getIphoneLayout from 'utils/getIphoneLayout';

const { Option } = Select;

export default function BuyIphone() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const allDevices = useSelector((state) => state.allDevices);
  const iPhoneAllowance = useSelector((state) => state.iPhoneAllowance);
  const iPhoneBal = useSelector((state) => state.iPhoneBal);
  const loading = useSelector((state) => state.loading);
  const [currentPhone, setCurrentPhone] = useState(null);
  const [modelSelling, setModelSelling] = useState([]);
  const [listColorModel, setListColorModel] = useState([]);
  const dispatch = useDispatch();
  let isApproved = iPhoneAllowance > 0;

  useEffect(() => {
    dispatch(setAllDevices());
    dispatch(setIPhoneAllowance());
    dispatch(setIPhoneBal());
  }, [dispatch]);

  useEffect(() => {
    if (allDevices.length > 0) {
      setCurrentPhone(allDevices[allDevices.length - 1]);
      let arryModel = [];
      allDevices.forEach((phone) => {
        if (!arryModel.includes(phone.model)) {
          arryModel.push(phone.model);
        }
      });
      setModelSelling(arryModel);
    } else {
      setCurrentPhone(null);
    }
  }, [allDevices]);

  /* eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (currentPhone && listColorModel.length <= 0) {
      updateCurrent(currentPhone.model);
    }
  }, [currentPhone]);

  const handleApproveIPhone = (id) => {
    dispatch(approveIPhone());
  };

  const handleBuyDevice = (id, price) => {
    if (parseInt(iPhoneBal) < parseInt(price)) {
      alert('insufficient IPH token');
    } else {
      dispatch(buyDevice(id));
    }
  };

  const updateCurrent = (value) => {
    let listColor = [];
    let arrDevices = allDevices.filter((phone) => phone.model === value);
    arrDevices.forEach((device) => {
      if (!listColor.includes(device.color)) {
        listColor.push({
          color: device.color,
          code: getIphoneLayout(value, device.color).codeColor,
        });
      }
    });
    setCurrentPhone(arrDevices[0]);
    setListColorModel(listColor);
  };

  const filterOption = (input, option) => {
    return option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const changeCurrentPhone = (model, color) => {
    let modelsDevice = allDevices.filter((phone) => phone.model === model);
    modelsDevice.forEach((device, index) => {
      if (device.model === model && device.color === color) {
        setCurrentPhone(modelsDevice[index]);
      }
    });
  };

  return (
    <div className='styleStake scroll_able'>
      <ButtonBack url='/home?preset=moveToRightFromLeft' text='Home' />
      <Spin
        indicator={antIcon}
        spinning={loading && currentPhone === null}
        className='spin-center-screen'
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder='Select type iPhone'
          optionFilterProp='children'
          onChange={updateCurrent}
          filterOption={filterOption}
          value={`iPhone ${currentPhone != null ? currentPhone.model : ''}`}
        >
          {modelSelling.map((model, index) => {
            return (
              <Option value={model} key={index}>
                iPhone {model}
              </Option>
            );
          })}
        </Select>
        {!loading && allDevices.length <= 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='No device'
            className='stye-empty-box'
          />
        ) : null}
        {currentPhone && currentPhone.id > 0 ? (
          <IphoneProduct
            listColorModel={listColorModel}
            iPhone={currentPhone}
            hiddenBtn={!isApproved}
            buyDevice={() => handleBuyDevice(currentPhone.id, currentPhone.price)}
            approveIPhone={() => handleApproveIPhone(currentPhone.id)}
            changeCurrentPhone={(model, color) => changeCurrentPhone(model, color)}
            isApproved={isApproved}
            loading={loading}
          />
        ) : (
          ''
        )}
      </Spin>
    </div>
  );
}
