import React, { Component } from "react"
import { View, ScrollView, TouchableOpacity } from "react-native"
import styles from "./Styles/FreezercustomerStyle"
import FreezerSerialClaimList from "./FreezerSerialClaimList"
import RNText from "./RNText"
import AsyncStorage from "@react-native-community/async-storage"
import { Cache } from "react-native-cache"
import { getClaim, getClaimFromCache,getUserFreezerList, getUserFreezerListFromCache  } from "../Redux/Actions/freezerActions"
import { connect } from "react-redux"
import { withNavigation } from "react-navigation"
import { Colors } from "../Themes"
const uuidV4 = require("uuid/v4")

class FreezerSerial extends Component {
  state = {
    serials: [],
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
      dispatch(getClaim(token, {}))
        .then(res => {
          if (res.payload.status) {
            const data = res.payload
            cache.setItem("getClaim", data, err => {})
          }
        })
        .catch(err => {
          cache.getItem("getClaim", function(err, value) {
            if (value) {
              if (value.status === true) {
                dispatch(getClaimFromCache(value))
              }
            }
          })
        })
        dispatch(getUserFreezerList(token, { serial_no: "" }))
        .then(res => {
          console.log('serials....',res)
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
    const { freezerData, freezerSerials } = this.props
    const data = freezerData ? freezerData.package.data : []
    if (this.state.serials.length === 0) {
      var temp = []
      var arrSerials = []
      if (freezerSerials) {
        freezerSerials.package.data.map((item, i) => {
          temp.push(item.items);
          arrSerials = [...arrSerials, ...item.items]
        })
        setTimeout(() => {
          this.setState({ serials: arrSerials })
        }, 200)
      }
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("FreezerClaimFromClaimScreen", {
              data: this.state.serials,
            })
          }}
          style={[
            styles.A1C1,styles.shadowStyle,
            { minWidth: "40%", backgroundColor: Colors.rootsyPrimary, padding: 5 },
          ]}
        >
          <RNText
            style={[styles.invoiceText1, { fontSize: 16, color: Colors.snow }]}
            tx={`freezerScreen.addClaim`}
          />
        </TouchableOpacity>
        <ScrollView style={{ flex: 1, width: "96%" }} showsVerticalScrollIndicator={false}>
          {data.length > 0 ? (
            data.map((item, i) => <FreezerSerialClaimList key={uuidV4()} i={i + 1} item={item} />)
          ) : (
            <View style={{ flex: 1 }}>
              <RNText style={{ textAlign: "center" }} tx={`offerScreen.noData`} />
            </View>
          )}
          <View style={styles.bottomView} />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    freezerData: state.freezerData.claimList,
    freezerSerials: state.freezerData.list,
  }
}

export default connect(mapStateToProps)(withNavigation(FreezerSerial))
