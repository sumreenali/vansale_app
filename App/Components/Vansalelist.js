import React, { Component } from "react"
import { View, TouchableOpacity, Linking } from "react-native"
import styles from "./Styles/InvoiceItemStyle"
import { Colors } from "../Themes"
import RNText from "../Components/RNText"

class VansaleList extends Component {
  state = {
    show: false,
  }

  performAction = () => {
    console.log("the total amount is ",this.state.totalAmount)
    return (this.props.code)
  }
  render() {
    const { name, phone , code , date} = this.props.item
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
          {/* <View style={[styles.A1C1, { flex: 1 }]}>
            <RNText style={styles.invoiceText1} text={`${this.props.reg_id}`} />
          </View> */}

          
          <View style={[styles.A1C1, { flex: 1 }]}>
            <RNText style={styles.invoiceText1} text={`${name}`} />
          </View>
          {/* <View style={styles.A1C1}>
            <RNText style={styles.invoiceText1} text={`${email}`} />
          </View> */}
          <View style={[styles.A1C1, { flex: 1 }]}>
            <TouchableOpacity style={styles.C1} onPress={() => Linking.openURL(`tel:${phone}`)}>
              <RNText style={[styles.invoiceText1]} text={`${phone}`} />
            </TouchableOpacity>
          </View>

          <View style={[styles.A1C1, { flex: 1 }]}>
            <RNText style={[styles.invoiceText1]} text={`${code}`} />
          </View>

          <View style={[styles.A1C1, { flex: 1 }]}>
            <RNText style={[styles.invoiceText1]} text={`${date}`} />
          </View>
          <View style={[styles.A1C1, { flex: 0.8 }]}>
            <TouchableOpacity>
              <RNText style={[styles.invoiceText1]} tx={`vanSaleScreen.RedeemPoint`} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default VansaleList
