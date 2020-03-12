import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import styles from "./Styles/NotificationCardStyle";
import { Images } from "../Themes";

export default class NotificationCard extends Component {
  render() {
    const { date, title, content } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Images.notificationBackdrop}
          style={styles.leftView}
        >
          <View style={styles.leftViewDate}>
            <Text style={styles.leftViewDateTxt}>{date}</Text>
          </View>
        </ImageBackground>
        <View style={styles.rightView}>
          <Text style={styles.rightViewTopTxt}>{title}</Text>
          <Text style={styles.rightViewMiddleTxt}>
            {content}
          </Text>
        </View>
      </View>
    );
  }
}
