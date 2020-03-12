import React, { PureComponent } from "react"
import { connect } from "react-redux"
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native"
import RNText from "../Components/RNText"
import { Colors } from "../Themes"
import { updatePassword, loginUser } from "../Redux/Actions/userActions"
import AsyncStorage from "@react-native-community/async-storage"
import { Cache } from "react-native-cache"
import { translate } from "../i18n"

class ResetPassword extends PureComponent {
  state = {
    email: null,
    password: "",
    oldPassword: "",
    rePassword: "",
    token: "",
    loader: false,
  }

  onReset = () => {
    alert("Reset Password is Under Development!")
  }

  onLogin = () => {
    const { userData } = this.props
    const email = userData ? userData.package.email : null,
      password = this.state.password

    if (email !== null && password !== null) {
      this.setState({ loading: true })
      const data = {
        email,
        password,
      }
      this.props
        .dispatch(loginUser(data))
        .then(res => {
          //console.log(res.payload)
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
                  if (email === value.package.email && password === getPassword) {
                    cache.setItem("isLoggedIn", "true", err => {
                      this.setState({ loading: false })
                      this.props.dispatch(cacheUser(value))
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

  ChangeUserPassword = () => {
    if (
      this.state.password === this.state.rePassword &&
      this.state.password.length >= 8 &&
      this.state.rePassword.length >= 8 &&
      this.state.oldPassword !== ""
    ) {
      this.setState({ loader: true })
      var cache = new Cache({
        namespace: "FGMM",
        policy: {
          maxEntries: 50000,
        },
        backend: AsyncStorage,
      })

      let data = {
        current_password: this.state.oldPassword,
        password: this.state.password,
        password_confirmation: this.state.rePassword,
      }

      cache.getItem("userToken", (err, value) => {
        this.props
          .dispatch(updatePassword(value, data))
          .then(res => {
            if (res.payload.status === true) {
              Alert.alert(translate(`common.resetPasswordSuccess`))
              this.setState({ loader: false })
              this.onLogin()
            }
          })
          .catch(err => {
            this.setState({ loader: false })
            Alert.alert(translate(`common.error`))
          })
      })
    } else {
      Alert.alert(translate(`common.passwordLengthError`))
    }
  }
  render() {
    const { password, rePassword, oldPassword, loader } = this.state
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{ width: "100%", height: 60, justifyContent: "center", alignItems: "center" }}
          >
            <RNText
              tx={`profile.resetPassword`}
              style={{ fontSize: 26, fontWeight: "300", color: Colors.rootsyPrimary }}
            />
          </View>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={55}>
            <View style={{ marginTop: 15 }}>
              <RNText
                tx={"profile.oldPassword"}
                text={` : `}
                style={{ fontSize: 16, alignSelf: "center", color: Colors.rootsyPrimary }}
              />
              <TextInput
                style={{
                  width: "90%",
                  height: 40,
                  borderColor: Colors.rootsyOffOrange2,
                  borderWidth: 0.5,
                  backgroundColor: Colors.snow,
                  alignSelf: "center",
                  letterSpacing: 8,
                  borderRadius: 3,
                }}
                placeholder={"**********"}
                value={oldPassword !== null ? oldPassword : ""}
                secureTextEntry={true}
                onChangeText={text => this.setState({ oldPassword: text })}
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <RNText
                tx={"profile.newPassword"}
                text={` : `}
                style={{ fontSize: 16, alignSelf: "center", color: Colors.rootsyPrimary }}
              />
              <TextInput
                style={{
                  width: "90%",
                  height: 40,
                  borderColor: Colors.rootsyOffOrange2,
                  borderWidth: 0.5,
                  backgroundColor: Colors.snow,
                  alignSelf: "center",
                  letterSpacing: 8,
                  borderRadius: 3,
                }}
                placeholder={"**********"}
                value={password !== null ? password : ""}
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <RNText
                tx={"profile.confirmPassword"}
                text={` : `}
                style={{ fontSize: 16, alignSelf: "center", color: Colors.rootsyPrimary }}
              />
              <TextInput
                style={{
                  width: "90%",
                  height: 40,
                  borderColor: Colors.rootsyOffOrange2,
                  borderWidth: 0.5,
                  backgroundColor: Colors.snow,
                  alignSelf: "center",
                  letterSpacing: 8,
                  borderRadius: 3,
                }}
                placeholder={"**********"}
                secureTextEntry={true}
                onChangeText={text => this.setState({ rePassword: text })}
                value={rePassword !== null ? rePassword : ""}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 25,
                height: 75,
              }}
            >
              {loader ? (
                <ActivityIndicator size="large" color={Colors.rootsyPrimary} />
              ) : (
                  <TouchableOpacity
                    onPress={() => this.ChangeUserPassword()}
                    style={{
                      backgroundColor: Colors.rootsyPrimary,
                      minWidth: 125,
                      minHeight: 37,
                      borderRadius: 4,
                      justifyContent: "center",
                      alignItems: "center",
                      elevation: 10,
                      shadowOffset: { width: 0, height: 7 },
                      shadowOpacity: 0.2,
                    }}
                  >
                    <RNText
                      tx={"loginScreen.btnText"}
                      style={{ textAlign: "center", width: "96%", fontSize: 16, color: Colors.snow }}
                    />
                  </TouchableOpacity>
                )}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    state,
    userData: state.userData.data,
  }
}

export default connect(mapStateToProps)(ResetPassword)

const styles = StyleSheet.create({})
