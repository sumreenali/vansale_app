import React, { PureComponent } from "react"
import { View, Dimensions } from "react-native"
import PointsOfferView from "../Components/PointsOfferView"
import TopProductsView from "../Components/TopProductsView"
import { connect } from "react-redux"
import { translate } from "../i18n"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import styles from "./Styles/InvoiceScreenStyle"
import { Cache } from "react-native-cache"
import AsyncStorage from "@react-native-community/async-storage";
import {
    userReport,
    userReportFromCache,
    userReportTitle,
    userReportTitleFromCache,
  } from "../Redux/Actions/reportAction"

class ReportsScreen extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: "PointsOffer", title: translate("reportScreen.PointsOffer") },
      { key: "TopProductsCustomers", title: translate("reportScreen.TopProductsCustomers") },
    ],
    token: null,
    customer_id: 0,
    user: null,
  }

  componentDidMount() {
    const { userData, dispatch } = this.props

    var cache = new Cache({
      namespace: "FGMM",
      policy: {
        maxEntries: 50000,
      },
      backend: AsyncStorage,
    })

    if (userData) {
      this.setState(
        {
          token: userData.package.token,
        },
        () => {
          dispatch(userReportTitle(this.state.token, "amazon"))
            .then(res => {
              if (res.payload.status) {
                this.setState(
                  {
                    reportId: res.payload.package.data[0].id,
                  },
                  () => {
                    dispatch(userReport(this.state.token, { id: this.state.reportId }))
                      .then(res => {
                        if (res.payload.status === true) {
                          var reportData = res.payload
                          cache.setItem("userReport", reportData, err => {})
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
                        console.log(err)
                      })
                  },
                )
                const data = res.payload
                cache.setItem("userReportTitle", data, err => {})
              }
            })
            .catch(err => {
              cache.getItem("userReportTitle", function(err, value) {
                if (value) {
                  if (value.status === true) {
                    dispatch(userReportTitleFromCache(value))
                  }
                }
              })
              console.log(err)
            })
        },
      )
    }
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
            PointsOffer: PointsOfferView,
            TopProductsCustomers: TopProductsView,
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
      reportData: state.reportData,
      userData: state.userData.data,
    }
  }

export default connect(mapStateToProps)(ReportsScreen)
