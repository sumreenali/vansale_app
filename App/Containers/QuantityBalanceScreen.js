import React, { Component } from "react"
import { ScrollView, View } from "react-native"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import styles from "./Styles/InvoiceSubScreenStyle"
import QuantityBalanceComponent from "../Components/QuantityBalanceComponent"
const uuidV4 = require("uuid/v4")
class QuantityBalanceScreen extends Component {
  render() {
    const { balanceData } = this.props
    return (
      <View style={styles.body}>
        <View style={[styles.header, { backgroundColor: "#fff" }]}>
          <RNText
            tx={"balanceScreen.quantutyBalance"}
            style={[styles.headerText, { fontSize: 17 }]}
          />
        </View>
        <View style={styles.header}>
          <RNText tx={"balanceScreen.product"} style={styles.headerText} />
          <RNText tx={"balanceScreen.balanceDataQty"} style={[styles.headerText, { flex: 0.5 }]} />
        </View>
        <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
          {(balanceData ? balanceData.package.quantity_balance : []).map((item, i) => (
            <QuantityBalanceComponent key={uuidV4()} item={item} />
          ))}
          <View style={styles.bottomView} />
        </ScrollView>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return { userData: state.userData, balanceData: state.balanceData.data }
}
export default connect(mapStateToProps)(QuantityBalanceScreen)
