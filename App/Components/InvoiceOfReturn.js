import React, { Component } from "react"
import { View, TouchableOpacity } from "react-native"
import styles from "./Styles/InvoiceStyle"
import { Colors } from "../Themes"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import { withNavigation } from "react-navigation"
import Time from "../Helper/Time"

class Invoice extends Component {
  state = {
    show: false,
  }

  getTime = date => {
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var ampm = hours >= 12 ? "pm" : "am"
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes
    var strTime = hours + ":" + minutes + " " + ampm
    return strTime
  }

  render() {
    const { show } = this.state
    const { invoice_reference, vendor, amount, created_at, invoice_items, id } = this.props.item
    const { returnInvoice } = this.props

    console.log(this.props.item)

    return (
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("InvoiceReturnSubScreen", { invoice_items, amount })
          }
          style={[
            styles.A1,
            {
              borderWidth: 0.5,
              borderColor: Colors.rootsyPrimary,
            },
          ]}
        >
          <View style={styles.A1C1}>
            <RNText style={styles.invoiceText1} text={`${invoice_reference}`} />
          </View>

          <View style={styles.A1C1}>
            <RNText style={styles.invoiceText1} text={`${vendor}`} />
          </View>

          <View style={styles.A1C1}>
            <RNText style={styles.invoiceText1} text={`${amount}`} />
          </View>

          <View style={styles.A1C1}>
            <RNText style={styles.invoiceText1} text={`${Time(created_at)}`} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Invoice))
