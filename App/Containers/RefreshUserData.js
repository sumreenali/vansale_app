import React, { PureComponent } from "react"
import {
  getBalance,
  getPointHistory,
  getPointOffers,
  getBalanceFromCache,
  getPointOffersFromCache,
  getPointHistoryFromCache,
} from "../Redux/Actions/balanceActions"
import {
  getReturnInvoice,
  getPurchaseInvoice,
  getPurchaseInvoiceFromCache,
  getReturnInvoiceFromCache,
} from "../Redux/Actions/invoiceActions"
import { getNotification, getNotificationFromCache } from "../Redux/Actions/notificationActions"
import { userReport, userReportFromCache } from "../Redux/Actions/reportAction"
import { connect } from "react-redux"
import { Text, ActivityIndicator, View } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { Cache } from "react-native-cache"
import { Colors } from "../Themes"
import NetInfo from "@react-native-community/netinfo"
import {
  getClaim,
  getClaimFromCache,
  getUserFreezerList,
  getUserFreezerListFromCache,
} from "../Redux/Actions/freezerActions"
import { clearAllFilters } from "../Redux/Actions/misc"

class RefreshUserData extends PureComponent {
  state = {
    message: "Loading...",
    successAPI: 0,
    isConnected: false,
    allResponseCome: false,
  }

  refreshUserData = () => {
    const { dispatch } = this.props

    var cache = new Cache({
      namespace: "FGMM",
      policy: {
        maxEntries: 50000,
      },
      backend: AsyncStorage,
    })

    cache.getItem("userData", (err, value) => {
      const token = value.package.token
      const id = { customer_id: value.package.id }

      dispatch(getPurchaseInvoice(token, id))
        .then(res => {
          if (res.payload.status === true) {
            cache.setItem("invoiceData", res.payload, function(err) {})
            this.setState({ successAPI: this.state.successAPI + 1 })
          }
        })
        .catch(err => {
          cache.getItem("invoiceData", function(err, value) {
            if (value) {
              if (value.status === true) {
                dispatch(getPurchaseInvoiceFromCache(value))
              }
            }
          })
          this.setState({ successAPI: this.state.successAPI + 1 })
        })

      dispatch(getReturnInvoice(token, id))
        .then(res => {
          if (res.payload.status === true) {
            cache.setItem("invoiceReturnData", res.payload, function(err) {})
            this.setState({ successAPI: this.state.successAPI + 1 })
          }
        })
        .catch(err => {
          cache.getItem("invoiceReturnData", function(err, value) {
            if (value) {
              if (value.status === true) {
                dispatch(getReturnInvoiceFromCache(value))
              }
            }
          })
          this.setState({ successAPI: this.state.successAPI + 1 })
        })

      dispatch(getBalance(token, id))
        .then(res => {
          if (res.payload.status === true) {
            cache.setItem("balanceData", res.payload, function(err) {})
            this.setState({ successAPI: this.state.successAPI + 1 })
          }
        })
        .catch(err => {
          cache.getItem("balanceData", function(err, value) {
            if (value) {
              if (value.status === true) {
                dispatch(getBalanceFromCache(value))
              }
            }
          })
          this.setState({ successAPI: this.state.successAPI + 1 })
        })

      dispatch(getPointOffers(token, id))
        .then(res => {
          if (res.payload.status === true) {
            cache.setItem("offerData", res.payload, function(err) {})
            this.setState({ successAPI: this.state.successAPI + 1 })
          }
        })
        .catch(err => {
          cache.getItem("offerData", function(err, value) {
            if (value) {
              if (value.status === true) {
                dispatch(getPointOffersFromCache(value))
              }
            }
          })
          this.setState({ successAPI: this.state.successAPI + 1 })
        })

      dispatch(getPointHistory(token, id))
        .then(res => {
          if (res.payload.status === true) {
            cache.setItem("pointHistoryData", res.payload, function(err) {})
            this.setState({ successAPI: this.state.successAPI + 1 })
          }
        })
        .catch(err => {
          cache.getItem("pointHistoryData", function(err, value) {
            if (value) {
              if (value.status === true) {
                dispatch(getPointHistoryFromCache(value))
              }
            }
          })
          this.setState({ successAPI: this.state.successAPI + 1 })
        })

      dispatch(getNotification(token, id))
        .then(res => {
          if (res.payload.status === true) {
            cache.setItem("notificationData", res.payload, function(err) {})
            this.setState({ successAPI: this.state.successAPI + 1 })
          }
        })
        .catch(err => {
          cache.getItem("notificationData", function(err, value) {
            if (value) {
              if (value.status === true) {
                dispatch(getNotificationFromCache(value))
              }
            }
          })
          this.setState({ successAPI: this.state.successAPI + 1 })
        })

      dispatch(userReport(token, "amazon"))
        .then(res => {
          if (res.payload.status) {
            const data = res.payload
            cache.setItem("userReport", data, err => {})
            this.setState({ successAPI: this.state.successAPI + 1 })
          }
        })
        .catch(err => {
          cache.getItem("userReport", function(err, value) {
            if (value) {
              if (value.status === true) {
                dispatch(userReportFromCache(value))
              }
            }
          })
          this.setState({ successAPI: this.state.successAPI + 1 })
        })

      dispatch(getClaim(token, {}))
        .then(res => {
          if (res.payload.status) {
            const data = res.payload
            cache.setItem("getClaim", data, err => {})
            this.setState({ successAPI: this.state.successAPI + 1 })
          }
        })
        .catch(err => {
          cache.getItem("getClaim", function(err, value) {
            if (value) {
              if (value.status === true) {
                dispatch(getClaimFromCache(value))
              }
            }
          })
          this.setState({ successAPI: this.state.successAPI + 1 })
        })

      dispatch(getUserFreezerList(token, { serial_no: "" }))
        .then(res => {
          if (res.payload.status === true) {
            cache.setItem("freezerList", res.payload, function(err) {})
            this.setState({ successAPI: this.state.successAPI + 1 })
          }
        })
        .catch(err => {
          cache.getItem("freezerList", function(err, value) {
            if (value) {
              if (value.status === true) {
                dispatch(getUserFreezerListFromCache(value))
              }
            }
          })
          this.setState({ successAPI: this.state.successAPI + 1 })
        })
    })
  }

  componentDidMount() {
    this.refreshUserData()
    NetInfo.fetch().then(state => {
      if (this.state.isConnected !== state.isConnected) {
        this.setState({ isConnected: state.isConnected })
      }
    })
    setInterval(() => {
      NetInfo.fetch().then(state => {
        if (this.state.isConnected !== state.isConnected) {
          this.setState({ isConnected: state.isConnected })
        }
      })
    }, 3000)
  }

  componentDidUpdate() {
    if (this.state.successAPI > 8) {
      this.setState({ message: "Successfully Synced.", allResponseCome: true })
      this.props.dispatch(clearAllFilters())
      setTimeout(() => {
        this.props.navigation.goBack()
      }, 100)
    }

    if (this.state.isConnected === false) {
      this.setState({ message: "Sorry you are offline! please connect to the internet." })
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {this.state.isConnected && this.state.allResponseCome === false ? (
          <ActivityIndicator color={`${Colors.rootsyPrimary}`} size="large" />
        ) : (
          <Text></Text>
        )}
        <Text>{this.state.message}</Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    userData: state.userData,
  }
}

export default connect(mapStateToProps)(RefreshUserData)
