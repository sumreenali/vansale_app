import React, { PureComponent } from "react"
import { View, Dimensions } from "react-native"
import { connect } from "react-redux"
import OffersComponent from "../Components/OffersComponent"
import OffersPointHistoryComponent from "../Components/OffersPointHistoryComponent"
import { translate } from "../i18n"
import {
  getPointOffers,
  getPointOffersFromCache,
  getPointHistory,
  getPointHistoryFromCache,
} from "../Redux/Actions/balanceActions"
import { Cache } from "react-native-cache"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import styles from "./Styles/InvoiceScreenStyle"
import AsyncStorage from "@react-native-community/async-storage"

class OfferScreen extends PureComponent {
  state = {
    index: this.props.navigation.getParam("index", 0) || 0,
    routes: [
      { key: "offers", title: translate("offerScreen.offers") },
      { key: "pointhistory", title: translate("offerScreen.pointHistory") },
    ],
  }
  componentDidMount() {
    const index = this.props.navigation.getParam("index", 0)
    this.setState({ index: parseInt(index) })

    const { dispatch, userData } = this.props

    dispatch(
      getPointOffers((token = userData.data.package.token), {
        customer_id: userData.data.package.id,
      }),
    )
      .then(res => {
        if (res.payload.status === true) {
          var cache = new Cache({
            namespace: "FGMM",
            policy: {
              maxEntries: 50000,
            },
            backend: AsyncStorage,
          })
          cache.setItem("offerData", res.payload, function(err) {})
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
        cache.getItem("offerData", function(err, value) {
          if (value) {
            if (value.status === true) {
              dispatch(getPointOffersFromCache(value))
            }
          }
        })
      })

    dispatch(
      getPointHistory((token = userData.data.package.token), {
        customer_id: userData.data.package.id,
      }),
    )
      .then(res => {
        if (res.payload.status === true) {
          var cache = new Cache({
            namespace: "FGMM",
            policy: {
              maxEntries: 50000,
            },
            backend: AsyncStorage,
          })
          cache.setItem("pointHistoryData", res.payload, function(err) {})
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
        cache.getItem("pointHistoryData", function(err, value) {
          if (value) {
            if (value.status === true) {
              dispatch(getPointHistoryFromCache(value))
            }
          }
        })
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
            offers: OffersComponent,
            pointhistory: OffersPointHistoryComponent,
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
    balanceData: state.balanceData.pointBalance,
    pointHistory: state.balanceData.pointHistory,
  }
}

export default connect(mapStateToProps)(OfferScreen)
