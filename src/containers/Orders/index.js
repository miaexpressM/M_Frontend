import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Button, Tabs, Input, Spin, Tag, notification, Progress, DatePicker } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import {
  delOrdersAction,
  getOrdersAction,
  handleAddOrderModalShowAction,
  handleModifyOrderModalShowAction,
  modifyOrdersAction,
  trackOrdersAction,
  onChangeIsLoadingAction,
  onChangeMAWBAction,
  onChangeContainerNumberAction,
  onChangeTrackingNumberAction,
  onChangeShipperAction,
  onChangeShipperPhoneNumberAction,
  onChangeShipperAddressAction,
  onChangeDestinationCountryAction,
  onChangeRecipientAction,
  onChangeRUTAction,
  onChangeRecipientPhoneNumberAction,
  onChangeRecipientEmailAction,
  onChangeRegionAction,
  onChangeProvinceAction,
  onChangeComunaAction,
  onChangeAddressAction,
  onChangeWeightAction,
  onChangeValueAction,
  onChangeDescriptionAction,
  onChangeQuantityAction,
  addOrdersAction,
  addOrderListAction,
  onChangeAddOrderSuccessNumberAction,
  onChangeAddOrderFailNumberAction,
  onChangeAddOrderStatusAction,
  getOrdersByUpdatedAtAction,
  trackOrderListAction,
} from './orders.actions';

import {
  makeSelectMAWB,
  makeSelectContainerNumber,
  makeSelectTrackingNumber,
  makeSelectShipper,
  makeSelectShipperAddress,
  makeSelectShipperPhoneNumber,
  makeSelectDestinationCountry,
  makeSelectRecipient,
  makeSelectRecipientEmail,
  makeSelectRecipientPhoneNumber,
  makeSelectRUT,
  makeSelectRegion,
  makeSelectProvince,
  makeSelectComuna,
  makeSelectAddress,
  makeSelectWeight,
  makeSelectValue,
  makeSelectDescription,
  makeSelectQuantity,
  selectOrdersList,
  selectOrdesIsLoading,
} from './orders.selectors';

import reducer from './orders.reducer';
import saga from './orders.saga';
import { makeSelectUser } from 'global.selectors';
import {
  selectAddOrderState,
  selectTrackOrder,
  selectAddOrderSuccessList,
  selectAddOrderFailList,
} from './orders.selectors';
import AddOrderModal from './AddOrderModal';
import ModifyOrderModal from './ModifyOrderModal';
import OrdersTable from './OrdersTable';
import UploadOrdersTable from './OrdersTable/uploadDataTable';
import UploadStandardTemplateModal from './UploadStandardTemplateModal';
import UploadSimpleTemplateModal from './UploadSimpleTemplateModal';
import { getZonesAction } from 'containers/Zones/zones.actions';
import { selectZonesList } from 'containers/Zones/zones.selectors';
import BarCodeScanner from 'barcode-react-scanner';
import SearchingModal from './SearchingModal';
import { ExportToExcel } from 'utils/exportToExcel';
import dayjs from 'dayjs';

const key = 'orders';

function Orders(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { TabPane } = Tabs;
  const [tabsKey, setTabsKey] = React.useState('1');
  const [destinationAddress, setDestinationAddress] = React.useState('');
  const [orderDescription, setOrderDescription] = React.useState('');
  const [isOrderZoneSelectionByManual, setIsOrderZoneSelectionByManual] = React.useState(undefined);
  const [orderPlaceId, setOrderPlaceId] = React.useState('');
  const [orderLngLat, setOrderLngLat] = React.useState();
  const [modifyingId, setModifyingId] = React.useState(0);
  const [files, setFiles] = React.useState([]);
  const [isSearchVisiable, setIsSearchVisiable] = React.useState(false);
  const [uploadingDataList, setUploadingDataList] = React.useState([]);
  const [zoneResult, setZoneResult] = React.useState();
  const [inputTrackingNumber, setInputTrackingNumber] = React.useState('');
  const [searching, setSearching] = React.useState(false);
  const [uploadedFailed, setUploadedFailed] = React.useState(0);
  const [uploadedSuccessful, setUploadedSuccessful] = React.useState(0);
  const [uploadingPercent, setUploadingPercent] = React.useState(100);
  const [isBarcodeScannerActive, setIsBarcodeScannerActive] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  async function getTrackOrder(trackingNumber) {
    setSearching(true);
    await props.getTrackOrder(trackingNumber);
  }

  const openNotificationWithIcon = type => {
    const key = 'updatedNotification';
    notification.close(key);
    const result = type !== 'success' ? 'Failed' : 'Successful';
    notification[type]({
      message: `Add Order ${result}`,
      key,
    });
  };

  const onOrderDataUpload = async () => {
    if (uploadingDataList.length !== 0) {
      await props.addOrderList({ payload: uploadingDataList });
    }
  };

  const onUploadResult = async () => {
    if (props.addOrderState) {
      await setUploadedSuccessful(uploadedSuccessful + 1);
      await openNotificationWithIcon('success');
    } else if (props.addOrderState === false) {
      await setUploadedFailed(uploadedFailed + 1);
      await openNotificationWithIcon('error');
    }
  };

  useEffect(() => {
    console.log('track', props.trackOrder);
    const record = props.trackOrder;
    if (record) {
      setDestinationAddress(
        `${record.address}, ${record.comuna}, ${record.province}, ${record.region}, ${record.destinationCountry}`,
      );
      setOrderDescription(record.description);
      setIsOrderZoneSelectionByManual(record.isManualZoneSelection);
      setInputTrackingNumber('');
      setOrderPlaceId(record.placeIdInGoogle);
      if (record.location) {
        const locationInfo = JSON.parse(record.location);
        if (locationInfo) {
          if (locationInfo.Location && locationInfo.Location.DisplayPosition) {
            const lnglat = {
              lng: locationInfo.Location.DisplayPosition.Longitude || 0,
              lat: locationInfo.Location.DisplayPosition.Latitude || 0,
            };
            setOrderLngLat(lnglat);
          } else {
            setOrderLngLat();
          }
        } else {
          setOrderLngLat();
        }
      } else {
        setOrderLngLat();
      }

      setZoneResult(record.zone);
    } else {
      setDestinationAddress('');
      setOrderDescription('');
      setOrderPlaceId('');
    }
    setSearching(false);
  }, [props.trackOrder]);

  useEffect(() => {
    onUploadResult(props.addOrderState);
  }, [props.addOrderState]);

  useEffect(() => {
    if (uploadingDataList.length !== 0) {
      setUploadingPercent(
        ((props.addOrderSuccessList.length + props.addOrderFailList.length) / uploadingDataList.length) * 100,
      );
      if (props.addOrderSuccessList.length + props.addOrderFailList.length === uploadingDataList.length) {
        document.getElementById('xlsxSimpleInput').value = '';
        document.getElementById('xlsxStandardInput').value = '';
        if (props.addOrderFailList.length !== 0) {
          onUploadResult(false);
        }
      }
    }
  }, [props.addOrderFailList.length, props.addOrderSuccessList.length, uploadingDataList]);

  useEffect(() => {
    props.onChangeAddOrderFailNumber(0);
    props.onChangeAddOrderSuccessNumber(0);
    props.onChangeAddOrderStatus(undefined);
  }, [uploadingDataList]);

  useEffect(() => {
    setIsLoading(props.isLoading);
  }, [props.isLoading]);

  return (
    <>
      <Helmet>
        <title>Orders List</title>
        <meta name="Orders" content="Orders List" />
      </Helmet>
      <div style={{ marginLeft: '40px', marginBottom: '10px' }}>
        <h1 style={{ fontSize: 'x-large' }}> Orders List </h1>
      </div>
      <Tabs activeKey={tabsKey} onTabClick={setTabsKey}>
        <TabPane tab="Order Searching" key="1">
          <Row>
            <Col span={22}>
              <Input
                onPressEnter={e => {
                  setDestinationAddress('');
                  setOrderDescription('');
                  if (e.target.value !== '') {
                    getTrackOrder(e.target.value);
                  }
                }}
                value={inputTrackingNumber}
                onChange={e => setInputTrackingNumber(e.target.value)}
              />
            </Col>
            {isBarcodeScannerActive ? (
              <BarCodeScanner
                onUpdate={(err, res) => {
                  if (res) {
                    setIsBarcodeScannerActive(false);
                    setInputTrackingNumber(res.getText());
                  }
                }}
              />
            ) : (
              <React.Fragment />
            )}
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={8}>
              <p>Order Address</p>
            </Col>
            <Col span={16}>
              <p>{destinationAddress}</p>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={8}>
              <p>Order Description</p>
            </Col>
            <Col span={16}>
              <p>{orderDescription}</p>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={8}>
              <p>Order's Zone Selection Mode</p>
            </Col>
            <Col span={16} style={{ color: isOrderZoneSelectionByManual === true ? 'green' : 'black' }}>
              <p>
                {isOrderZoneSelectionByManual === undefined
                  ? 'Unknown Source'
                  : isOrderZoneSelectionByManual == false
                  ? 'System Auto Mapping'
                  : 'Manually Setting'}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>{searching ? <Spin spinning={searching} tip="Searching..." /> : <React.Fragment />}</Col>
          </Row>
          <Row style={{ marginTop: '100px' }}>
            <Col span={8}>
              <p>Zone Info:</p>
            </Col>
          </Row>
          {zoneResult ? (
            <div>
              <Row style={{ marginTop: '10px' }}>
                <Col span={8}>
                  <p style={{ marginLeft: '10px', fontSize: '24px' }}>Title</p>
                </Col>
                <Col span={16}>
                  <p style={{ fontSize: '36px' }}>{zoneResult.title}</p>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col span={8}>
                  <p style={{ marginLeft: '10px', fontSize: '24px' }}>Description</p>
                </Col>
                <Col span={16}>
                  <p style={{ fontSize: '36px' }}>{zoneResult.description}</p>
                </Col>
              </Row>
            </div>
          ) : (
            <div>
              <Row style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                <p style={{ fontSize: '40px', color: 'red' }}>NO RESULT FOUND IN ZONE</p>
              </Row>
            </div>
          )}
          <Row style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
            <Button disabled={orderPlaceId === '' && orderLngLat == undefined}>
              <Link
                to={
                  orderLngLat
                    ? `/zones?lng=${orderLngLat.lng}&lat=${orderLngLat.lat}`
                    : `/zones?placeId=${orderPlaceId}`
                }
              >
                View Place In Map
              </Link>
            </Button>
          </Row>
        </TabPane>
        <TabPane tab="Orders Data" key="2">
          <ModifyOrderModal modifyingId={modifyingId} />
          <SearchingModal isVisiable={isSearchVisiable} setIsVisiable={setIsSearchVisiable} />
          <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
            <Col span={3} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={() => {
                  setIsSearchVisiable(!isSearchVisiable);
                }}
              >
                Search
              </Button>
            </Col>
            <Col span={3} style={{ display: 'flex', justifyContent: 'center' }}>
              <ExportToExcel
                setIsLoading={setIsLoading}
                apiData={props.orderList}
                notice={'Export Data in the table'}
                fileName={`OrderExport_${dayjs().format('YYYY-MM-DD_hh-mm-ss')}`}
              />
            </Col>
          </Row>
          <Row style={{ width: '100%', overflowX: 'scroll' }}>
            <Col span={24}>
              <OrdersTable
                isLoading={isLoading}
                onModifyOrder={props.handleModifyOrderModalShow}
                setModifyingId={setModifyingId}
                delOrders={id => props.delOrders(id)}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Orders Input" key="3">
          <AddOrderModal />
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={props.handleAddOrderModalShow}>
              Add
            </Button>
          </div>
          <UploadStandardTemplateModal
            setFiles={setFiles}
            setUploadingPercent={setUploadingPercent}
            setUploadingDataList={setUploadingDataList}
          />
          <Row style={{ marginTop: '50px' }}>
            <Col span={3}>Standard Template</Col>
            <Col span={5}>
              <Button>
                <a
                  href={'https://miaexpress-files.s3.ap-southeast-1.amazonaws.com/Import+template.xlsx'}
                  download={'Standard_Template'}
                >
                  Download Template
                </a>
              </Button>
            </Col>
            <Col span={16}>
              <input type="file" id="xlsxStandardInput" accept=".xlsx" multiple={false} />
            </Col>
          </Row>
          <UploadSimpleTemplateModal
            setFiles={setFiles}
            setUploadingPercent={setUploadingPercent}
            setUploadingDataList={setUploadingDataList}
          />
          <Row style={{ marginTop: '50px' }}>
            <Col span={3}>Simple Template</Col>
            <Col span={5}>
              <Button>
                <a
                  href="https://miaexpress-files.s3.ap-southeast-1.amazonaws.com/Simple+Template.xlsx"
                  download={'Simple_Template'}
                >
                  Download Template
                </a>
              </Button>
            </Col>
            <Col span={16}>
              <input type="file" id="xlsxSimpleInput" accept=".xlsx" multiple={false} />
            </Col>
          </Row>
          <Row style={{ marginTop: '60px' }}>
            <Col span={4}>
              {uploadingPercent === 100 ? (
                <React.Fragment />
              ) : uploadingPercent === 0 ? (
                <Tag>Waiting for upload</Tag>
              ) : (
                <Tag>Uploading</Tag>
              )}
            </Col>
            <Col span={20}>
              {uploadingPercent === 100 ? (
                <React.Fragment />
              ) : uploadingPercent === 0 ? (
                <React.Fragment />
              ) : (
                <Progress percent={uploadingPercent} status="active" />
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: '30px', display: uploadingDataList.length === 0 ? 'none' : 'flex' }}>
            <Col span={3}></Col>
            <Col span={6} style={{ fontSize: '20px' }}>
              Data Loaded: {uploadingDataList.length}
            </Col>
            <Col span={5}>
              <Button
                onClick={async () => await onOrderDataUpload()}
                disabled={
                  uploadingPercent < 100 && uploadingPercent >= 0 && uploadingDataList.length !== 0 ? false : true
                }
              >
                Upload
              </Button>
            </Col>
            <Col span={5}>Upload Successful: {props.addOrderSuccessList.length}</Col>
            <Col span={5}>Upload Failed: {props.addOrderFailList.length}</Col>
          </Row>
          <Row>
            <UploadOrdersTable />
          </Row>
        </TabPane>
      </Tabs>
    </>
  );
}

Orders.propTypes = {
  getOrders: PropTypes.func,
  getZones: PropTypes.func,
  handleAddOrderModalShow: PropTypes.func,
  handleModifyOrderModalShow: PropTypes.func,
  delOrders: PropTypes.func,
  trackOrder: PropTypes.object,
  addOrderState: PropTypes.bool || null,

  MAWB: PropTypes.string,
  containerNumber: PropTypes.string,
  trackingNumber: PropTypes.string,
  shipper: PropTypes.string,
  shipperPhoneNumber: PropTypes.string,
  shipperAddress: PropTypes.string,
  destinationCountry: PropTypes.string,
  recipient: PropTypes.string,
  recipientPhoneNumber: PropTypes.string,
  recipientEmail: PropTypes.string,
  RUT: PropTypes.string,
  region: PropTypes.string,
  province: PropTypes.string,
  comuna: PropTypes.string,
  address: PropTypes.string,
  weight: PropTypes.number,
  value: PropTypes.number,
  description: PropTypes.string,
  quantity: PropTypes.number,
  addOrders: PropTypes.func,
  handleAddModalCancel: PropTypes.func,
  onChangeMAWB: PropTypes.func,
  onChangeContainerNumber: PropTypes.func,
  onChangeTrackingNumber: PropTypes.func,
  onChangeShipper: PropTypes.func,
  onChangeShipperPhoneNumber: PropTypes.func,
  onChangeShipperAddress: PropTypes.func,
  onChangeDestinationCountry: PropTypes.func,
  onChangeRecipient: PropTypes.func,
  onChangeRUT: PropTypes.func,
  onChangeRecipientEmail: PropTypes.func,
  onChangeRecipientPhoneNumber: PropTypes.func,
  onChangeRegion: PropTypes.func,
  onChangeProvince: PropTypes.func,
  onChangeComuna: PropTypes.func,
  onChangeAddress: PropTypes.func,
  onChangeWeight: PropTypes.func,
  onChangeValue: PropTypes.func,
  onChangeDescription: PropTypes.func,
  onChangeQuantity: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  isLoading: selectOrdesIsLoading,
  trackOrder: selectTrackOrder,
  orderList: selectOrdersList,
  zonesList: selectZonesList,
  addOrderState: selectAddOrderState,
  addOrderFailList: selectAddOrderFailList,
  addOrderSuccessList: selectAddOrderSuccessList,
  MAWB: makeSelectMAWB,
  containerNumber: makeSelectContainerNumber,
  trackingNumber: makeSelectTrackingNumber,
  shipper: makeSelectShipper,
  shipperPhoneNumber: makeSelectShipperPhoneNumber,
  shipperAddress: makeSelectShipperAddress,
  destinationCountry: makeSelectDestinationCountry,
  recipient: makeSelectRecipient,
  RUT: makeSelectRUT,
  recipientPhoneNumber: makeSelectRecipientPhoneNumber,
  recipientEmail: makeSelectRecipientEmail,
  region: makeSelectRegion,
  province: makeSelectProvince,
  comuna: makeSelectComuna,
  address: makeSelectAddress,
  value: makeSelectValue,
  description: makeSelectDescription,
  quantity: makeSelectQuantity,
  weight: makeSelectWeight,
});

const mapDispatchToProps = dispatch => ({
  getZones: () => dispatch(getZonesAction()),
  getOrders: payload => dispatch(getOrdersAction(payload)),
  getOrdersByUpdatedAt: date => dispatch(getOrdersByUpdatedAtAction(date)),
  getTrackOrder: trackingNumber => dispatch(trackOrdersAction(trackingNumber)),
  getTrackOrderList: trackingNumberList => dispatch(trackOrderListAction(trackingNumberList)),
  delOrders: id => dispatch(delOrdersAction(id)),
  handleAddOrderModalShow: () => dispatch(handleAddOrderModalShowAction()),
  handleModifyOrderModalShow: () => dispatch(handleModifyOrderModalShowAction()),
  modifyOrders: id => dispatch(modifyOrdersAction(id)),

  addOrders: () => dispatch(addOrdersAction()),
  addOrderList: list => dispatch(addOrderListAction(list)),

  onChangeIsLoading: e => dispatch(onChangeIsLoadingAction(e)),
  onChangeMAWB: e => dispatch(onChangeMAWBAction(e)),
  onChangeContainerNumber: e => dispatch(onChangeContainerNumberAction(e)),
  onChangeTrackingNumber: e => dispatch(onChangeTrackingNumberAction(e)),
  onChangeShipper: e => dispatch(onChangeShipperAction(e)),
  onChangeShipperPhoneNumber: e => dispatch(onChangeShipperPhoneNumberAction(e)),
  onChangeShipperAddress: e => dispatch(onChangeShipperAddressAction(e)),
  onChangeDestinationCountry: e => dispatch(onChangeDestinationCountryAction(e)),
  onChangeRecipient: e => dispatch(onChangeRecipientAction(e)),
  onChangeRUT: e => dispatch(onChangeRUTAction(e)),
  onChangeRecipientEmail: e => dispatch(onChangeRecipientEmailAction(e)),
  onChangeRecipientPhoneNumber: e => dispatch(onChangeRecipientPhoneNumberAction(e)),
  onChangeRegion: e => dispatch(onChangeRegionAction(e)),
  onChangeProvince: e => dispatch(onChangeProvinceAction(e)),
  onChangeComuna: e => dispatch(onChangeComunaAction(e)),
  onChangeAddress: e => dispatch(onChangeAddressAction(e)),
  onChangeWeight: e => dispatch(onChangeWeightAction(e)),
  onChangeValue: e => dispatch(onChangeValueAction(e)),
  onChangeDescription: e => dispatch(onChangeDescriptionAction(e)),
  onChangeQuantity: e => dispatch(onChangeQuantityAction(e)),
  onChangeAddOrderStatus: e => dispatch(onChangeAddOrderStatusAction(e)),
  onChangeAddOrderSuccessNumber: e => dispatch(onChangeAddOrderSuccessNumberAction(e)),
  onChangeAddOrderFailNumber: e => dispatch(onChangeAddOrderFailNumberAction(e)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Orders);
