import React, { PureComponent } from "react"
import { View, Text, TouchableOpacity, Linking } from "react-native"
import EntypoIcon from "react-native-vector-icons/Entypo"
import styles from "./Styles/PrimaryCardStyle"
import { Colors } from "../Themes"
import FastImage from "react-native-fast-image"

export default class PrimaryCard extends PureComponent {
  render() {
    const { uri, textSecond, textFirst, link } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <FastImage
            source={{
              uri,
              headers: { Authorization: "upcomingevents" },
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.img}
          />
        </View>
        <View style={styles.textContaier}>
          <View style={styles.textContaierLeft}>
            <View style={styles.bandName}>
              <Text style={styles.bandNameTxt}>{textFirst}</Text>
            </View>
            <View style={styles.eventDate}>
              <Text style={styles.eventDateTxt}>{textSecond}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL(link)} style={styles.textContaierRight}>
            <EntypoIcon
              name="ticket"
              size={23}
              color={Colors.rootsyPrimary}
              style={styles.ticketIcon}
            />
            <Text style={styles.buyTxt}>Buy Ticket</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
