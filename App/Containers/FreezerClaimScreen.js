import React, { Component } from "react"
import { ScrollView, View, KeyboardAvoidingView, Alert } from "react-native"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import { Label, Input, Textarea, Button } from "native-base"
import { withNavigation } from "react-navigation"
import AsyncStorage from "@react-native-community/async-storage"
import { Cache } from "react-native-cache"
import styles from "./Styles/FreezerClaimScreenStyle"
import { createClaim } from "../Redux/Actions/createClaimAction"
import { translate } from "../i18n"
import { getClaim } from "../Redux/Actions/freezerActions"

class FreezerClaimScreen extends Component {
  state = {
    subject: "",
    message: "",
    serial_no: null,
    priority: "low",
  }
  componentDidMount() {
    const serial_no = this.props.navigation.getParam("serialNumber", "0")
    this.setState({
      serial_no,
    })
  }

  componentWillReceiveProps() {
    const serial_no = this.props.navigation.getParam("serialNumber", "0")
    this.setState({
      serial_no,
    })
  }

  createClaimHandler = () => {
    const { dispatch } = this.props
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

    cache.getItem("userData", (err, value) => {
      const token = value.package.token
      dispatch(createClaim(token, data))
        .then(res => {
          if (res.payload.status === true) {
            dispatch(getClaim(token, {}))
            Alert.alert(translate("common.claimSend"))
            this.props.navigation.navigate("FreezerScreen")
          }
        })
        .catch(err => {
          console.log(err,"Error in getting user data")
          Alert.alert(translate("common.error"))
        })
    })
  }

  render() {
    const serialNumber = this.props.navigation.getParam("serialNumber", "0")
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          <RNText text={"Claim Freezer"} style={styles.headerText} />
          <View style={styles.inputContainer}>
            <View style={styles.R1}>
              <Label style={styles.inputText}>Serial Number</Label>
              {this.state.serial_no !== null && (
                <Input
                  value={`${serialNumber}`}
                  style={[styles.input, { paddingHorizontal: 10 }]}
                  bordered
                  placeholder="INCTR4674"
                  placeholderTextColor="#eee"
                  editable={false}
                />
              )}
            </View>

            <View style={styles.R1}>
              <Label style={styles.inputText}>Message</Label>
              <Textarea
                onChangeText={text => this.setState({ message: text })}
                style={styles.input}
                rowSpan={5}
                bordered
                placeholder="Some Message Goes here..."
                placeholderTextColor="#eee"
              />
            </View>

            <View style={[styles.R1, { marginTop: 45 }]}>
              <Button block info onPress={() => this.createClaimHandler()}>
                <RNText style={styles.btnText} text={"Submit"} />
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return { state }
}

export default connect(mapStateToProps)(withNavigation(FreezerClaimScreen))
