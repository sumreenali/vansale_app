import React, { Component } from "react"
import { ScrollView, View, AsyncStorage } from "react-native"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import styles from "./Styles/InvoiceSubScreenStyle"
import InvoiceItem from "../Components/InvoiceItem"
const uuidV4 = require("uuid/v4")
import { Colors } from "../Themes"


class InvoiceReturnSubScreen extends Component {
  state = {
    data: [],
    amount: 0
  }

  componentDidMount() {
    const data = this.props.navigation.getParam("invoice_items", [])
    const amount = this.props.navigation.getParam("amount");
    this.setState({
      data,
      amount
    })
    console.log(this.props.navigation.getParam("amount"))
  }

  render() {
    const idDetail = this.props.invoiceIdDetail;
    let data = {};
    if (idDetail !== undefined) {
      data = idDetail.package
    }
    console.log(data)

    const { amount } = this.state;
    return (
      <View style={styles.body}>
        <View style={styles.header}>
          <RNText tx={"invoiceScreen.productId"} style={[styles.headerText, { flex: 0.3 }]} />
          <RNText tx={"invoiceScreen.itemName"} style={[styles.headerText, { flex: 1.7 }]} />
          <RNText tx={"invoiceScreen.itemCode"} style={styles.headerText} />
          <RNText tx={"invoiceScreen.productPrice"} style={styles.headerText} />
          <RNText tx={"invoiceScreen.quantity"} style={[styles.headerText, { flex: 0.5 }]} />
        </View>
        <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
          {this.state.data.length > 0 ? (
            this.state.data.map((item, i) => <InvoiceItem key={uuidV4()} i={i + 1} item={item} />)
          ) : (
            <View style={{ flex: 1 }}>
              <RNText tx={`common.noData`} style={{ textAlign: "center" }} />
            </View>
          )}
          <View
            style={{
              width: "100%",
              borderTopColor: Colors.rootsyPrimary,
              borderTopWidth: 5,
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 10,
              paddingTop: 20,
              paddingBottom: 10,
            }}
          >
            <RNText
              tx={"invoiceScreen.TotalAmount"}
              style={[styles.headerText, { fontSize: 18, color: 'black' }]}
            />
            <RNText
              text={`${amount}`}
              style={[styles.headerText, { fontWeight: "normal" }, { fontSize: 16, color: 'black' }]}
            />
          </View>
          <View style={styles.bottomView} />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    invoiceIdDetail: state.invoiceData.invoiceIdDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps
)(InvoiceReturnSubScreen)
