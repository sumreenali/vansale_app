import React, { Component } from "react"
import { ScrollView, View, AsyncStorage } from "react-native"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import styles from "./Styles/InvoiceSubScreenStyle"
import InvoiceItem from "../Components/InvoiceItem"
const uuidV4 = require("uuid/v4")
import { Colors } from "../Themes"
import { Cache } from "react-native-cache"
import { getDetailsOfInvoice, getPurchaseInvoiceFromCache } from "../Redux/Actions/invoiceActions"

class InvoiceSubScreen extends Component {
  state = {
    data: [],
    id: 0,
  }

  componentDidMount() {
    const data = this.props.navigation.getParam("invoice_items", [])
    const id = this.props.navigation.getParam("id")
    this.setState({
      data: data ? data : [],
      id,
    })
    console.log(this.props.navigation.getParam("id"))

    var cache = new Cache({
      namespace: "FGMM",
      policy: {
        maxEntries: 50000,
      },
      backend: AsyncStorage,
    })
    const { dispatch } = this.props
    cache.getItem("userData", function(err, value) {
      if (value) {
        if (value.status === true) {
          dispatch(
            getDetailsOfInvoice(value.package.token, {
              invoice_id: id,
            }),
          )
            .then(res => {
              console.log(res)
              if (res.payload.status === true) {
                cache.setItem("invoiceIdDetail", res.payload, function(err) {})
              }
            })
            .catch(err => {
              cache.getItem("invoiceIdDetail", function(err, value) {
                if (value) {
                  if (value.status === true) {
                    dispatch(getPurchaseInvoiceFromCache(value))
                  }
                }
              })
            })
        }
      }
    })
  }

  render() {
    const idDetail = this.props.invoiceIdDetail
    let data = {}
    console.log(idDetail)
    if (idDetail !== undefined) {
      data = idDetail.package
    }
    console.log('data..',data)
    const datum = this.props.navigation.getParam("invoice_items", []) || []
    console.log(datum)
    return (
      <View style={styles.body}>
        <View style={[styles.header,{width:'96%'}]}>
          <RNText tx={"invoiceScreen.productId"} style={[styles.headerText, { flex: 0.3 }]} />
          <RNText tx={"invoiceScreen.itemName"} style={[styles.headerText, { flex: 1.7 }]} />
          <RNText tx={"invoiceScreen.itemCode"} style={styles.headerText} />
          <RNText tx={"invoiceScreen.productPrice"} style={styles.headerText} />
          <RNText tx={"invoiceScreen.quantity"} style={[styles.headerText, { flex: 0.5 }]} />
        </View>
        <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
          {34 > 0 ? (
            datum.map((item, i) => <InvoiceItem key={uuidV4()} i={i + 1} item={item} />)
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
              style={[styles.headerText, { fontSize: 18,color:'black' }]}
            />
            <RNText
              text={`${data.total_amount}`}
              style={[styles.headerText, { fontWeight: "normal" }, { fontSize: 16, color: 'black' }]}
            />
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 10,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <RNText tx={"invoiceScreen.TotalPoint"} style={[styles.headerText, { fontSize: 18, color: 'black' }]} />
            <RNText
              text={`${data.points}`}
              style={[styles.headerText, { fontWeight: "normal" }, { fontSize: 16,color:'black' }]}
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
    invoiceIdDetail: state.invoiceData.invoiceIdDetail,
  }
}

export default connect(mapStateToProps)(InvoiceSubScreen)
