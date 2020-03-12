import React, { Component } from "react"
import { View, ScrollView } from "react-native"
import styles from "./Styles/FreezercustomerStyle"
import FreezerCard from "./Freezercard"
import RNText from "./RNText"
const uuidV4 = require("uuid/v4")
const data = [
  {
    user: "INV0000000003",
    quantity: "5",
    date: "21 Oct 2019 06:08 pm",
  },
  {
    user: "INV0000000004",
    quantity: "4",
    date: "14 Oct 2019 07:08 pm",
  },
  {
    user: "INV0000000005",
    quantity: "3",
    date: "13 Oct 2019 03:08 pm",
  },
  {
    user: "INV0000000006",
    quantity: "6",
    date: "12 Oct 2019 09:08 pm",
  },
  {
    user: "INV0000000007",
    quantity: "6",
    date: "09 Oct 2019 01:08 pm",
  },
]

export default class Freezercustomer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <RNText tx={"freezerScreen.user"} style={styles.headerText} />
          <RNText tx={"freezerScreen.quantity"} style={styles.headerText} />
          <RNText tx={"freezerScreen.dateTime"} style={styles.headerText} />
        </View>
        <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
          {data.map((item, i) => (
            <FreezerCard key={uuidV4()} item={item} />
          ))}
          <View style={styles.bottomView} />
        </ScrollView>
      </View>
    )
  }
}
