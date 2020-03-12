import React, { Component } from "react"
import { ScrollView, View, KeyboardAvoidingView, Alert, Text, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import { Textarea } from "native-base"
import { withNavigation } from "react-navigation"
import AsyncStorage from "@react-native-community/async-storage"
import { Cache } from "react-native-cache"
import styles from "./Styles/FreezerClaimScreenStyle"
import { createClaim } from "../Redux/Actions/createClaimAction"
import { translate } from "../i18n"
import { getClaim } from "../Redux/Actions/freezerActions"
import DropdownModel from '../Components/DropdownModel'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class FreezerClaimFromClaimScreen extends Component {
  state = {
    subject: "",
    message: "",
    serial_no: null,
    priority: "low",
    data: [],
    dropdownModelVisible: false,
  }

  componentWillReceiveProps() {
    const data = this.props.navigation.getParam("data", [])
    let tmp = [{ value: "Select one" }]

    if (data) {
      data.map((item, i) => {
        tmp.push({ value: item.serial_no })
      })
      if (tmp.length == 1) {
        setTimeout(() => {
          this.setState({
            data: tmp,
            serial_no: tmp.value,
          })
        }, 340)
      }
    }
  }

  componentDidMount() {
    const data = this.props.navigation.getParam("data", [])
    let tmp = [{ value: "Select one" }]

    if (data) {
      data.map((item, i) => {
        tmp.push({ value: item.serial_no })
      })

      setTimeout(() => {
        this.setState({
          data: tmp,
          serial_no: tmp.value,
        })
      }, 340)
    }
  }

  createClaimHandler = () => {
    if (
      this.state.serial_no !== "Select Serial Number" ||
      this.state.serial_no !== null ||
      this.state.serial_no !== ""
    ) {
      const { dispatch, navigation } = this.props
      var cache = new Cache({
        namespace: "FGMM",
        policy: {
          maxEntries: 50000,
        },
        backend: AsyncStorage,
      })

      const data = {
        subject: "customer claim from app",
        message: this.state.message,
        serial_no: this.state.serial_no,
        priority: "low",
      }
      if (this.state.serial_no !== null && this.state.serial_no !== "") {
        cache.getItem("userData", (err, value) => {
          const token = value.package.token
          dispatch(createClaim(token, data))
            .then(res => {
              if (res.payload.status === true) {
                Alert.alert(translate("common.claimSend"))
                dispatch(getClaim(token, {}))
                navigation.navigate("FreezerScreen")
              }
            })
            .catch(err => {
              Alert.alert(translate("common.error"))
            })
        })
      } else {
        Alert.alert(translate("freezerScreen.emptySerialNumber"))
      }
    } else {
      Alert.alert(translate("freezerScreen.emptySerialNumber"))
    }
  }

  render() {
    const { data } = this.state
    if (!this.data) {
      this.data = data[0];
    }
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          <DropdownModel
            visible={this.state.dropdownModelVisible}
            items={data}
            onRequestClose={() => this.setState({ dropdownModelVisible: false })}
            onSelect={(item) => { this.data = item; this.setState({ dropdownModelVisible: false, serial_no: item.value }) }}
          />
          <RNText tx={"freezerScreen.claimFreezer"} style={styles.headerText} />
          <View style={styles.inputContainer}>
            <View style={styles.R1}>
            <RNText style={{ color: 'black' }} tx={"freezerScreen.selectSerialNumber"} />
              <TouchableOpacity style={styles.dropdownContainer}
                onPress={() => this.setState({ 
                  dropdownModelVisible: true 
                })}
              >
                <View style={styles.dropdownTextContainer}>
                  <Text numberOfLines={1} style={styles.dropdownText}>{this.data ? this.data.value : "Select Serial Number"}</Text>
                </View>
                <MaterialIcons name='keyboard-arrow-down' size={30} color='black' style={styles.dropdownIcon} />
              </TouchableOpacity>
              <View style={{ height: 0.8, backgroundColor: 'gray' }}></View>
            </View>
            <View style={styles.R1}>
              <RNText style={{ color: 'black' }} tx={"freezerScreen.message"} />
              <Textarea
                onChangeText={text => this.setState({ message: text })}
                style={styles.input}
                rowSpan={5}
                bordered
                placeholder="Some Message Goes here..."
                placeholderTextColor="#eee"
              />
            </View>

            <View style={[styles.btnCont, { marginTop: 45, height: 40 }]}>
              <TouchableOpacity onPress={() => this.createClaimHandler()}>
                <RNText style={[styles.btnText, { color: 'white' }]} tx={"loginScreen.btnText"} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView >
    )
  }
}

const mapStateToProps = state => {
  return {
    freezerData: state.freezerData,
  }
}

export default connect(mapStateToProps)(withNavigation(FreezerClaimFromClaimScreen))
