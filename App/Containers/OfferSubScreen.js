import React, { Component } from "react"
import { ScrollView, View, AsyncStorage } from "react-native"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import styles from "./Styles/InvoiceSubScreenStyle"
const uuidV4 = require("uuid/v4")
import { Cache } from "react-native-cache"
import { getDetailsOfInvoice, getPurchaseInvoiceFromCache } from "../Redux/Actions/invoiceActions"
import OfferItem from "../Components/OfferItem"

class OfferSubScreen extends Component {
  state = {
    data: {},
    id: 0
  }

  componentDidMount() {
    const data = this.props.navigation.getParam("offerItem",{})
    this.setState({
      data
    })
    console.log(this.props.navigation.getParam("offerItem"))

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
              invoice_id: 8,
            }),
          )
            .then(res => {
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
    const idDetail = this.state.data;
    let data = [];
    if (idDetail.hasOwnProperty("items")) {
      data = idDetail.items.data;
    }

    console.log(data)
    return (
      <View style={styles.body}>
        <View style={styles.header}>
          {/* <RNText tx={"invoiceScreen.productId"} style={[styles.headerText, { flex: 0.3 }]} /> */}
          <RNText tx={"offerScreen.points"} style={[styles.headerText]} />
          <RNText tx={"offerScreen.quantity"} style={[styles.headerText]} />
          <RNText tx={"offerScreen.product"} style={styles.headerText} />
        </View>
        <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
          {data.length > 0 ? (
            data.map((item, i) => <OfferItem key={uuidV4()} i={i + 1} item={item} />)
          ) : (
            <View style={{ flex: 1 }}>
              <RNText tx={`common.noData`} style={{ textAlign: "center" }} />
            </View>
          )}
          {/* <View
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
              style={[styles.headerText, { fontSize: 18 }]}
            />
            <RNText
              text={`${data.total_amount}`}
              style={[styles.headerText, { fontWeight: "normal" }, { fontSize: 16 }]}
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
            <RNText tx={"invoiceScreen.TotalPoint"} style={[styles.headerText, { fontSize: 20 }]} />
            <RNText
              text={`${data.points}`}
              style={[styles.headerText, { fontWeight: "normal" }, { fontSize: 16 }]}
            />
          </View> */}
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
)(OfferSubScreen)
