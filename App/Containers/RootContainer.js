import React, { Component } from "react"
import { View, StatusBar } from "react-native"
import NavRoutes from "../Navigation/AppNavigation"
import styles from "./Styles/RootContainerStyles"
import { Colors } from "../Themes"

class RootContainer extends Component {
  componentDidMount() {}

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar animated backgroundColor={Colors.rootsyPrimary} barStyle="light-content" />
        <NavRoutes locale={this.props.locale} />
      </View>
    )
  }
}

export default RootContainer
