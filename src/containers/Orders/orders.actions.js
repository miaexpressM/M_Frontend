import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_FAILURE,
  GET_ORDERS_SUCCESS,
  TRACK_ORDER_REQUEST,
  TRACK_ORDER_SUCCESS,
  TRACK_ORDER_FAILURE,
  TRACK_ORDER_LIST_REQUEST,
  TRACK_ORDER_LIST_SUCCESS,
  TRACK_ORDER_LIST_FAILURE,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  ADD_ORDER_LIST_REQUEST,
  ADD_ORDER_LIST_SUCCESS,
  ADD_ORDER_LIST_FAILURE,
  GET_ORDERS_UPDATED_AT_REQUEST,
  GET_ORDERS_UPDATED_AT_FAILURE,
  GET_ORDERS_UPDATED_AT_SUCCESS,
  DEL_ORDER_REQUEST,
  DEL_ORDER_SUCCESS,
  DEL_ORDER_FAILURE,
  MODIFY_ORDER_REQUEST,
  MODIFY_ORDER_SUCCESS,
  MODIFY_ORDER_FAILURE,
  MODIFY_ORDER_WITH_ZONEID_REQUEST,
  MODIFY_ORDER_WITH_ZONEID_SUCCESS,
  MODIFY_ORDER_WITH_ZONEID_FAILURE,
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
  ON_CHANGE_LENGTH,
  ON_CHANGE_HEIGHT,
  ON_CHANGE_VALUE,
  ON_CHANGE_DESCRIPTION,
  ON_CHANGE_QUANTITY,
  ON_CHANGE_ADD_ORDER_STATUS,
  ON_CHANGE_ADD_ORDER_SUCCESS_NUMBER,
  ON_CHANGE_ADD_ORDER_FAIL_NUMBER,
  ON_CHANGE_ISLOADING,
  ON_CHANGE_WIDTH,
} from './orders.constants';

export const getOrdersAction = payload => ({ type: GET_ORDERS_REQUEST, payload });
export const getOrdersSuccess = payload => ({ type: GET_ORDERS_SUCCESS, payload });
export const getOrdersFailure = payload => ({ type: GET_ORDERS_FAILURE, payload });

export const trackOrdersAction = payload => ({ type: TRACK_ORDER_REQUEST, payload });
export const trackOrdersSuccess = payload => ({ type: TRACK_ORDER_SUCCESS, payload });
export const trackOrdersFailure = payload => ({ type: TRACK_ORDER_FAILURE, payload });

export const trackOrderListAction = payload => ({ type: TRACK_ORDER_LIST_REQUEST, payload });
export const trackOrderListSuccess = payload => ({ type: TRACK_ORDER_LIST_SUCCESS, payload });
export const trackOrderListFailure = payload => ({ type: TRACK_ORDER_LIST_FAILURE, payload });

export const getOrdersByUpdatedAtAction = payload => ({ type: GET_ORDERS_UPDATED_AT_REQUEST, payload });
export const getOrdersByUpdatedAtSuccess = payload => ({ type: GET_ORDERS_UPDATED_AT_SUCCESS, payload });
export const getOrdersByUpdatedAtFailure = payload => ({ type: GET_ORDERS_UPDATED_AT_FAILURE, payload });

export const addOrdersAction = payload => ({ type: ADD_ORDER_REQUEST, payload });
export const addOrdersSuccess = payload => ({ type: ADD_ORDER_SUCCESS, payload });
export const addOrdersFailure = payload => ({ type: ADD_ORDER_FAILURE, payload });

export const addOrderListAction = payload => ({ type: ADD_ORDER_LIST_REQUEST, payload });
export const addOrderListSuccess = payload => ({ type: ADD_ORDER_LIST_SUCCESS, payload });
export const addOrderListFailure = payload => ({ type: ADD_ORDER_LIST_FAILURE, payload });

export const delOrdersAction = payload => ({ type: DEL_ORDER_REQUEST, payload });
export const delOrdersSuccess = payload => ({ type: DEL_ORDER_SUCCESS, payload });
export const delOrdersFailure = payload => ({ type: DEL_ORDER_FAILURE, payload });

export const modifyOrdersAction = payload => ({ type: MODIFY_ORDER_REQUEST, payload });
export const modifyOrdersSuccess = payload => ({ type: MODIFY_ORDER_SUCCESS, payload });
export const modifyOrdersFailure = payload => ({ type: MODIFY_ORDER_FAILURE, payload });

export const modifyOrdersWithZoneIdAction = payload => ({ type: MODIFY_ORDER_WITH_ZONEID_REQUEST, payload });
export const modifyOrdersWithZoneIdSuccess = payload => ({ type: MODIFY_ORDER_WITH_ZONEID_SUCCESS, payload });
export const modifyOrdersWithZoneIdFailure = payload => ({ type: MODIFY_ORDER_WITH_ZONEID_FAILURE, payload });

export const handleAddOrderModalShowAction = payload => ({ type: HANDLE_ADD_ORDER_MODAL_SHOW, payload });
export const handleAddOrderModalCancelAction = payload => ({ type: HANDLE_ADD_ORDER_MODAL_CANCEL, payload });

export const handleModifyOrderModalShowAction = payload => ({ type: HANDLE_MODIFY_ORDER_MODAL_SHOW, payload });
export const handleModifyOrderModalCancelAction = payload => ({ type: HANDLE_MODIFY_ORDER_MODAL_CANCEL, payload });

export const onChangeIsLoadingAction = payload => ({ type: ON_CHANGE_ISLOADING, payload });

export const onChangeMAWBAction = payload => ({ type: ON_CHANGE_MAWB, payload });
export const onChangeContainerNumberAction = payload => ({ type: ON_CHANGE_CONTAINER_NUMBER, payload });
export const onChangeTrackingNumberAction = payload => ({ type: ON_CHANGE_TRACKING_NUMBER, payload });
export const onChangeShipperAction = payload => ({ type: ON_CHANGE_SHIPPER, payload });
export const onChangeShipperPhoneNumberAction = payload => ({ type: ON_CHANGE_SHIPPER_PHONE_NUMBER, payload });
export const onChangeShipperAddressAction = payload => ({ type: ON_CHANGE_SHIPPER_ADDRESS, payload });
export const onChangeDestinationCountryAction = payload => ({ type: ON_CHANGE_DESTINATION_COUNTRY, payload });
export const onChangeRecipientAction = payload => ({ type: ON_CHANGE_RECIPIENT, payload });
export const onChangeRUTAction = payload => ({ type: ON_CHANGE_RUT, payload });
export const onChangeRecipientPhoneNumberAction = payload => ({ type: ON_CHANGE_RECIPIENT_PHONE_NUMBER, payload });
export const onChangeRecipientEmailAction = payload => ({ type: ON_CHANGE_RECIPIENT_EMAIL, payload });
export const onChangeRegionAction = payload => ({ type: ON_CHANGE_REGION, payload });
export const onChangeProvinceAction = payload => ({ type: ON_CHANGE_PROVINCE, payload });
export const onChangeComunaAction = payload => ({ type: ON_CHANGE_COMUNA, payload });
export const onChangeAddressAction = payload => ({ type: ON_CHANGE_ADDRESS, payload });
export const onChangeWeightAction = payload => ({ type: ON_CHANGE_WEIGHT, payload });
export const onChangeLengthAction = payload => ({ type: ON_CHANGE_LENGTH, payload });
export const onChangeHeightAction = payload => ({ type: ON_CHANGE_HEIGHT, payload });
export const onChangeWidthAction = payload => ({ type: ON_CHANGE_WIDTH, payload });
export const onChangeValueAction = payload => ({ type: ON_CHANGE_VALUE, payload });
export const onChangeDescriptionAction = payload => ({ type: ON_CHANGE_DESCRIPTION, payload });
export const onChangeQuantityAction = payload => ({ type: ON_CHANGE_QUANTITY, payload });

export const onChangeAddOrderStatusAction = payload => ({ type: ON_CHANGE_ADD_ORDER_STATUS, payload });
export const onChangeAddOrderSuccessNumberAction = payload => ({ type: ON_CHANGE_ADD_ORDER_SUCCESS_NUMBER, payload });
export const onChangeAddOrderFailNumberAction = payload => ({ type: ON_CHANGE_ADD_ORDER_FAIL_NUMBER, payload });
