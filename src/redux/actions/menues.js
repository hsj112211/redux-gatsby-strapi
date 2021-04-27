import { menuActionTypes } from '../actionTypes';

export const setCheckedMenues = (menu) => ({
  type: menuActionTypes.SET_CHECKED_MENUES,
  payload: menu
});

export const setCartList = (list) => ({
  type: menuActionTypes.SET_CART_LIST,
  payload:list
});

export const setOrderComplete = (order) => {
  return { 
    type: menuActionTypes.ORDER_COMPLETE,
    payload: order
  }
};

export const setTotalPrice = (price, flag) => {
    return {
      type: menuActionTypes.SET_TOTAL_PRICE,
      payload: { price, flag }
    }
};

export const setSelectedCoupon = (coupon) => {
  return {
    type: menuActionTypes.SET_SELECTED_COUPON,
    payload: coupon
  }
};

export const setInitializeState = () => {
  return {
    type: menuActionTypes.SET_INITIALIZE_STATE
  }
}

  
