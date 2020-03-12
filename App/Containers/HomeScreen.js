import React, { Component } from "react"
import { ScrollView, SafeAreaView, StatusBar, View, TouchableOpacity, Image } from "react-native"
import { connect } from "react-redux"
import { Screen } from "../Themes/index"
import RNText from "../Components/RNText"
import { toggleLocale } from "../Redux/Actions/locale"
import styles from "./Styles/HomeScreenStyle"
import { Colors } from "../Themes"
import { PermissionsAndroid } from "react-native"
const uuidV4 = require("uuid/v4")
import { Images } from "../Themes";
import BluetoothPrinter from '../Components/BluetoothPrinter'

class HomeScreen extends Component {
  state = {
    languageTag: "en",
    artist: [],
    tag: "interested",
    tabs: [
      {
        name: "homeScreen.saleTitle",
        nav: "InvoiceScreen",
        icon: Images.invoice
      },
      {
        name: "homeScreen.purchasingTitle",
        nav: "PurchaseScreen",
        icon: Images.invoice

      },
      {
        name: "homeScreen.freezerTitle",
        nav: "FreezerScreen",
        icon: Images.freezers
      },
      {
        name: "homeScreen.stockTitle",
        nav: "StockScreen",
        icon: Images.invoice
      },
      {
        name: "homeScreen.balanceTitle",
        nav: "BalanceScreen",
        icon: Images.points
      },
      {
        name: "homeScreen.offerTitle",
        nav: "OfferScreen",
        icon: Images.offer
      },
      {
        name: "homeScreen.vanSaleTitle",
        nav: "VansaleScreen",
        icon: Images.vanSale
      },
      // {
      //   name: "homeScreen.reportTitle",
      //   nav: "ReportScreen",
      //   icon: Images.report
      // },
      {
        name: "homeScreen.profileTitle",
        nav: "ProfileScreen",
        icon: Images.profile
      },
      {
        name: "homeScreen.aboutTitle",
        nav: "AboutAppScreen",
        icon: Images.about
      },
    ],
  }

  toggleLocale = val => {
    this.props.dispatch(toggleLocale(val))
  }

  componentDidMount() {
    requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ],
          {
            title: "FGMM Storage Permission",
            message: "FGMM app want to use your local storage" + "to download some report.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera")
        } else {
          console.log("Camera permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }

    requestCameraPermission();
  }

  render() {
    const { tabs } = this.state
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.rootsyPrimary} />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              width: "96%",
              flexWrap: "wrap",
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 12,
            }}
          >
            {tabs.map((item, i) => (
              <TouchableOpacity
                key={uuidV4()}
                style={ [ {    width: Screen.width * 0.4,
                  height: Screen.width * 0.25,
                  margin: Screen.width * 0.035,
                  justifyContent: "center",
                  alignItems: "center"},styles.shadowStyle]}
                onPress={() => this.props.navigation.navigate(`${item.nav}`)}
              >
                <Image source={item.icon} style={{ width: 50, height: 50, padding: 5 }} resizeMode={"cover"} />
                <RNText tx={item.name} style={{ fontSize: 20, color: Colors.rootsyPrimary, marginTop: 10 }} />
              </TouchableOpacity>
            ))}
            
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    locale: state.locale,
    userData: state.userData.data,
  }
}

export default connect(mapStateToProps)(HomeScreen)
