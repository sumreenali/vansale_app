import React, { Component } from "react"
import { View, TouchableOpacity } from "react-native"
import styles from "./Styles/InvoiceItemStyle"
import { Colors } from "../Themes"
import RNText from "../Components/RNText"
import { connect } from "react-redux"
import { withNavigation } from "react-navigation"
import Time from "../Helper/Time"

class FreezerClaimListComponent extends Component {
  state = {
    show: false,
    data: [],
  }

  componentDidMount() {
    const data = this.props.navigation.getParam("data", [])
    this.setState({
      data,
    })
  }

  render() {
    const { data } = this.state
    return (
      <View style={styles.body}>
        <View style={[styles.header,{ width:'100%' }]}>
          {/* <RNText tx={"invoiceScreen.invoiceReference"} style={styles.headerText} /> */}
          <RNText tx={"freezerScreen.serialNumber"} style={styles.headerText} />
          <RNText tx={"freezerScreen.date"} style={styles.headerText} />
          <RNText tx={"freezerScreen.claim"} style={{ ...styles.headerText, ...{ flex: 0.35 } }} />
        </View>
        {data.length > 0 ? (
          data.map((item, i) => {
            return (
              <View
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
                    text={`${item.serial_no}`}
                  />
                </View>

                <View style={[styles.A1C1, { flex: 1 }]}>
                  <RNText
                    style={[styles.invoiceText1, { fontSize: 15 }]}
                    text={`${Time(item.created_at)}`}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("FreezerClaimScreen", {
                      serialNumber: item.serial_no,
                    })
                  }}
                  style={[
                    styles.A1C1,
                    styles.shadowStyle,
                    { flex: 0.30,height:30,justifyContent:'center',margin: 8, backgroundColor: Colors.rootsyPrimary, padding: 5 },
                  ]}
                >
                  <RNText
                    style={[styles.invoiceText1, { fontSize: 12, color: Colors.snow }]}
                    text={`Claim`}
                  />
                </TouchableOpacity>
              </View>
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

export default connect(mapStateToProps)(withNavigation(FreezerClaimListComponent))
