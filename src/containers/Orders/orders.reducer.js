import produce from 'immer';
import {
  GET_ORDERS_SUCCESS,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  ADD_ORDER_LIST_REQUEST,
  ADD_ORDER_LIST_FAILURE,
  ADD_ORDER_LIST_SUCCESS,
  MODIFY_ORDER_REQUEST,
  MODIFY_ORDER_SUCCESS,
  MODIFY_ORDER_FAILURE,
  HANDLE_ADD_ORDER_MODAL_SHOW,
  HANDLE_ADD_ORDER_MODAL_CANCEL,
  HANDLE_MODIFY_ORDER_MODAL_SHOW,
  HANDLE_MODIFY_ORDER_MODAL_CANCEL,
  ON_CHANGE_MAWB,
  ON_CHANGE_CONTAINER_NUMBER,
  ON_CHANGE_TRACKING_NUMBER,
  ON_CHANGE_SHIPPER,
  ON_CHANGE_SHIPPER_PHONE_NUMBER,
  ON_CHANGE_SHIPPER_ADDRESS,
  ON_CHANGE_DESTINATION_COUNTRY,
  ON_CHANGE_RECIPIENT,
  ON_CHANGE_RUT,
  ON_CHANGE_RECIPIENT_PHONE_NUMBER,
  ON_CHANGE_RECIPIENT_EMAIL,
  ON_CHANGE_REGION,
  ON_CHANGE_PROVINCE,
  ON_CHANGE_COMUNA,
  ON_CHANGE_ADDRESS,
  ON_CHANGE_WEIGHT,
  ON_CHANGE_VALUE,
  ON_CHANGE_DESCRIPTION,
  ON_CHANGE_QUANTITY,
  TRACK_ORDER_SUCCESS,
  TRACK_ORDER_LIST_SUCCESS,
  ON_CHANGE_ADD_ORDER_STATUS,
  ON_CHANGE_ADD_ORDER_SUCCESS_NUMBER,
  ON_CHANGE_ADD_ORDER_FAIL_NUMBER,
  GET_ORDERS_UPDATED_AT_SUCCESS,
} from './orders.constants';

export const initialState = {
  ordersList: [],
  addOrderModalVisible: false,
  addOrderModalLoading: false,
  modifyOrderModalVisible: false,
  modifyOrderModalLoading: false,
  addOrderState: undefined,
  addOrderFailNumber: 0,
  addOrderSuccessNumber: 0,
  trackorder: {},
  orderForm: {
    MAWB: '',
    countainerNumber: '',
    trackingNumber: '',
    shipper: '',
    shipperPhoneNumber: '',
    shipperAddress: '',
    destinationCountry: '',
    recipient: '',
    RUT: '',
    recipientPhoneNumber: '',
    recipientEmail: '',
    region: '',
    province: '',
    comuna: '',
    address: '',
    weight: 0,
    value: 0,
    description: '',
    quantity: 0,
  },
};

/* eslint-disable default-case, no-param-reassign */
const ordersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ORDERS_SUCCESS:
        draft.ordersList = action.payload.data;
        break;
      case GET_ORDERS_UPDATED_AT_SUCCESS:
        draft.ordersList = action.payload.data;
        break;
      case TRACK_ORDER_SUCCESS:
        draft.trackOrder = action.payload.data;
        break;
      case TRACK_ORDER_LIST_SUCCESS:
        draft.ordersList = action.payload;
        console.log(action);
        break;
      case ADD_ORDER_REQUEST:
        draft.addOrderModalLoading = true;
        draft.addOrderState = undefined;
        break;
      case ADD_ORDER_SUCCESS:
        draft.addOrderModalLoading = false;
        draft.addOrderModalVisible = false;
        draft.ordersList = draft.ordersList.concat([action.payload.data]);
        draft.orderForm = initialState.orderForm;
        draft.addOrderState = true;
        break;
      case ADD_ORDER_FAILURE:
        draft.addOrderModalLoading = false;
        draft.addOrderState = false;
        break;
      case ADD_ORDER_LIST_REQUEST:
        draft.addOrderModalLoading = true;
        draft.addOrderFailNumber = 0;
        draft.addOrderSuccessNumber = 0;
        break;
      case ADD_ORDER_LIST_SUCCESS:
        draft.addOrderModalLoading = false;
        draft.addOrderModalVisible = false;
        draft.ordersList = draft.ordersList.concat([action.payload.data]);
        draft.orderForm = initialState.orderForm;
        draft.addOrderSuccessNumber += 1;
        break;
      case ADD_ORDER_LIST_FAILURE:
        draft.addOrderModalLoading = false;
        draft.addOrderFailNumber += 1;
        break;
      case MODIFY_ORDER_REQUEST:
        draft.modifyOrderModalLoading = true;
        break;
      case MODIFY_ORDER_SUCCESS:
        draft.modifyOrderModalLoading = false;
        draft.modifyOrderModalVisible = false;
        draft.orderForm = initialState.orderForm;
        break;
      case MODIFY_ORDER_FAILURE:
        draft.modifyOrderModalLoading = false;
      case HANDLE_ADD_ORDER_MODAL_SHOW:
        draft.addOrderModalVisible = true;
        break;
      case HANDLE_ADD_ORDER_MODAL_CANCEL:
        draft.addOrderModalLoading = false;
        draft.addOrderModalVisible = false;
        draft.orderForm = initialState.orderForm;
        break;
      case HANDLE_MODIFY_ORDER_MODAL_SHOW:
        draft.modifyOrderModalVisible = true;
        break;
      case HANDLE_MODIFY_ORDER_MODAL_CANCEL:
        draft.modifyOrderModalLoading = false;
        draft.modifyOrderModalVisible = false;
        draft.orderForm = initialState.orderForm;
        break;
      case ON_CHANGE_MAWB:
        draft.orderForm.MAWB = action.payload;
        break;
      case ON_CHANGE_CONTAINER_NUMBER:
        draft.orderForm.containerNumber = action.payload;
        break;
      case ON_CHANGE_TRACKING_NUMBER:
        draft.orderForm.trackingNumber = action.payload;
        break;
      case ON_CHANGE_SHIPPER:
        draft.orderForm.shipper = action.payload;
        break;
      case ON_CHANGE_SHIPPER_ADDRESS:
        draft.orderForm.shipperAddress = action.payload;
        break;
      case ON_CHANGE_SHIPPER_PHONE_NUMBER:
        draft.orderForm.shipperPhoneNumber = action.payload;
        break;
      case ON_CHANGE_DESTINATION_COUNTRY:
        draft.orderForm.destinationCountry = action.payload;
        break;
      case ON_CHANGE_RECIPIENT:
        draft.orderForm.recipient = action.payload;
        break;
      case ON_CHANGE_RUT:
        draft.orderForm.RUT = action.payload;
        break;
      case ON_CHANGE_RECIPIENT_EMAIL:
        draft.orderForm.recipientEmail = action.payload;
        break;
      case ON_CHANGE_RECIPIENT_PHONE_NUMBER:
        draft.orderForm.recipientPhoneNumber = action.payload;
        break;
      case ON_CHANGE_REGION:
        draft.orderForm.region = action.payload;
        break;
      case ON_CHANGE_PROVINCE:
        draft.orderForm.province = action.payload;
        break;
      case ON_CHANGE_COMUNA:
        draft.orderForm.comuna = action.payload;
        break;
      case ON_CHANGE_ADDRESS:
        draft.orderForm.address = action.payload;
        break;
      case ON_CHANGE_WEIGHT:
        draft.orderForm.weight = action.payload;
        break;
      case ON_CHANGE_VALUE:
        draft.orderForm.value = action.payload;
        break;
      case ON_CHANGE_DESCRIPTION:
        draft.orderForm.description = action.payload;
        break;
      case ON_CHANGE_QUANTITY:
        draft.orderForm.quantity = action.payload;
        break;

      case ON_CHANGE_ADD_ORDER_STATUS:
        draft.addOrderState = action.payload;
        break;
      case ON_CHANGE_ADD_ORDER_SUCCESS_NUMBER:
        draft.addOrderSuccessNumber = action.payload;
        break;
      case ON_CHANGE_ADD_ORDER_FAIL_NUMBER:
        draft.addOrderFailNumber = action.payload;
        break;
    }
  });

export default ordersReducer;
