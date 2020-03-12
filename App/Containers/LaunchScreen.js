import React, { Component } from "react"
import { View } from "react-native"
import { Images } from "../Themes"
import * as Animatable from "react-native-animatable"
import styles from "./Styles/LaunchScreenStyles"

export default class LaunchScreen extends Component {
  render() {
    return (
      <View style={styles.splashBg}>
        <View style={styles.splashLogo}>
          <Animatable.Image
            animation="fadeIn"
            duration={3000}
            easing={"ease-in"}
            source={Images.logoWhite}
            style={styles.logoStyles}
            onAnimationEnd={() => this.props.navigation.navigate("LoginScreen")}
          />
        </View>
      </View>
    )
  }
}