import React, { Component } from "react"
import { View, TouchableOpacity } from "react-native"
import styles from "./Styles/InvoiceItemStyle"
import { Colors } from "../Themes"
import RNText from "../Components/RNText"
import AsyncStorage from "@react-native-community/async-storage"
import { Cache } from "react-native-cache"
import { getUserFreezerList, getUserFreezerListFromCache } from "../Redux/Actions/freezerActions"
import { connect } from "react-redux"
const uuidV4 = require("uuid/v4")
import { withNavigation } from "react-navigation"


class FreezerClaimGroupComponent extends Component {
  state = {
    show: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    var cache = new Cache({
      namespace: "FGMM",
      policy: {
        maxEntries: 50000,
      },
      backend: AsyncStorage,
    })
    cache.getItem("userData", (err, value) => {
      const token = value.package.token
      dispatch(getUserFreezerList(token, { serial_no: "" }))
        .then(res => {
          if (res.payload.status === true) {
            cache.setItem("freezerList", res.payload, function(err) {})
          }
        })
        .catch(err => {
          cache.getItem("freezerList", function(err, value) {
            if (value) {
              if (value.status === true) {
                dispatch(getUserFreezerListFromCache(value))
              }
            }
          })
        })
    })
  }

  render() {
    const { list } = this.props.state.freezerData
    let data = []

    if (list !== undefined) {
      data = list.package.data
    }
    return (
      <View style={styles.body}>
          <View style={[styles.header,{ width:'100%',marginTop: 12 }]}>
          {/* <RNText tx={"invoiceScreen.invoiceReference"} style={styles.headerText} /> */}
          <RNText tx={"freezerScreen.groupCode"} style={styles.headerText} />
          <RNText tx={"freezerScreen.quantity"} style={styles.headerText} />

        </View>
        {data.length > 0 ? (
          data.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("FreezerClaimGroupListsComponent", {
                    data: item.items,
                  })
                }
                key={i * i * i * i}
                style={[
                  styles.A1,
                  {
                    borderWidth: 0.5,
                    borderColor: Colors.rootsyPrimary,
                    marginBottom: 3,
                  },
                ]}
              >
                <View style={[styles.A1C1, { flex: 1 }]}>
                  <RNText
                    style={[styles.invoiceText1, { fontSize: 15 }]}
                    text={`${item.freezer_group}`}
                  />
                </View>
                <View style={[styles.A1C1, { flex: 1 }]}>
                  <RNText
                    style={[styles.invoiceText1, { fontSize: 15 }]}
                    text={`${item.quantity}`}
                  />
                </View>
              </TouchableOpacity>
            )
          })
        ) : (
          <View style={{ flex: 1 }}>
            <RNText style={{ textAlign: "center" }} tx={`offerScreen.noData`} />
          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return { state }
}

export default connect(mapStateToProps)(withNavigation(FreezerClaimGroupComponent))
