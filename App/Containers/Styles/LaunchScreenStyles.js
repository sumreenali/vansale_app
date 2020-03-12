import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles } from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingBottom: Metrics.baseMargin,
    backgroundColor: "#ccc"
  },
  splashBg: {
    flex: 1,
    backgroundColor: "#FFD33E"
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: "contain"
  },
  centered: {
    alignItems: "center"
  },
  splashLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoStyles: {
    shadowColor: "#000",
    shadowOffset: {
      height: 1,
       width: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    resizeMode: "contain",
    width: "85%"
  }
});
