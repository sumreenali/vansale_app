import { GET_VANSALES, GET_VANSALES_DROPDOWN,GET_VANSALES_REDEEMED,REDEEM_VANSALE_POINT } from "../types"

initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VANSALES:
      return { ...state, data: action.payload }
    case GET_VANSALES_DROPDOWN: 
      return {...state, dropdown: action.payload}

      case GET_VANSALES_REDEEMED: 
      return {...state, vansaleRedeemedData: action.payload}

      case REDEEM_VANSALE_POINT: 
      return {...state, redeemRequestResponseData: action.payload}

  

    default:
      return state
  }
}
