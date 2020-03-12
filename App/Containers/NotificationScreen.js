import React, { Component } from "react"
import { View, ScrollView, ActivityIndicator } from "react-native"
import { connect } from "react-redux"
import styles from "./Styles/NotificationScreenStyle"
import RNText from "../Components/RNText"
import { Cache } from "react-native-cache"
import AsyncStorage from "@react-native-community/async-storage"
import { getNotification, getNotificationFromCache } from "../Redux/Actions/notificationActions"
import { Colors } from "../Themes"

const uuidV4 = require("uuid/v4")
class NotificationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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

        dispatch(getNotification(token, { customer_id }))
          .then(res => {
            if (res.payload.status === true) {
              var cache = new Cache({
                namespace: "FGMM",
                policy: {
                  maxEntries: 50000,
                },
                backend: AsyncStorage,
              })
              cache.setItem("notificationData", res.payload, function(err) {})
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
            cache.getItem("notificationData", function(err, value) {
              if (value) {
                if (value.status === true) {
                  dispatch(getNotificationFromCache(value))
                }
              }
            })
          })
      },
    )
  }

  render() {
    const { notificationData } = this.props
    const dataLength = notificationData ? notificationData.package.data.length : null
    const data = notificationData ? notificationData.package.data : []
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {data.length ? (
            data.map((item, i) => (
              <View
                key={uuidV4()}
                style={[
                  styles.body,
                  { backgroundColor: item.read ? Colors.rootsyOffOrange4 : "#eee" },
                ]}
              >
                <View style={styles.C1}>
                  <RNText style={styles.titleText} text={item.message} />
                  <RNText style={styles.text} text={item.human_date} />
                </View>
              </View>
            ))
          ) : dataLength === null ? (
            <View style={{ flex: 1 }}>
              <ActivityIndicator size={"small"} color={Colors.rootsyPrimary} />
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <RNText style={{ textAlign: "center" }} tx={`common.noData`} />
            </View>
          )}
          <View style={styles.bottomView} />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return { userData: state.userData, notificationData: state.notificationData.data }
}

export default connect(mapStateToProps)(NotificationScreen)
