import { menuActionTypes } from "../actionTypes"

const initialState = {
  checkedMenues: [],
  cartList: [],
  orderDetail: {},
  totalPrice: 0,
  tempTotalPrice: 0,
  selectedCoupon: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    
    // add to cart / delete from cart btn ( checkbox / cancel btn)
    case menuActionTypes.SET_CHECKED_MENUES:
        if(!state.checkedMenues.includes(action.payload)){
            return { ...state, checkedMenues: [...state.checkedMenues, action.payload]};
        } else {
            const existPayload = state.checkedMenues.indexOf(action.payload)
            state.checkedMenues.splice(existPayload, 1);
            return { ...state, checkedMenues: [...state.checkedMenues]};
        }
    
    // set cart list
    case menuActionTypes.SET_CART_LIST:
        return { ...state, cartList: [ ...action.payload ]};
        
    // set order detail
    case menuActionTypes.ORDER_COMPLETE:
      return { ...state, orderDetail: action.payload };
    
    // set total price / set temp total price
    case menuActionTypes.SET_TOTAL_PRICE:
      if( action.payload.flag === 'totalPrice' ) {
        return { ... state, totalPrice: action.payload.price };
      } else {
        return { ... state, tempTotalPrice: action.payload.price };
      }

    // set selected coupon
    case menuActionTypes.SET_SELECTED_COUPON:
      return { ...state, selectedCoupon: action.payload };

    // initialize state
    case menuActionTypes.SET_INITIALIZE_STATE:
      return initialState;

    default:
      return state
  }
}
