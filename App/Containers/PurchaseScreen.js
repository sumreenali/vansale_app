import React, { PureComponent } from "react"
import { View, Dimensions } from "react-native"
import { connect } from "react-redux"
import { translate } from "../i18n"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import styles from "./Styles/InvoiceScreenStyle"
import { Cache } from "react-native-cache"
import AsyncStorage from "@react-native-community/async-storage";
import PurchaseNewInvoiceView from "../Components/PuchaseNewInvoiceVIew"
import ReturnNewInvoiceView from "../Components/ReturnNewInvoiceView"
import {
  getPurchaseInvoices,
  getPurchaseReturnInvoice,
  getPurchaseInvoicesFromCache,
  getPurchaseReturnInvoiceFromCache
} from "../Redux/Actions/PurchaseInvoiceAction"


class PurchaseScreen extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: "purchase", title: translate("PurchaseScreen.purchase") },
      { key: "return", title: translate("PurchaseScreen.return") },
    ],
    token: null,
    vansale_id: 0,
    user: null,
  }
  componentDidMount() {
    const { dispatch, userData } = this.props

    this.setState(
      {
        token: userData.data.package.token || value.package.token,
        vansale_id: userData.data.package.id || value.package.id,
      },
      () => {
        const { token, vansale_id } = this.state

        dispatch(getPurchaseInvoices(token, { vansale_id, vansale : "",
        dates : ""  }))
          .then(res => {
            console.log('Hello thos is jsahdasjkhdas',res);
            if (res.payload.status === true) {
              var cache = new Cache({
                namespace: "FGMM",
                policy: {
                  maxEntries: 50000,
                },
                backend: AsyncStorage,
              })
              cache.setItem("purchaseinvoiceData", res.payload, function(err) {})
            }
          })
          .catch(err => {
            var cache = new Cache({
              namespace: "FGMM",
              policy: {
                maxEntries: 50000,
              },
              backend: AsyncStorage,
            })
            cache.getItem("purchaseinvoiceData", function(err, value) {
              if (value) {
                if (value.status === true) {
                  dispatch(getPurchaseInvoicesFromCache(value))
                }
              }
            })
          })

        dispatch(getPurchaseReturnInvoice(token, { vansale_id, vansale : "",
        dates : ""   }))
          .then(res => {
            console.log("asgjhdgajshgd gdjhagsjdhgasjhd",res)
            if (res.payload.status === true) {
              var cache = new Cache({
                namespace: "FGMM",
                policy: {
                  maxEntries: 50000,
                },
                backend: AsyncStorage,
              })
              cache.setItem("purchaseinvoiceReturnData", res.payload, function(err) {})
            }
          })
          .catch(err => {
            var cache = new Cache({
              namespace: "FGMM",
              policy: {
                maxEntries: 50000,
              },
              backend: AsyncStorage,
            })
            cache.getItem("purchaseinvoiceReturnData", function(err, value) {
              if (value) {
                if (value.status === true) {
                  dispatch(getPurchaseReturnInvoiceFromCache(value))
                }
              }
            })
          })
      },
    )

    var cache = new Cache({
      namespace: "FGMM",
      policy: {
        maxEntries: 50000,
      },
      backend: AsyncStorage,
    })

    cache.getItem("userData", function(err, value) {
      if (value) {
        if (value.status === true) {
        }
      } else {
        this.setState({
          token: userData.data.package.token || value.package.token,
          vansale_id: userData.data.package.id || value.package.id,
        })
      }
    })
  }

  render() {
    console.log("data purchase Sale : ",this.props.purchaseInvoiceSales)
    console.log("data purchase Return : ",this.props.purchaseInvoiceReturn)
    return (
        <View style={styles.container}>
          <TabView
            navigationState={this.state}
            activeColor="#777"
            inactiveColor="#000"
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={styles.indicator}
                style={styles.tabBar}
                labelStyle={styles.labelStyle}
              />
            )}
            renderScene={SceneMap({
              purchase: PurchaseNewInvoiceView,
              return: ReturnNewInvoiceView,
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get("window").width }}
          />
        </View>
      )

    
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    invoiceData: state.invoiceData,
    returnInvoiceData: state.invoiceData.return,
    purchaseInvoiceSales: state.purchaseInvoice.purchase,
    purchaseInvoiceReturn: state.purchaseInvoice.return
  }
}

export default connect(mapStateToProps)(PurchaseScreen)
