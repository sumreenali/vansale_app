import React, { Component } from "react"
import { View, TouchableOpacity } from "react-native"
import { Colors } from "../Themes"
import RNText from "../Components/RNText"
import { withNavigation } from "react-navigation"
import styles from "./Styles/InvoiceStyle"


class Offers extends Component {
  state = {
    show: false,
  }
  render() {
    const { name, description, expiry } = this.props.item
    console.log(this.props.item);
    return name ? (
      <View style={styles.body}>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("offerItem", { offerItem: this.props.item })}
        style={[
          styles.A1,
          {
            borderWidth: 0.5,
            borderColor: Colors.rootsyPrimary,
          },
        ]}
      >
        <View style={styles.A1C1}>
          <RNText style={styles.invoiceText1} text={`${name}`} />
        </View>

          <View style={styles.A1C1}>
            <RNText style={styles.invoiceText1} text={`${description}`} />
          </View>

        <View style={styles.A1C1}>
          <RNText style={styles.invoiceText1} text={`${expiry}`} />
        </View>
      </TouchableOpacity>
    </View>
    ) : null
  }
}

export default withNavigation(Offers)
