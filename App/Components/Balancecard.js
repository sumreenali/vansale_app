import React, { Component } from "react"
import { View } from "react-native"
import styles from "./Styles/BalancecardStyle"
import RNText from "./RNText"

export default class BalanceCard extends Component {
  render() {
    const { name, quantity } = this.props.data
    return (
      <View style={styles.container}>
        <View style={styles.R1}>
          <RNText tx={"balanceScreen.balanceDataName"} style={styles.text1} text={` : ${name}`} />
        </View>

        <View style={styles.R3}>
          <RNText
            tx={"balanceScreen.balanceDataQty"}
            style={styles.text1}
            text={` : ${quantity}`}
          />
        </View>
      </View>
    )
  }
}
