import React, { Component } from "react"
import { View } from "react-native"
import styles from "./Styles/InvoiceStyle"
import { Colors } from "../Themes"
import RNText from "../Components/RNText"
import { withNavigation } from "react-navigation"
import Time from "../Helper/Time"

class FreezerSerialClaimList extends Component {
  state = {
    show: false,
  }

  render() {
    const { ticket, description, status, last_updated } = this.props.item
    const regex = /(<([^>]+)>)/gi
    const result = description.replace(regex, "")
    return (
      <View>
        <View
          style={[
            {
              backgroundColor: '#eee',
              borderWidth: 0.5,
              borderColor: Colors.rootsyPrimary,
              marginBottom: 2
            },
          ]}
        >
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 4 }}>
            <View style={{ width: '10%' }}>
              <RNText
                tx={"freezerScreen.id"}
                style={styles.invoiceLabel}
              />
              <RNText style={styles.invoiceText} text={`${this.props.i}`} />
            </View>

            <View style={{ width: '30%' }}>
              <RNText
                tx={"freezerScreen.ticketId"}
                style={styles.invoiceLabel}
              />
              <RNText style={styles.invoiceText} text={`${ticket}`} />
            </View>

            <View >
              <RNText
                tx={"freezerScreen.status"}
                style={styles.invoiceLabel}
              />
              <RNText
                style={[
                  styles.invoiceText,
                  { backgroundColor: status === "Pending" ? "white" : "green", borderRadius: 2, padding: 2 },
                ]}
                text={`${status}`}
              />
            </View>

            <View style={styles.A1C1}>
              <RNText tx={"freezerScreen.lastUpdate"}
                style={styles.invoiceLabel}
              />
              <RNText style={styles.invoiceText} text={`${Time(last_updated)}`} />
            </View>

          </View>


          <View style={{ justifyContent: 'center', alignItems: 'center', margin: 4}}>
            <View>
              <RNText
                tx={"freezerScreen.message"}
                style={styles.invoiceLabel}
              />
              <RNText style={styles.invoiceText} text={`${result}`} />
            </View>
          </View>


        </View>
      </View>
    )
  }
}

export default withNavigation(FreezerSerialClaimList)
