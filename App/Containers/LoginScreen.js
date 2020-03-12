import React, { PureComponent } from "react"
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  ImageBackground
} from "react-native"
import { connect } from "react-redux"
import { Cache } from "react-native-cache"
import RNText from "../Components/RNText"
import { loginUser, cacheUser, updateFcmToken } from "../Redux/Actions/userActions"
import { translate } from "../i18n"

const Images = ['https://ifgmm.com/assets/images/background/login-register1.jpg',
'https://ifgmm.com/assets/images/background/login-register2.jpg',
'https://ifgmm.com/assets/images/background/login-register3.jpg'
]

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      email: "VA0002",
      password: "12345678",
      loading: false,
      loader: true,
      isLoggedIn: false,
      mount : true
    }

    var cache = new Cache({
      namespace: "FGMM",
      policy: {
        maxEntries: 50000,
      },
      backend: AsyncStorage,
    })
    cache.getItem("userData", function (err, value) {
      cache.getItem("isLoggedIn", function (err, isLoggedIn) {
        if (value) {
          if (value.status === true && isLoggedIn === "true") {
            props.dispatch(cacheUser(value))
            props.navigation.navigate("HomeScreen")
          }
        }
      })
    })
  }

  onLogin = () => {
    const { email, password, loading } = this.state
    if (email !== null && password !== null) {
      // fkebfk

      var cache = new Cache({
        namespace: "FGMM",
        policy: {
          maxEntries: 50000,
        },
        backend: AsyncStorage,
      })

      cache.getItem("userData", (err, value) => {
        console.log(value)
        cache.getItem("userDataPassword", (err, getPassword) => {
          if (value && getPassword) {
            if (
              (email === value.package.email ||
                email === value.package.username ||
                email.toLowerCase() === value.package.username ||
                email.toUpperCase() === value.package.username) &&
              password === getPassword
            ) {
              cache.getItem("userData", (err, value) => {
                if (value) {
                  if (
                    email !== value.package.email ||
                    email !== value.package.username ||
                    email.toLowerCase() !== value.package.username.toLowerCase() ||
                    email.toUpperCase() !== value.package.username.toUpperCase()
                  ) {
                    cache.setItem("userData", {}, function (err) { })
                    cache.setItem("invoiceData", {}, function (err) { })
                    cache.setItem("invoiceReturnData", {}, function (err) { })
                    cache.setItem("balanceData", {}, function (err) { })
                    cache.setItem("offerData", {}, function (err) { })
                    cache.setItem("pointHistoryData", {}, function (err) { })
                    cache.setItem("notificationData", {}, function (err) { })
                    cache.setItem("userReport", {}, function (err) { })
                    cache.setItem("getClaim", {}, function (err) { })
                    cache.setItem("freezerList", {}, function (err) { })
                  }
                }
              })
            }
          }
        })
      })

      this.setState({ loading: true })
      const data = {
        email,
        password,
      }
      this.props
        .dispatch(loginUser(data))
        .then(res => {
          console.log(res.payload)
          if (res.payload && res.payload.status === true) {
            var cache = new Cache({
              namespace: "FGMM",
              policy: {
                maxEntries: 50000,
              },
              backend: AsyncStorage,
            })

            cache.setItem("userData", res.payload, function (err) { })
            cache.setItem("userDataPassword", password, function (err) { })
            cache.setItem("isLoggedIn", "true", function (err) { })
            cache.setItem("userToken", res.payload.package.token, function (err) { })

            const fcm = AsyncStorage.getItem("fcmToken").then(fcmToken => {
              this.props
                .dispatch(updateFcmToken(res.payload.package.token, { device_token: fcmToken }))
                .then(response => console.log(response))
              console.log("fcm :::: ", fcmToken)
            })

            this.props.navigation.navigate("HomeScreen")
          } else {
            var cache = new Cache({
              namespace: "FGMM",
              policy: {
                maxEntries: 50000,
              },
              backend: AsyncStorage,
            })

            cache.getItem("userData", (err, value) => {
              cache.getItem("userDataPassword", (err, getPassword) => {
                if (value && getPassword) {
                  if (
                    (email === value.package.email ||
                      email === value.package.username ||
                      email.toLowerCase() === value.package.username.toLowerCase() ||
                      email.toUpperCase() === value.package.username.toUpperCase()) &&
                    password === getPassword
                  ) {
                    cache.setItem("isLoggedIn", "true", err => {
                      this.setState({ loading: false })
                      this.props.dispatch(cacheUser(value))
                      cache.setItem("userToken", value.package.token, function (err) { })
                      const fcm = AsyncStorage.getItem("fcmToken").then(fcmToken => {
                        this.props
                          .dispatch(
                            updateFcmToken(res.payload.package.token, {
                              device_token: fcmToken,
                            }),
                          )
                          .then(response => console.log(response))
                      })
                      this.props.navigation.navigate("HomeScreen")
                    })
                  } else {
                    Alert.alert(translate("loginScreen.loginFailed"))
                  }
                } else {
                  Alert.alert(translate("loginScreen.loginFailed"))
                }
              })
            })
          }
          this.setState({ loading: false })
        })
        .catch(err => console.log(err))
    } else {
      alert("Email & Password Fields are mandatory!")
    }
  }

  componentDidMount() {
    this.mounted = true
    const randomNumber = Math.floor(Math.random() * Images.length);
    setTimeout(() => {
      this.setState({
        loader: false,
        currentImageIndex: randomNumber
      })
    }, 500)
  }
  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    const { password, email, loader } = this.state
    return !loader ? (
      <View style={styles.ScrollView}>
        <View
          style={{
            height: 80,
            width: "100%",
            backgroundColor: "#fff",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <RNText tx={"appTitle"} style={styles.headerText} />
        </View>
        <ImageBackground source={{ uri: Images[this.state.currentImageIndex]}} style={{ width: '100%', height: '100%' }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={55}>
              <View style={styles.container}>
                <View style={styles.login}>
                  <View style={styles.titleView}>
                    <RNText tx="loginScreen.title" style={styles.title} />
                  </View>

                  <View style={styles.inputs}>
                    <TextInput
                      value={email}
                      onChangeText={text => this.setState({ email: text })}
                      style={styles.textInput1}
                      placeholder={"abc@fgmmdev.com"}
                      placeholderTextColor={"#76b6ef"}
                      autoCapitalize="none"
                    />
                    <TextInput
                      value={password}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      onChangeText={text => this.setState({ password: text })}
                      placeholder={"*****************"}
                      style={styles.textInput2}
                      placeholderTextColor={"#76b6ef"}
                    />
                    <TouchableOpacity onPress={() => this.onLogin()} style={[styles.button,styles.shadowStyle]}>
                      <RNText tx={"loginScreen.btnText"} style={styles.btnText} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
        {this.state.loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    ) : (
        <View style={[styles.loader, { backgroundColor: "rgba(255, 255, 255, 1)" }]}>
          <ActivityIndicator size="large" />
          <RNText style={styles.loaderText} tx={`common.loader`} />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  loaderText: {
    fontSize: 17,
  },
  inputs: {
    flex: 3,
    width: "99%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingTop: 117,
    alignItems: "center",
    backgroundColor: "#FFD33E",
  },
  titleView: {
    flex: 1,
    height: 50,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    backgroundColor: "#fff",
    width: "90%",
    height: 312,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    elevation: 5,
    shadowColor: "#fff",
  },
  ScrollView: {
    flex: 1,
    backgroundColor: "#FFD33E",
  },
  title: {
    color: "black",
    fontSize: 32,
  },
  textInput1: {
    width: "90%",
    color: "black",
    backgroundColor: "#eee",
    borderRadius: 2,
    borderColor: "#FFD33E",
    borderWidth: 0.75,
    paddingHorizontal: 15,
    marginBottom: 5,
    letterSpacing: 1.5,
    height: Platform.OS === "ios" ? 35 : undefined,
  },
  textInput2: {
    width: "90%",
    color: "black",
    backgroundColor: "#eee",
    borderRadius: 2,
    borderColor: "#FFD33E",
    borderWidth: 0.75,
    paddingHorizontal: 15,
    marginBottom: 0,
    letterSpacing: 2,
    height: Platform.OS === "ios" ? 35 : undefined,
  },
  button: {
    backgroundColor: "#FFD33E",
    borderRadius: 2,
    width: "90%",
    height: 47,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 30,
    marginLeft: 10,
    fontWeight: "bold",
    color: 'black',
    marginTop: Platform.OS === "ios" ? 42 : 0,
  },
})

function mapStateToProps(state) {
  return {
    userData: state.userData,
  }
}

export default connect(mapStateToProps)(LoginScreen)
