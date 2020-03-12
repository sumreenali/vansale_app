import React, { PureComponent } from "react"
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  DrawerItems,
} from "react-navigation"
import { translate } from "../i18n"
import HomeScreen from "../Containers/HomeScreen"
import LaunchScreen from "../Containers/LaunchScreen"
import LoginScreen from "../Containers/LoginScreen"
import ResetPassword from "../Containers/ResetPasswordScreen"
import AboutAppScreen from "../Containers/AboutAppScreen"
import NotificationScreen from "../Containers/NotificationScreen"
import InvoiceSubScreen from "../Containers/InvoiceSubScreen"
import FreezerClaimScreen from "../Containers/FreezerClaimScreen"
import FreezerClaimFromClaimScreen from "../Containers/FreezerClaimFromClaimScreen"
import QuantityBalanceScreen from "../Containers/QuantityBalanceScreen"
import LogoutScreen from "../Containers/LogoutScreen"
import ProfileScreen from "../Containers/ProfileScreen"
import BluetoothPrinter from '../Components/BluetoothPrinter'

//New screens Added

import PurchaseScreen from "../Containers/PurchaseScreen"
import StockScreen from "../Containers/StockScreen"

import BalanceScreen from "../Containers/BalanceScreen"
// import ReportScreen from "../Containers/ReportScreen"
import ReportScreenDetails from "../Containers/ReportScreenDetails"
import FreezerScreen from "../Containers/FreezerScreen"
import VansaleScreen from "../Containers/VansaleScreen"
import InvoiceScreen from "../Containers/InvoiceScreen"
import OfferScreen from "../Containers/OfferScreen"
import FreezerClaimList from "../Containers/FreezerClaimList"
import FreezerClaimGroupComponent from "../Components/FreezerClaimGroupComponent"
import RNText from "../Components/RNText"
import styles from "../Themes/ApplicationStyles"
import {
  View,
  ScrollView,
  Image,
  Platform,
  Text,
  Alert,
  I18nManager,
  TouchableOpacity,
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from "@react-native-community/async-storage"
import FontAwesomIcon from "react-native-vector-icons/FontAwesome"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { Images, Colors } from "../Themes"
import NetInfo from "@react-native-community/netinfo"
import RNRestart from "react-native-restart"
import RefreshUserData from "../Containers/RefreshUserData"
import FreezerClaimListComponent from "../Components/FreezerClaimList"
import OffersComponent from "../Components/OffersComponent"
import OffersPointHistoryComponent from "../Components/OffersPointHistoryComponent"
import OfferSubScreen from "../Containers/OfferSubScreen"
import InvoiceReturnSubScreen from "../Containers/InvoiceReturnSubScreen"
import ReturnInvoiceDetail from "../Components/ReturnInvoiceDetail"
import InvoiceOfReturn from "../Components/InvoiceOfReturn"
import VansaleDetailsScreen from "../Containers/VansaleDetailsScreen"

class NavRoutes extends PureComponent {
  constructor(props) {
    super(props)
    global.drawerPosition = "right"
    this.state = {
      isConnected: false,
      locale: "en",
      drawerPosition: "left",
    }
  }

  componentDidMount() {
    this.setState({
      locale: this.props.locale,
      drawerPosition: this.props.locale === "en" ? "left" : "right",
    })
    NetInfo.fetch().then(state => {
      if (this.state.isConnected !== state.isConnected) {
        this.setState({ isConnected: state.isConnected })
      }
    })
    setInterval(() => {
      NetInfo.fetch().then(state => {
        if (this.state.isConnected !== state.isConnected) {
          this.setState({ isConnected: state.isConnected })
        }
      })
    }, 3000)
  }
  render() {
    const { isConnected, drawerPosition, locale } = this.state
    return drawerPosition === "left" ? (
      <AppContainer screenProps={{ isConnected, locale, drawerPosition }} />
    ) : (
        <AppContainerRTL screenProps={{ isConnected, locale, drawerPosition }} />
      )
  }
}

const CustomDrawerComponent = props => (
  <View style={{ flex: 1 }}>
    <View
      style={{
        height: Platform.OS === "ios" ? 120 : 75,
        backgroundColor: Colors.rootsyPrimary,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: Platform.OS === "ios" ? 120 : 75,
          width: "100%",
          backgroundColor: Colors.snow,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: Platform.OS === "ios" ? 20 : 0,
        }}
      >
        <Image
          source={Images.logo}
          style={{
            height: 120,
            width: 120,
          }}
          resizeMode={"contain"}
        />
      </View>
    </View>
    <ScrollView>
      <DrawerItems
        activeBackgroundColor={Colors.rootsyOffOrange2}
        activeTintColor={Colors.rootsyPrimary}
        {...props}
        labelStyle={{ color: Colors.rootsyOffDark }}
      />
    </ScrollView>
  </View>
)

const PrimaryNav = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
    Home: { screen: HomeScreen },
    AboutAppScreen: { screen: AboutAppScreen },
    InvoiceScreen: { screen: InvoiceScreen },
    BalanceScreen: { screen: OffersPointHistoryComponent },
    OfferScreen: { screen: OffersComponent },
    FreezerScreen: { screen: FreezerScreen },
    VansaleScreen: { screen: VansaleScreen },
    // ReportScreen: { screen: ReportScreen },
    ReportScreenDetails: { screen: ReportScreenDetails },
    NotificationScreen: { screen: NotificationScreen },
    InvoiceSubScreen: { screen: InvoiceSubScreen },
    FreezerClaimScreen: { screen: FreezerClaimScreen },
    QuantityBalanceScreen: { screen: QuantityBalanceScreen },
    // FreezerClaimList: { screen: FreezerClaimGroupComponent },
    ResetPassword: { screen: ResetPassword },
    LogoutScreen: { screen: LogoutScreen },
    ProfileScreen: { screen: ProfileScreen },
    RefreshUserData: { screen: RefreshUserData },
    FreezerClaimListComponent: { screen: FreezerClaimListComponent },
    FreezerClaimFromClaimScreen: { screen: FreezerClaimFromClaimScreen },
    LoginScreen: { screen: LoginScreen, navigationOptions: { header: null } },
    pointBalance: { screen: OffersPointHistoryComponent },
    offerItem: { screen: OfferSubScreen },
    FreezerClaimGroupListsComponent: { screen: FreezerClaimList },
    InvoiceReturnSubScreen: { screen: InvoiceReturnSubScreen },
    ReturnInvoiceDetail: { screen: ReturnInvoiceDetail },
    InvoiceOfReturn: { screen: InvoiceOfReturn },
    VansaleDetailsScreen: { screen: VansaleDetailsScreen },

    //New Screen
    PurchaseScreen : {screen : PurchaseScreen},
    StockScreen: { screen: StockScreen },
   // PrinterScreen: { screen : BluetoothPrinter}

  },
  {
    defaultNavigationOptions: ({ navigation, screenProps }) => {
      return {
        headerTitle: (
          <View style={{ flex: 1 }}>
            <Image source={Images.logo} style={{ width: 85, height: 50 }} resizeMode="contain" />
          </View>
        ),
        headerLeft: (
          <Icon
            onPress={() => navigation.openDrawer()}
            name="ios-menu"
            size={36}
            style={{
              color: Colors.rootsyPrimary,
              marginLeft: 12,
            }}
          />
        ),
        headerRight: (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              width: 170,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomIcon
                name={screenProps.isConnected ? "dot-circle-o" : "circle"}
                size={screenProps.isConnected ? 23 : 20}
                color={screenProps.isConnected ? "green" : "orange"}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 9,
                  width: "100%",
                  height: "30%",
                  color: screenProps.isConnected ? "green" : "orange",
                }}
              >
                {screenProps.isConnected
                  ? translate("appNavigation.statusOnline")
                  : translate("appNavigation.statusOffline")}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                // name={"language"}
                // size={20}
                style={{
                  width: 32,
                  height: 32,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // color={screenProps.locale === "en" ? Colors.rootsyPrimary : "green"}
                onPress={() => {
                  const locale = screenProps.locale === "en" ? "ar" : "en"

                  Alert.alert(
                    "Permission",
                    translate("common.localeToggle"),
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          AsyncStorage.setItem("locale", `${locale}`)
                          AsyncStorage.setItem("RTL", screenProps.locale === "ar")
                          AsyncStorage.setItem("refresh", "true")
                          const setRTL = setInterval(() => {
                            I18nManager.forceRTL(screenProps.locale === "ar")
                          }, 50)
                          setTimeout(() => {
                            clearInterval(setRTL)
                            RNRestart.Restart()
                          }, 500)
                        },
                      },
                    ],
                    { cancelable: false },
                  )
                }}
              >
                <Image
                  source={Images.localeArabic}
                  resizeMode="contain"
                  style={{ width: "90%", height: "90%" }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomIcon
                name="refresh"
                size={25}
                color={Colors.rootsyPrimary}
                onPress={() => {
                  if (!screenProps.isConnected) {
                    Alert.alert(translate(`common.offline`))
                  } else {
                    navigation.navigate("RefreshUserData")
                  }
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                name="ios-notifications"
                size={32}
                color={Colors.rootsyPrimary}
                onPress={() => navigation.navigate("NotificationScreen")}
              />
            </View>
          </View>
        ),
      }
    },
  },
)

const AppDrawerNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: PrimaryNav,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-home" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.homeTitle"} style={styles.dwawerLabel} />
      },
    },
    Printer: {
      screen: BluetoothPrinter,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-print" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <Text  style={styles.dwawerLabel} >Print </Text>
                      //  <RNText 
                      //   tx={"homeScreen.Print"} 
                      //  style={styles.dwawerLabel} />
      },
    },

    InvoiceScreen: {
      screen: InvoiceScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialIcon name="attach-file" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.saleTitle"} style={styles.dwawerLabel} />
      },
    },

    PurchaseScreen: {
      screen: PurchaseScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialIcon name="attach-file" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.purchasingTitle"} style={styles.dwawerLabel} />
      },
    },


    BalanceScreen: {
      screen: OffersPointHistoryComponent,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcon name="van-utility" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.balanceTitle"} style={styles.dwawerLabel} />
      },
    },

    OfferScreen: {
      screen: OffersComponent,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcon name="credit-card-plus" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.offerTitle"} style={styles.dwawerLabel} />
      },
    },

    FreezerScreen: {
      screen: FreezerScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcon name="fridge" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.freezerTitle"} style={styles.dwawerLabel} />
      },
    },

    StockScreen: {
      screen: StockScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialIcon name="insert-drive-file" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: translate("homeScreen.stockTitle"),
      },
    },

    VansaleScreen: {
      screen: VansaleScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcon name="van-utility" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.vanSaleTitle"} style= {styles.dwawerLabel}/>
      },
    },

    // ReportScreen: {
    //   screen: ReportScreen,
    //   navigationOptions: {
    //     drawerIcon: ({ tintColor }) => (
    //       <MaterialIcon name="insert-drive-file" size={24} style={{ color: tintColor }} />
    //     ),
    //     drawerLabel: <RNText tx={"homeScreen.reportTitle"} style= {styles.dwawerLabel}/>
    //   },
    // },

    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <FontAwesomIcon name="user" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"profile.profileTitle"} style= {styles.dwawerLabel}/>
      },
    },

    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcon name="lock-reset" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"profile.resetPassword"} style= {styles.dwawerLabel}/>
      },
    },

    AboutAppScreen: {
      screen: AboutAppScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialIcon name="touch-app" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.aboutApp"} style= {styles.dwawerLabel}/>
      },
    },

    LogoutScreen: {
      screen: LogoutScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcon name="logout" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.logout"} style= {styles.dwawerLabel}/>
      },
    },
  },
  {
    contentComponent: CustomDrawerComponent,
    drawerWidth: 240,
    drawerPosition: "left",
  },
)

const AppDrawerNavigatorRTL = createDrawerNavigator(
  {
    Dashboard: {
      screen: PrimaryNav,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-home" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.homeTitle"} style={styles.dwawerLabel} />
      },
    },

    InvoiceScreen: {
      screen: InvoiceScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialIcon name="attach-file" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.saleTitle"} style={styles.dwawerLabel} />
      },
    },

//New Screen Purchase
    PurchaseScreen: {
      screen: PurchaseScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialIcon name="attach-file" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.purchasingTitle"} style={styles.dwawerLabel} />
      },
    },


    BalanceScreen: {
      screen: OffersPointHistoryComponent,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcon name="van-utility" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.balanceTitle"} style={styles.dwawerLabel} />
      },
    },

    OfferScreen: {
      screen: OffersComponent,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcon name="credit-card-plus" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.offerTitle"} style={styles.dwawerLabel} />
      },
    },

    FreezerScreen: {
      screen: FreezerScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcon name="fridge" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.freezerTitle"} style={styles.dwawerLabel} />
      },
    },

    VansaleScreen: {
      screen: VansaleScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcon name="van-utility" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.vanSaleTitle"} style={styles.dwawerLabel} />
      },
    },

    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <FontAwesomIcon name="user" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"profile.profileTitle"} style={styles.dwawerLabel} />
      },
    },

    // ReportScreen: {
    //   screen: ReportScreen,
    //   navigationOptions: {
    //     drawerIcon: ({ tintColor }) => (
    //       <MaterialIcon name="insert-drive-file" size={24} style={{ color: tintColor }} />
    //     ),
    //     drawerLabel: <RNText tx={"homeScreen.reportTitle"} style={styles.dwawerLabel} />
    //   },
    // },

    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcon name="lock-reset" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"profile.resetPassword"} style={styles.dwawerLabel} />
      },
    },

    AboutAppScreen: {
      screen: AboutAppScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialIcon name="touch-app" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.aboutApp"} style={styles.dwawerLabel} />
      },
    },

    LogoutScreen: {
      screen: LogoutScreen,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcon name="logout" size={24} style={{ color: tintColor }} />
        ),
        drawerLabel: <RNText tx={"homeScreen.logout"} style={styles.dwawerLabel} />
      },
    },
  },
  {
    contentComponent: CustomDrawerComponent,
    drawerWidth: 240,
    drawerPosition: "right",
  },
)

const AppSwitchNavigator = createSwitchNavigator({
  LaunchScreen: { screen: LaunchScreen },
  HomeScreen: { screen: AppDrawerNavigator },
  LoginScreen: { screen: LoginScreen },
  ResetPassword: { screen: ResetPassword },
  AboutAppScreen: { screen: AboutAppScreen },
  InvoiceScreen: { screen: InvoiceScreen },
  BalanceScreen: { screen: OffersPointHistoryComponent },
  OfferScreen: { screen: OffersComponent },
  FreezerScreen: { screen: FreezerScreen },
  VansaleScreen: { screen: VansaleScreen },
  // ReportScreen: { screen: ReportScreen },
  ReportScreenDetails: { screen: ReportScreenDetails },
  NotificationScreen: { screen: NotificationScreen },
  InvoiceSubScreen: { screen: InvoiceSubScreen },
  FreezerClaimScreen: { screen: FreezerClaimScreen },
  QuantityBalanceScreen: { screen: QuantityBalanceScreen },
  LogoutScreen: { screen: LogoutScreen },
  ProfileScreen: { screen: ProfileScreen },
  FreezerClaimListComponent: { screen: FreezerClaimListComponent },
  pointBalance: { screen: OffersPointHistoryComponent },
  FreezerClaimFromClaimScreen: { screen: FreezerClaimFromClaimScreen },
  offerItem: { screen: OfferSubScreen },
  FreezerClaimGroupListsComponent: { screen: FreezerClaimList },
  InvoiceReturnSubScreen: { screen: InvoiceReturnSubScreen },
  ReturnInvoiceDetail: { screen: ReturnInvoiceDetail },
  InvoiceOfReturn: { screen: InvoiceOfReturn },

  //new screen
  PurchaseScreen : {screen : PurchaseScreen},
  StockScreen: { screen: StockScreen },
  // PointScreen: { screen: PointScreen },

})

const AppSwitchNavigatorRTL = createSwitchNavigator({
  LaunchScreen: { screen: LaunchScreen },
  HomeScreen: { screen: AppDrawerNavigatorRTL },
  LoginScreen: { screen: LoginScreen },
  ResetPassword: { screen: ResetPassword },
  AboutAppScreen: { screen: AboutAppScreen },
  InvoiceScreen: { screen: InvoiceScreen },
  BalanceScreen: { screen: OffersPointHistoryComponent },
  OfferScreen: { screen: OffersComponent },
  FreezerScreen: { screen: FreezerScreen },
  VansaleScreen: { screen: VansaleScreen },
  // ReportScreen: { screen: ReportScreen },
  ReportScreenDetails: { screen: ReportScreenDetails },
  NotificationScreen: { screen: NotificationScreen },
  InvoiceSubScreen: { screen: InvoiceSubScreen },
  FreezerClaimScreen: { screen: FreezerClaimScreen },
  QuantityBalanceScreen: { screen: QuantityBalanceScreen },
  LogoutScreen: { screen: LogoutScreen },
  ProfileScreen: { screen: ProfileScreen },
  FreezerClaimListComponent: { screen: FreezerClaimListComponent },
  pointBalance: { screen: OffersPointHistoryComponent },
  FreezerClaimFromClaimScreen: { screen: FreezerClaimFromClaimScreen },
  offerItem: { screen: OfferSubScreen },
  FreezerClaimGroupListsComponent: { screen: FreezerClaimList },
  InvoiceReturnSubScreen: { screen: InvoiceReturnSubScreen },
  ReturnInvoiceDetail: { screen: ReturnInvoiceDetail },
  InvoiceOfReturn: { screen: InvoiceOfReturn },

  //New screen


  PurchaseScreen : {screen : PurchaseScreen},
})

const AppContainer = createAppContainer(AppSwitchNavigator)
const AppContainerRTL = createAppContainer(AppSwitchNavigatorRTL)

export default NavRoutes
