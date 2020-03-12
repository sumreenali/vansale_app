import React, { Component } from "react"
import { View } from "react-native"
import styles from "./Styles/InvoiceItemStyle"
import { Colors } from "../Themes"
import RNText from "../Components/RNText"

class StockList extends Component {
  state = {
    show: false,
  }
  render() {
    const { show } = this.state
    const { name, id, code, quantity } = this.props.item
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
          <View style={[styles.A1C1, { flex: 2 }]}>
            <RNText style={styles.invoiceText1} text={`${id}`} />
          </View>
          <View style={[styles.A1C1, { flex: 2.4 }]}>
            <RNText style={[styles.invoiceText1]} text={`${code}`} />
          </View>
          <View style={[styles.A1C1, { flex: 2.4 }]}>
            <RNText style={[styles.invoiceText1]} text={`${quantity}`} />
          </View>
        </View>
      </View>
    )
  }
}

export default StockList
