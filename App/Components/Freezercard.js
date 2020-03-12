import React, { Component } from "react"
import { View, TouchableOpacity } from "react-native"
import styles from "./Styles/InvoiceStyle"
import { Colors } from "../Themes"
import RNText from "../Components/RNText"
import { withNavigation } from "react-navigation"

class FreezerCard extends Component {
  state = {
    show: false,
  }
  render() {
    const { show } = this.state
    const { user, quantity, date } = this.props.item
    return (
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("FreezerClaimList")}
          style={[
            styles.A1,
            {
              borderWidth: show ? 1 : 0,
              borderBottomWidth: show ? 0 : 1,
              borderColor: Colors.rootsyPrimary,
            },
          ]}
        >
          <View style={styles.A1C1}>
            <RNText style={styles.invoiceText1} text={`${user}`} />
          </View>
          <View style={styles.A1C1}>
            <RNText style={styles.invoiceText1} text={`${quantity}`} />
          </View>
          <View style={styles.A1C1}>
            <RNText style={styles.invoiceText1} text={`${date}`} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withNavigation(FreezerCard)
