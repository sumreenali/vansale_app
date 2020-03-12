import { combineReducers } from "redux"
import userData from "./UserReducer"
import locale from "./localeReducer"
import invoiceData from "./invoiceReducer"
import balanceData from "./balanceReducer"
import notificationData from "./notificationReducer"
import vansalesData from "./vansalesReducer"
import freezerData from "./freezerReducer"
import reportData from "./reportReducer"
import miscReducer from "./miscReducers"
import reportTopProductsData from "./reportReducer"
import stockData from "./StockReducer"
import purchaseInvoice from "./PurchaseReducer"

const RootReducer = combineReducers({
  userData,
  locale,
  invoiceData,
  balanceData,
  notificationData,
  vansalesData,
  freezerData,
  reportData,
  reportTopProductsData,
  misc: miscReducer,
  stockData,
  purchaseInvoice

})

export default RootReducer
