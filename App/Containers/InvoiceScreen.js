import React, { PureComponent } from "react"
import { View, Dimensions } from "react-native"
import PurchaseInvoiceView from "../Components/Purchaseinvoiceview"
import ReturnInvoiceView from "../Components/Returninvoiceview"
import { connect } from "react-redux"
import { translate } from "../i18n"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import styles from "./Styles/InvoiceScreenStyle"
import { Cache } from "react-native-cache"
import AsyncStorage from "@react-native-community/async-storage";

import {
  getPurchaseInvoice,
  getPurchaseInvoiceFromCache,
  getReturnInvoice,
  getReturnInvoiceFromCache,
} from "../Redux/Actions/invoiceActions"

class InvoiceScreen extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: "purchase", title: translate("invoiceScreen.purchase") },
      { key: "return", title: translate("invoiceScreen.return") },
    ],
    token: null,
    customer_id: 0,
    user: null,
  }
  componentDidMount() {
    const { dispatch, userData } = this.props

    this.setState(
      {
        token: userData.data.package.token || value.package.token,
        customer_id: userData.data.package.id || value.package.id,
      },
      () => {
        const { token, customer_id } = this.state

        dispatch(getPurchaseInvoice(token, { customer_id, vansale : "",
        dates : ""  }))
          .then(res => {
            console.log(res);
            if (res.payload.status === true) {
              var cache = new Cache({
                namespace: "FGMM",
                policy: {
                  maxEntries: 50000,
                },
                backend: AsyncStorage,
              })
              cache.setItem("invoiceData", res.payload, function(err) {})
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
            cache.getItem("invoiceData", function(err, value) {
              if (value) {
                if (value.status === true) {
                  dispatch(getPurchaseInvoiceFromCache(value))
                }
              }
            })
          })

        dispatch(getReturnInvoice(token, { customer_id, vansale : "",
        dates : "" }))
          .then(res => {
            console.log(res)
            if (res.payload.status === true) {
              var cache = new Cache({
                namespace: "FGMM",
                policy: {
                  maxEntries: 50000,
                },
                backend: AsyncStorage,
              })
              cache.setItem("invoiceReturnData", res.payload, function(err) {})
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
            cache.getItem("invoiceReturnData", function(err, value) {
              if (value) {
                if (value.status === true) {
                  dispatch(getReturnInvoiceFromCache(value))
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
          customer_id: userData.data.package.id || value.package.id,
        })
      }
    })
  }

  render() {
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
            purchase: PurchaseInvoiceView,
            return: ReturnInvoiceView,
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
  }
}

export default connect(mapStateToProps)(InvoiceScreen)
