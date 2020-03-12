import { StyleSheet, Dimensions } from 'react-native'

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default StyleSheet.create({
  avtar: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderWidth: 1
  },
  container: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  }
});
