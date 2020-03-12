import { getBalance, getPointHistory, getPointOffers } from "./balanceActions";
import { getReturnInvoice, getPurchaseInvoice } from "./invoiceActions";
import { getNotification } from "./notificationActions";
import { userReport } from "./reportAction";
import AsyncStorage from "@react-native-community/async-storage";
import { Cache } from "react-native-cache";
import { resolve } from "path";




export function refreshUserData() {

  // getBalance();
  // getPointHistory();
  // getPointOffers();
  // getReturnInvoice();
  // getPurchaseInvoice();
  // getNotification();
  // userReport();

  var cache = new Cache({
    namespace: "FGMM",
    policy: {
      maxEntries: 50000,
    },
    backend: AsyncStorage,
  })

  cache.getItem("userData", (err, value) => {
    const token = value.package.token;
    const id = { customer_id: value.package.id };
    // const data = getPurchaseInvoice(token, id);
    // console.log(data.payload._55)

  })

}