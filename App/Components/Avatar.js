import React from "react"
import { View, Text, Image } from "react-native"
import Styles from "./Styles/Avtar"

class Avatar extends React.Component {
  render() {
    return (
      <View style={Styles.container}>
        <Image source={{ uri: this.props.image }} style={Styles.avtar} />
      </View>
    )
  }
}

export default Avatar
