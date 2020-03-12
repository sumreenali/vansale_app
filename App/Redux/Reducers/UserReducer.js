import { LOGIN_USER, LOGOUT_USER, UPDATE_PASSWORD, UPDATE_FCM } from "../types"

initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, data: action.payload }

    case UPDATE_PASSWORD:
      return { ...state, update: action.payload }

    case UPDATE_FCM: 
      return { ...state, fcm: action.payload }

    case LOGOUT_USER:
      return { ...state, data: {} }

    default:
      return state
  }
}
