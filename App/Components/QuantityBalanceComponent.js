import React, { Component } from "react"
import { View } from "react-native"
import styles from "./Styles/InvoiceItemStyle"
import { Colors } from "../Themes"
import RNText from "../Components/RNText"

class QuantityBalanceComponent extends Component {
  state = {
    show: false,
  }
  render() {
    const { show } = this.state
    const { product, quantity } = this.props.item
    return (
      <View style={styles.body}>
        <View
          style={[
            styles.A1,
            {
              borderWidth: show ? 1 : 0,
              borderBottomWidth: show ? 0 : 1,
              borderColor: Colors.rootsyPrimary,
            },
          ]}
        >
          <View style={[styles.A1C1]}>
            <RNText style={[styles.invoiceText1, { fontSize: 15 }]} text={`${product}`} />
          </View>
          <View style={[styles.A1C1, { flex: 1 }]}>
            <RNText style={[styles.invoiceText1, , { fontSize: 14 }]} text={`${quantity}`} />
          </View>
        </View>
      </View>
    )
  }
}

export default QuantityBalanceComponent
