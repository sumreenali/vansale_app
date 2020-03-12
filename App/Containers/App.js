import "../Config"
import DebugConfig from "../Config/DebugConfig"
import React, { PureComponent } from "react"
import { I18nManager, ActivityIndicator, View } from "react-native"
import { Provider } from "react-redux"
import RootContainer from "./RootContainer"
import firebase from "react-native-firebase"
import store from "../Redux/store"
import i18n from "i18n-js"
import AsyncStorage from "@react-native-community/async-storage"
import { Colors } from "../Themes"
import RNText from "../Components/RNText"
import RNRestart from "react-native-restart"

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      locale: "en",
      load: true,
      RTL: false,
    }
  }

  componentDidMount() {
   this.checkPermission()
   this.createNotificationListeners()
    const value = AsyncStorage.getItem("locale").then(res => {
      if (res !== null) {
        this.setState({ locale: res === "ar" ? "ar" : "en", RTL: res === "ar" }, () => {
          i18n.locale = this.state.locale === "en" ? "en" : "ar"
          I18nManager.forceRTL(this.state.RTL)
        })
      }
    })

    setTimeout(() => {
      i18n.locale = this.state.locale === "en" ? "en" : "ar"
      I18nManager.forceRTL(this.state.RTL)
      this.setState({ load: false })
      setTimeout(() => {
        const valueRefresh = AsyncStorage.getItem("refresh").then(res => {
          if (res !== null && res === "true") {
            AsyncStorage.setItem("refresh", "false")
            RNRestart.Restart()
          }
        })
      }, 300)
    }, 200)
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      this.getToken()
    } else {
      this.requestPermission()
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken")
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
      if (fcmToken) {
        console.warn("fcmToken:", fcmToken)
        await AsyncStorage.setItem("fcmToken", fcmToken)
      }
    }
    console.log("fcmToken:", fcmToken)
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission()

      this.getToken()
    } catch (error) {
      console.log("permission rejected")
    }
  }

  async createNotificationListeners() {
    this.notificationListener = firebase.notifications().onNotification(notification => {

      const localNotification = new firebase.notifications.Notification({
        sound: "sampleaudio",
        show_in_foreground: true,
      })
        .setSound("sampleaudio.wav")
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .android.setChannelId("fcm_FirebaseNotifiction_default_channel") // e.g. the id you chose above
        .android.setColor("#000000") // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High)

      firebase
        .notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err))
    })

    const channel = new firebase.notifications.Android.Channel(
      "fcm_FirebaseNotifiction_default_channel",
      "Demo app name",
      firebase.notifications.Android.Importance.High,
    )
      .setDescription("Demo app description")
      .setSound("sampleaudio.wav")
    firebase.notifications().android.createChannel(channel)

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification
        console.log("onNotificationOpened:");
      })

    const notificationOpen = await firebase.notifications().getInitialNotification()
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification
      console.log("getInitialNotification:")
      Alert.alert(title, body)
    }

    this.messageListener = firebase.messaging().onMessage(message => {
      console.log("JSON.stringify:", JSON.stringify(message))
    })
  }

  render() {
    if (!I18nManager.isRTL && this.state.locale === "ar") {
      I18nManager.forceRTL(true)
      RNRestart.Restart()
    }

    return !this.state.load ? (
      <Provider store={store}>
        <RootContainer isConnected={true} locale={this.state.locale} />
      </Provider>
    ) : (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.rootsyPrimary} />
        <RNText tx={"common.loader"} />
      </View>
    )
  }
}

export default DebugConfig.useReactotron ? console.tron.overlay(App) : App
