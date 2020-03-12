import { GET_PURCHASE_INVOICE, GET_RETURN_INVOICE, GET_INVOICE_DETAIL } from "../types"

initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PURCHASE_INVOICE:
      return { ...state, purchase: action.payload }

    case GET_RETURN_INVOICE:
      return { ...state, return: action.payload }
    case GET_INVOICE_DETAIL:
      return {...state, invoiceIdDetail: action.payload}

    default:
      return state
  }
}
