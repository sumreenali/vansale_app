import { StyleSheet, Dimensions } from "react-native"
import { Colors } from "../../Themes"

const screenWidth = Dimensions.get("window").width

export default StyleSheet.create({
  body: {
    minHeight: 45,
    width: "98%",
    backgroundColor: "#eee",
    marginBottom: 10
  },
  container: {
    flex: 1,
    width: "98%",
    minHeight: 200,
    backgroundColor: Colors.snow,
    padding: 4,
    borderRadius: 3,
    borderColor: Colors.rootsyPrimary,
    borderWidth: 1,
    elevation: 4,
  },
  invoiceText1: {
    fontSize: 11,
    width:"97%",
    textAlign: "center"
  },
  invoiceText2: {
    fontSize: 12,
  },
  Row1: {
    flex: 2,
  },

  Row1ColMain: {
    flex: 1,
    borderBottomRightRadius: 400,
    flexDirection: "row",
    borderBottomColor: Colors.rootsyPrimary,
    borderBottomWidth: 1,
  },

  Row1Col1: {
    width: "55%",
    height: "100%",
    borderBottomRightRadius: 400,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 3,
    borderColor: Colors.rootsyPrimary,
  },

  Row1Col2: {
    width: "45%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 400,
  },

  Row2: {
    flex: 2,
    flexDirection: "row",
    borderBottomColor: Colors.rootsyPrimary,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 40,
  },

  Row2Col1: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",

    borderRightWidth: 1,
    borderColor: Colors.rootsyPrimary,
  },

  Row2Col2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  Row3: {
    flex: 1,
    borderBottomColor: Colors.rootsyPrimary,
    borderBottomWidth: 1,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  Row4: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.rootsyPrimary,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 40,
  },

  Row4Col1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: Colors.rootsyPrimary,
  },

  Row4Col2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: Colors.rootsyPrimary,
  },

  Row4Col3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  Row5: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.rootsyPrimary,
    borderBottomWidth: 1,
    borderBottomRightRadius: 40,
  },
  Row6: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.rootsyPrimary,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 40,
  },

  Row6Col1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: Colors.rootsyPrimary,
  },

  Row6Col2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  Row7: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  A1: {
    minHeight: 45,
    backgroundColor: "#eee",
    width: screenWidth * 0.98,
    flexDirection: "row",
  },
  A1C1: {
    flex: 2,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  A1C3: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
})
