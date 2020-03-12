import React, { Component } from "react"
import { View } from "react-native"
import styles from "./Styles/InvoiceItemStyle"
import { Colors } from "../Themes"
import RNText from "../Components/RNText"

class InvoiceItem extends Component {
  state = {
    show: false,
  }
  render() {
    const { show } = this.state

    const { item_name, item_code, product_price, quantity } = this.props.item
    return (
      <View style={styles.body}>
        <View
          style={[
            styles.A1,
            {
              borderWidth: 0.5,
              borderColor: Colors.rootsyPrimary,
            },
          ]}
        >
          <View style={[styles.A1C1, { flex: 0.6 }]}>
            <RNText style={styles.invoiceText1} text={`${this.props.i}`} />
          </View>
          <View style={[styles.A1C1, { flex: 3.4 }]}>
            <RNText style={[styles.invoiceText1, { fontSize: 13 }]} text={`${item_name}`} />
          </View>
          <View style={styles.A1C1}>
            <RNText style={styles.invoiceText1} text={`${item_code}`} />
          </View>
          <View style={styles.A1C1}>
            <RNText style={styles.invoiceText1} text={`${product_price}`} />
          </View>
          <View style={[styles.A1C1, { flex: 1 }]}>
            <RNText style={styles.invoiceText1} text={`${quantity}`} />
          </View>
        </View>

      </View>
    )
  }
}

export default InvoiceItem
