import { createStore, applyMiddleware } from "redux"
import promiseMiddleware from "redux-promise"
import ReduxThunk from "redux-thunk"
import RootReducer from "./Reducers"

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
const store = createStoreWithMiddleware(RootReducer)

export default store
