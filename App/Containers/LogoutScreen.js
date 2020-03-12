import React, { Component } from "react";
import { AsyncStorage, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Cache } from "react-native-cache";
import { Colors } from "../Themes";

class LogoutScreen extends Component {
  constructor(props) {
    super(props)

    var cache = new Cache({
      namespace: "FGMM",
      policy: {
        maxEntries: 50000,
      },
      backend: AsyncStorage,
    })
    cache.clearAll(function (err) {
      // the whole cache is cleared now.
      cache.setItem("isLoggedIn", "false", function (err) {
        props.navigation.navigate("LoginScreen");
      })
    });
  }

  render() {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyConent: "center", alignItems: "center" }}
        size={"large"}
        color={Colors.rootsyPrimary}
      />
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoutScreen)
