import React, { Component } from "react"
import { View, TouchableOpacity, Alert } from "react-native"
import styles from "./Styles/InvoiceStyle"
import { Colors } from "../Themes"
import RNText from "../Components/RNText"
import { withNavigation } from "react-navigation"
import { connect } from "react-redux"
import Time from "../Helper/Time"
import { updateRedeemAction } from "../Redux/Actions/balanceActions"

class OffersPH extends Component {
  state = {
    show: false,
  }

  updateRedeem = (actionData, id) => {
    const { dispatch, userData } = this.props
    const data = {
      id: id,
      action: actionData,
    }
    dispatch(updateRedeemAction(userData.data.package.token, data))
      .then(res => {
        if (res.payload.status) {
          Alert.alert("Successfully updated.")
          this.props.filter()
          console.log(res)
        } else {
          Alert.alert(" Unable to update.")
        }
      })
      .catch(err => {
        Alert.alert(" Unable to update.")
        console.log(err)
      })
  }

  render() {
    const { show } = this.state
    const { invoice_reference, id, points, rate, amount, redeemed, created_at } = this.props.item
    console.log(this.props.item)
    const action = this.props
    const actionBtn = redeemed === "Yes" || redeemed === "No"
    // this.props.actionBtn(redeemed);
    return (
      <View>
        <View
          style={[
            {
              backgroundColor: '#eee',
              borderWidth: 0.5,
              borderColor: Colors.rootsyPrimary,
              marginBottom:2
            },
          ]}
        >

          <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 4 }}>
            <View>
              <RNText
                tx={"invoiceScreen.invoiceReference"}
                style={styles.invoiceLabel}
              />
              <RNText style={styles.invoiceText} text={`${invoice_reference}`} />
            </View>

            <View>
              <RNText tx={"offerScreen.points"}
                style={styles.invoiceLabel} />
              <RNText
                style={styles.invoiceText}
                text={`${points}`}
              />
            </View>

            <View>
              <RNText tx={"offerScreen.rate"}
                style={styles.invoiceLabel} />
              <RNText style={styles.invoiceText} text={`${rate}`} />
            </View>

            <View>
              <RNText tx={"offerScreen.amount"}
                style={styles.invoiceLabel} />
              <RNText style={styles.invoiceText} text={`${amount}`} />
            </View>
          </View>



          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 4 }}>
            <View>
              <RNText tx={"offerScreen.date"}
                style={styles.invoiceLabel} />
              <RNText style={styles.invoiceText} text={`${Time(created_at)}`} />
            </View>

            <View style={{ alignItems: 'center'}}>
              <RNText tx={"offerScreen.redeemed"}
                style={styles.invoiceLabel} />
              <View
                style={[
                  styles.shadowStyle,
                  {
                    marginTop: 8,
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      redeemed === "Yes" ? "#fc4b6c" : redeemed !== "No" ? "#ffb22b" : "#26c6da",
                    height: 31.5,
                    alignSelf: "center",
                    borderRadius: 2.5,
                  },
                ]}
              >
                <RNText style={{ color: 'white', fontSize: 12 }} text={`${redeemed}`} />
              </View>
            </View>


            <View style={{ alignItems: 'center' }}>
              {action && !actionBtn && (
                <RNText tx={"offerScreen.action"}
                  style={styles.invoiceLabel} />
              )}

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                {action && !actionBtn && (
                  <TouchableOpacity
                    onPress={() => {
                      this.updateRedeem("accept", id)
                    }}
                    style={[
                      styles.shadowStyle,
                      {
                        marginTop: 8,
                        width: 70,
                        backgroundColor: "#26c6da",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRightWidth: 1,
                        borderRightColor: "#fff",
                        height: 31.5,
                        alignSelf: "center",
                      },
                    ]}
                  >
                    <RNText style={{ color: "#eee", fontSize: 12 }} text="Accept" />
                  </TouchableOpacity>
                )}
                {action && !actionBtn && (
                  <TouchableOpacity
                    onPress={() => {
                      this.updateRedeem("deny", id)
                    }}
                    style={[styles.shadowStyle,
                      {
                        marginTop: 8,
                        width: 70,
                        backgroundColor: "#fc4b6c",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 31.5,
                        alignSelf: "center",
                      },
                    ]}
                  >
                    <RNText style={{ color: "#eee", fontSize: 12 }} text="Denied" />
                  </TouchableOpacity>
                )}
              </View>
            </View>




          </View>



        </View>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    userData: state.userData,
    balanceData: state.balanceData.pointBalance,
    pointHistory: state.balanceData.pointHistory,
  }
}

export default connect(mapStateToProps)(withNavigation(OffersPH))
