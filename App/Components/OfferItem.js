import React, { Component } from "react"
import { View } from "react-native"
import styles from "./Styles/InvoiceItemStyle"
import { Colors } from "../Themes"
import RNText from "./RNText"

class OfferItem extends Component {
  state = {
    show: false,
  }
  render() {
    const { show } = this.state

    const {  points, quantity, product } = this.props.item
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
          {/* <View style={[styles.A1C1, { flex: 0.6 }]}>
            <RNText style={styles.invoiceText1} text={`${this.props.i}`} />
          </View> */}
          <View style={[styles.A1C1]}>
            <RNText style={[styles.invoiceText1]} text={`${points}`} />
          </View>
          <View style={styles.A1C1}>
            <RNText style={styles.invoiceText1} text={`${quantity}`} />
          </View>
          <View style={styles.A1C1}>
            <RNText style={styles.invoiceText1} text={`${product}`} />
          </View>
        </View>

      </View>
    )
  }
}

export default OfferItem
