import React, { Component } from "react"
import { View, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import styles from "./Styles/BalanceScreenStyle"
import { Colors } from "../Themes"
import Icon from "react-native-vector-icons/AntDesign"
import {
  getBalance,
  getBalanceFromCache,
  getPointHistory,
  getPointHistoryFromCache,
} from "../Redux/Actions/balanceActions"
import AsyncStorage from "@react-native-community/async-storage"
import { Cache } from "react-native-cache"

class BalanceScreen extends Component {
  componentDidMount() {
    const { dispatch, userData } = this.props

    dispatch(
      getBalance((token = userData.data.package.token), {
        customer_id: userData.data.package.id,
      }),
    )
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
          cache.setItem("balanceData", res.payload, function(err) {})
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
        cache.getItem("balanceData", function(err, value) {
          if (value) {
            if (value.status === true) {
              dispatch(getBalanceFromCache(value))
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
        console.log(res)
        if (res.payload.status === true) {
          console.log(res)
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
    const { balanceData } = this.props

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.body}>
          <View style={styles.C1}>
            <RNText tx={"balanceScreen.pointBalance"} style={styles.text} />
          </View>
          <View style={styles.C1}>
            <RNText
              text={`${balanceData ? balanceData.package.points_balance : 0}`}
              style={styles.text}
            />
          </View>
          <View style={styles.C2}>
            <Icon
              size={25}
              onPress={() => this.props.navigation.navigate("pointBalance", { index: 1 })}
              name="eye"
              color={Colors.rootsyPrimary}
            />
          </View>
        </View>

        {/* <View style={styles.body}>
          <View style={styles.C1}>
            <RNText tx={"balanceScreen.moneyBalance"} style={styles.text} />
          </View>
          <View style={styles.C1}>
            <RNText
              text={`${balanceData ? balanceData.package.money_balance : "0 IQD"}`}
              style={styles.text}
            />
          </View>
          <View style={styles.C2}></View>
        </View>

        <TouchableOpacity
          style={styles.body}
          onPress={() => this.props.navigation.navigate("QuantityBalanceScreen")}
        > */}
        {/* <View style={styles.C1}>
            <RNText tx={"balanceScreen.quantutyBalance"} style={styles.text} />
          </View>
          <View style={styles.C1}>
            <RNText text={`${balanceData? balanceData.package.quantity_balance_amount: "N/A"}`} style={styles.text} />
          </View>
          <View style={styles.C2}>
            <Icon
              size={25}
              onPress={() => this.props.navigation.navigate("QuantityBalanceScreen")}
              name="eye"
              color={Colors.rootsyPrimary}
            />
          </View>
        </TouchableOpacity> */}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return { userData: state.userData, balanceData: state.balanceData.data }
}
export default connect(mapStateToProps)(BalanceScreen)
