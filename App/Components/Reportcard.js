import React, { Component } from "react"
import { View } from "react-native"
import styles from "./Styles/InvoiceItemStyle"
import { Colors } from "../Themes"
import RNText from "../Components/RNText"
const uuidV4 = require("uuid/v4")

class ReportCard extends Component {
  state = {
    show: false,
  }

  _renderObject(ObjectTest) {
    return Object.keys(ObjectTest).map((obj, i) => {
        return (
          <View key={uuidV4()} style={[styles.A1C1]}>
          <RNText style={[styles.invoiceText1, { fontSize: 15 }]} text={`${ObjectTest[obj]}`} />
            </View>
        )
    })
}

  render() {

    const { show } = this.state;
    const { id, name } = this.props.item;

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
          {this._renderObject(this.props.item)}
        </View>
      </View>
    )
  }
}

export default ReportCard
