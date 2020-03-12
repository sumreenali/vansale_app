import React, { Component } from "react"
import { View, Image, Text, TouchableOpacity } from "react-native"
import styles from "./Styles/SecondaryCardStyle"
import { Colors } from "../Themes"
import Icon from "react-native-vector-icons/AntDesign"

export default class SecondaryCard extends Component {
  state = {
    isInterested: false,
  }
  render() {
    const { tag, uri, icon } = this.props
    const { isInterested } = this.state
    return (
      <View style={styles.container}>
        <Image source={uri} style={styles.img} resizeMode="cover" />
        <TouchableOpacity
          onPress={() => this.setState({ isInterested: !isInterested })}
          style={styles.bottomTag}
        >
          {isInterested ? (
            <Icon name={icon} size={17} color={"green"} />
          ) : (
            <Icon name={icon} size={14} color={Colors.snow} />
          )}
          <Text style={styles.bottomTagTxt}>{tag}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
