import React, { Component } from "react"
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Linking
} from "react-native"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import { Colors, Images } from "../Themes"
import styles from "./Styles/ProfileScreenStyles"
import { editProfile, cacheUser } from "../Redux/Actions/userActions"
import { translate } from "../i18n"
import { Cache } from "react-native-cache"
import AsyncStorage from "@react-native-community/async-storage"
import Avatar from "../Components/Avatar"
import ImagePicker from "react-native-image-picker"

class ProfileScreen extends Component {
  state = {
    customer_id: 0,
    name: "",
    firstName : "",
    middleName: "",
    lastName : "",
    email: "",
    photo: null,
    phone: "",
    editMode: false,
    online: true,
    token: null,
    region: [],
    tempImage: null,
    loader: false,
    fileSize: null,
    fileName: "photo",
    username: "",
  }
  componentDidMount() {
    const { userData } = this.props
    if (userData) {
      this.setState({
        customer_id: userData.package.customer_id,
        name: userData.package.name,
        
       
       //New Update First name , middle name , last name
        firstName: userData.package.first_name,
        middleName: userData.package.middle_name,
        lastName: userData.package.last_name,
        email: userData.package.email,
        phone: userData.package.phone,
        photo: userData.package.photo,
        tempImage: userData.package.photo,
        token: userData.package.token,
        region: userData.package.region[0],
        username: userData.package.username,
      })
    }
  }

  performEdit = () => {
    if (this.state.editMode && this.state.photo !== null) {
      if (this.state.fileSize < 2.0) {
        this.setState({ loader: true })
        const formData = new FormData()
        formData.append("first_name", this.state.firstName)
        formData.append("middle_name", this.state.middleName)
        formData.append("last_name", this.state.lastName)

        formData.append("phone", this.state.phone)
        formData.append("photo", {
          uri: this.state.photo,
          type: "image/jpeg",
          name: "photo",
        })

        var cache = new Cache({
          namespace: "FGMM",
          policy: {
            maxEntries: 50000,
          },
          backend: AsyncStorage,
        })

        this.props
          .dispatch(editProfile(this.state.token, formData))
          .then(res => {
            console.log(res)
            if (res.payload.status) {
              cache.getItem("userData", (err, value) => {
                if (value) {
                  let data = value
                  data.package.name = res.payload.package.name
                  data.package.first_name = res.payload.package.first_name
                  data.package.middle_name = res.payload.package.middle_name
                  data.package.last_name = res.payload.package.last_name
                  data.package.phone = res.payload.package.phone
                  data.package.photo = res.payload.package.photo
                  cache.setItem("userData", data, err => { })
                  this.props.dispatch(cacheUser(data))
                }
              })
              Alert.alert(translate(`common.updateProfile`))
              console.log(this.state.name, this.state.phone, this.state.photo)
              this.setState({ editMode: false, loader: false })
            }
          })
          .catch(error => {
            Alert.alert(translate(`common.error`))
            this.setState({ editMode: false, loader: false })
          })
      } else {
        Alert.alert(translate(`errors.imgExceeded`))
      }
    } else {
      Alert.alert(translate(`common.upload`))
      this.setState({ editMode: false, loader: false })
    }
  }

  chooseFile = () => {
    var options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    }
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response)
      if (response.didCancel) {
        console.log("User cancelled image picker")
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error)
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton)
        alert(response.customButton)
      } else {
        const source = response.uri

        this.setState({
          photo: source,
          fileName: response.fileName,
          fileSize: response.fileSize / (1024 * 1024).toFixed(2),
        })
      }
    })
  }
  render() {
    const { name, username, email, phone, photo, editMode, region, tempImage, loader,firstName, middleName, lastName } = this.state
    return loader ? (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          opacity: 1,
          backgroundColor: `rgba(255,255,255, 0.4s)`,
        }}
      >
        <ActivityIndicator color={Colors.rootsyPrimary} size="large" />
        <RNText tx={`common.loader`} />
      </View>
    ) : (
        <View style={styles.body}>
          <View style={styles.header}>
            <RNText tx={"profile.profileTitle"} style={styles.headerText} />
          </View>
          <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
            {!editMode && <Avatar image={photo} />}
            {!editMode ? (
              <View style={styles.profileDetailContainer}>
                <View style={styles.C1}>
                  <RNText style={styles.titleText} tx={`profile.firstName`} text={` : ${firstName}`} />
                </View>
                <View style={styles.C1}>
                  <RNText style={styles.titleText} tx={`profile.middleName`} text={` : ${middleName}`} />
                </View>
                <View style={styles.C1}>
                  <RNText style={styles.titleText} tx={`profile.lastName`} text={` : ${lastName}`} />
                </View>
                <View style={styles.C1}>
                  <RNText style={styles.titleText} tx={`profile.email`} text={` : ${username}`} />
                </View>

                <View>
                  <TouchableOpacity style={styles.C1} onPress={() => Linking.openURL(`tel:${phone}`) }>
                    <RNText style={styles.titleText} tx={`profile.phone`} text={` : ${phone}`} />
                  </TouchableOpacity>
                </View>

                <View style={styles.C2}>
                  <RNText
                    style={[
                      styles.titleText,
                      { fontSize: 18, textAlign: "center", width: "100%", fontWeight: "600" },
                    ]}
                    tx={`profile.regionTitle`}
                    text={``}
                  />

                  <RNText
                    style={styles.titleText}
                    tx={`profile.region`}
                    text={` : ${region.region}`}
                  />
                  <RNText style={styles.titleText} tx={`profile.state`} text={` : ${region.state}`} />
                  <RNText
                    style={styles.titleText}
                    tx={`profile.country`}
                    text={` : ${region.country}`}
                  />
                </View>
              </View>
            ) : (
                <View style={styles.profileDetailContainer}>
                  <Avatar image={photo} />

                  <TouchableOpacity
                    onPress={() => this.chooseFile()}
                    style={[
                      styles.btnCont,
                      styles.shadowStyle,
                      {
                        backgroundColor: Colors.rootsyPrimary,
                        marginRight: 15,
                        marginTop: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                      },
                    ]}
                  >
                    <RNText tx={"common.upload"} style={styles.btnTx} />
                  </TouchableOpacity>
                  <View style={[styles.C1, { justifyContent: "space-around", paddingHorizontal: 0 }]}>
                    <RNText
                      style={[styles.titleText, { width: "20%", textAlign: "center" }]}
                      tx={`profile.firstName`}
                      text={` : `}
                    />
                    <TextInput
                      style={styles.inputText}
                      onChangeText={text => this.setState({ firstName: text })}
                      value={firstName || ""}
                    />
                  </View>

                  <View style={[styles.C1, { justifyContent: "space-around", paddingHorizontal: 0 }]}>
                    <RNText
                      style={[styles.titleText, { width: "20%", textAlign: "center" }]}
                      tx={`profile.middleName`}
                      text={` : `}
                    />
                    <TextInput
                      style={styles.inputText}
                      onChangeText={text => this.setState({ middleName: text })}
                      value={middleName || ""}
                    />
                  </View>

                  <View style={[styles.C1, { justifyContent: "space-around", paddingHorizontal: 0 }]}>
                    <RNText
                      style={[styles.titleText, { width: "20%", textAlign: "center" }]}
                      tx={`profile.lastName`}
                      text={` : `}
                    />
                    <TextInput
                      style={styles.inputText}
                      onChangeText={text => this.setState({ lastName: text })}
                      value={lastName || ""}
                    />
                  </View>
                  
                  <View style={[styles.C1, { justifyContent: "space-around", paddingHorizontal: 0 }]}>
                    <RNText
                      style={[styles.titleText, { width: "20%", textAlign: "center" }]}
                      tx={`profile.email`}
                      text={` : `}
                    />
                    <TextInput
                      style={styles.inputText}
                      onChangeText={text => this.setState({ username: text })}
                      value={username || ""}
                      editable={false}
                    />
                  </View>

                  <View style={[styles.C1, { justifyContent: "space-around", paddingHorizontal: 0 }]}>
                    <RNText
                      style={[styles.titleText, { width: "20%", textAlign: "center" }]}
                      tx={`profile.phone`}
                      text={` : `}
                    />
                    <TextInput
                      style={styles.inputText}
                      onChangeText={text => this.setState({ phone: text })}
                      value={phone || ""}
                    />
                  </View>
                </View>
              )}

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: 25,
                height: 75,
                flexDirection: "row-reverse",
              }}
            >
              {editMode ? (
                <TouchableOpacity
                  onPress={() => {
                    this.performEdit()
                  }}
                  style={[styles.btnCont,styles.shadowStyle, { backgroundColor: Colors.rootsyPrimary }]}
                >
                  <RNText tx={"common.save"} style={styles.btnTx} />
                </TouchableOpacity>
              ) : (
                  <React.Fragment>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ editMode: true })
                      }}
                      style={[styles.btnCont,styles.shadowStyle, { backgroundColor: Colors.rootsyPrimary, width: '40%' }]}
                    >
                      <RNText tx={"common.edit"} style={styles.btnTx} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("ResetPassword")
                      }}
                      style={[styles.btnCont,styles.shadowStyle,{ backgroundColor: Colors.rootsyPrimary, width: '40%' }]}
                    >
                      <RNText tx={"common.changePassword"} style={styles.btnTx} />
                    </TouchableOpacity>
                  </React.Fragment>
                )}
              {editMode && (
                <TouchableOpacity
                  onPress={() => this.setState({ editMode: !editMode, photo: tempImage })}
                  style={[styles.btnCont,styles.shadowStyle, { backgroundColor: Colors.rootsyPrimary, marginRight: 15 }]}
                >
                  <RNText tx={"common.cancel"} style={styles.btnTx} />
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData.data,
  }
}

export default connect(mapStateToProps)(ProfileScreen)
