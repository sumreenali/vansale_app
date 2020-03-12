import React, { Component } from "react"
import { ScrollView, View } from "react-native"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import styles from "./Styles/InvoiceSubScreenStyle"
import FreezerClaimListComponent from "../Components/FreezerClaimList"
const uuidV4 = require("uuid/v4")

const data = [
  {
    id: 1,
    serialNumber: "FGMMR000565",
    quantity: 1,
  },
]

class FreezerClaimList extends Component {
  render() {
    return (
      <View style={styles.body}>
        <ScrollView 
        style={
          { 
            flex: 1, 
            width: "100%" 
            }
          } showsVerticalScrollIndicator={false}>
          {data.map((item, i) => (
            <FreezerClaimListComponent key={uuidV4()} item={item} />
          ))}
          <View style={styles.bottomView} />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {}
}


export default connect(
  mapStateToProps,
)(FreezerClaimList)
