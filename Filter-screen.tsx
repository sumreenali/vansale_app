import React, { PureComponent } from "react"
import {
  Image,
  ImageStyle,
  Platform,
  TextStyle,
  ViewStyle,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  NativeModules,
  Dimensions,
} from "react-native"
import {
  Grayscale,
  Sepia,
  Tint,
  ColorMatrix,
  concatColorMatrices,
  invert,
  contrast,
  saturate,
} from "react-native-color-matrix-image-filters"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Wallpaper } from "../../components/wallpaper"
import { Header } from "../../components/header"
import { color, spacing } from "../../theme"
import { logoIgnite, heart } from "./"
import { BulletItem } from "../../components/bullet-item"
import { Api } from "../../services/api"
import { save } from "../../utils/storage"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const BOLD: TextStyle = { fontWeight: "bold" }

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 18,
  lineHeight: 22,
  textAlign: "center",
  letterSpacing: 1.75,
}

export interface DemoScreenProps extends NavigationScreenProps<{}> {}

// var ImagePicker = NativeModules.ImageCropPicker

// import Icon from "react-native-vector-icons/FontAwesome"
import { ImageFilter } from "react-native-image-filter-kit"
// import FastImage from "react-native-fast-image";
const screenWidth = Dimensions.get("window").width
export class FilterScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      image: null,
      images: null,
      width: Dimensions.get("window").width,
      val: 1, // Amount
      step: 0.1,
      type: "Grayscale",
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0,
      rgba: 10,
      max: 10,
      min: 0,
      angle: 0,
      data: [
        {
          type: "Invert",
          max: 0,
          min: 0,
          step: 1,
          val: 0,
        },
        // {
        //   type: "RGBA",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        // {
        //   type: "Brightness",
        //   max: 10,
        //   min: 0,
        //   step: 1,
        //   val: 0,
        // },
        {
          type: "Browni",
          max: 0,
          min: 0,
          step: 1,
          val: 0,
        },

        // {
        //   type: "Contrast",
        //   max: 10,
        //   min: -10,
        //   step: 1,
        // val: 0,
        // },
        {
          type: "Cool",
          max: 0,
          min: 0,
          step: 1,
          val: 0,
        },

        {
          type: "Grayscale",
          max: 1,
          min: 0,
          step: 0.1,
          val: 0,
        },
        // {
        //   type: "HueRotate",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },

        // {
        //   type: "Kodachrome",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },

        // {
        //   type: "Lsd",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        // {
        //   type: "LuminanceToAlpha",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        // {
        //   type: "Night",
        //   max: 1,
        //   min: 0,
        //   step: 0.1,
        // val: 0,
        // },
        // {
        //   type: "Nightvision",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        {
          type: "Normal",
          max: 0,
          min: 0,
          step: 1,
          val: 0,
        },
        {
          type: "Temperature",
          max: 0,
          min: 0,
          step: 1,
          val: 0,
        },
        // {
        //   type: "Threshold",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        // {
        //   type: "Tint",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },

        // {
        //   type: "ToBGR",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        // {
        //   type: "Vintage",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        {
          type: "Warm",
          max: 0,
          min: 0,
          step: 1,
          val: 0,
        },
        // {
        //   type: "Achromatomaly",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        // {
        //   type: "Achromatopsia",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        // {
        //   type: "Deuteranomaly",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        // {
        //   type: "Deuteranopia",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        // {
        //   type: "Protanomaly",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        // {
        //   type: "Protanopia",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        // {
        //   type: "Tritanomaly",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },
        // {
        //   type: "Tritanopia",
        //   max: 0,
        //   min: 0,
        //   step: 1,
        // val: 0,
        // },

        {
          type: "Sepia",
          max: 1,
          min: 0,
          step: 0.1,
          val: 0,
        },
        {
          type: "Temperature",
          max: 10,
          min: -10,
          step: 1,
          val: 0,
        },
        // {
        //   type: "Threshold",
        //   max: 20,
        //   min: 0,
        //   step: 2,
        // val: 0,
        // },
        // {
        //   type: "Tint",
        //   max: 1,
        //   min: -1,
        //   step: 0.1,
        // val: 0,
        // }
      ],
    }
  }

  componentDidMount() {
    const image = this.props.navigation.getParam("image", "NO-ID")
    // console.warn(this.props.navigation.getParam("image", "NO-ID"))
    const data = {
      uri: "https://www.polytec.com.au/img/products/960-960/white.jpg",
    }
    this.setState({
      image: image !== "NO-ID" ? image : data,
    })
  }
  nextScreen = () => {
    this.props.navigation.navigate("first")
  }

  renderImage(image) {
    return (
      <Image
        style={{
          width: screenWidth * 0.96,
          height: screenWidth * 0.7,
          marginBottom: 50,
          marginTop: 20,
          resizeMode: "contain",
        }}
        source={image}
      />
    )
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf("video/") !== -1) {
      return this.renderVideo(image)
    }

    return this.renderImage(image)
  }

  render() {
    const {
      val,
      type,
      red,
      green,
      blue,
      alpha,
      width,
      rgba,
      data,
      step,
      max,
      min,
      angle,
      image,
      edit,
    } = this.state
    // console.warn(image)
    const uri = "./white.jpg"
    return (
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            marginTop: 10,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              marginLeft: width * 0.04,
              marginBottom: 5,
              color: "red",
            }}
          ></Text>
          <ImageFilter
            config={{
              // disableCache: false,
              name: "Earlybird",
              // name: type,
              image: {
                name: "SoftLightBlend",
                // name: type,
                resizeCanvasTo: "dstImage",
                dstTransform: {
                  scale: "CONTAIN",
                  rotate: `${angle}deg`,
                  // offset: {
                  //   x: 30,
                  //   y: 40
                  // }
                },

                dstImage: {
                  name: "Emboss",
                  // name: type,

                  image: (
                    <Image
                      style={{
                        width: width * 0.96,
                        height: width * 0.96,
                        borderWidth: 1.5,
                        borderColor: "#000",
                        borderRadius: 5,
                      }}
                      source={image || require(uri)}
                      resizeMode={"contain"}
                    />
                    // <FastImage
                    //   style={{ width: width * 0.96, height: width * 0.96 }}
                    //   source={{
                    //     uri,
                    //     // headers: { Authorization: "someAuthToken" },
                    //     // priority: FastImage.priority.high
                    //   }}
                    //   // resizeMode={FastImage.resizeMode.contain}
                    // />
                  ),
                },
                srcTransform: {
                  anchor: { x: 0.5, y: 1 },
                  translate: { x: 0.5, y: 1 },
                },
                srcImage: {
                  name: type,
                  image: {
                    name: "RadialGradient",
                    colors: ["rgba(0, 0, 255, 1)", "#00ff00", "green"],
                    stops: [0.25, 0.75, 1],
                    center: { x: "50w", y: "100h" },
                  },
                  amount: val,
                  red,
                  green,
                  blue,
                  alpha,
                  //   desaturation: val
                },
              },
            }}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", height: 50, marginTop: 10 }}>
          <Text style={{ color: "#333" }}>{type.toUpperCase()}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // flexWrap: "wrap",
            flexDirection: "row",
            paddingBottom: 20,
          }}
        >
          {/* <ScrollView style={{ flex: 1 }} horizontal>
            {data.map((item, i) => (
              <TouchableOpacity
                key={`${type}-${i}`}
                onPress={() =>
                  this.setState({
                    type: item.type,
                    max: item.max,
                    min: item.min,
                    step: item.step,
                    val: (item.max + item.min) / 2,
                    angle: 0,
                  })
                }
                style={{
                  marginTop: 25,
                  marginLeft: 10,
                  backgroundColor: "#eee",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 100,
                  minWidth: 100,
                }}
              >
                <Text style={{ fontWeight: "500", color: "#000" }}>{item.type}</Text>
                <ImageFilter
                  config={{
                    // disableCache: true,
                    disableCache: false,
                    name: "Earlybird",
                    image: {
                      name: "SoftLightBlend",
                      resizeCanvasTo: "dstImage",
                      dstTransform: {
                        scale: "CONTAIN",
                      },

                      dstImage: {
                        name: "Emboss",

                        image: (
                          <Image
                            style={{ width: 100, height: 100 }}
                            source={ image || require(uri)}
                            resizeMode={"cover"}
                          />
                        ),
                      },
                      srcTransform: {
                        anchor: { x: 0.5, y: 1 },
                        translate: { x: 0.5, y: 1 },
                      },
                      srcImage: {
                        name: item.type,
                        image: {
                          name: "RadialGradient",
                          colors: ["rgba(0, 0, 255, 1)", "#00ff00", "green"],
                          stops: [0.25, 0.75, 1],
                          center: { x: "50w", y: "100h" },
                        },

                        //   desaturation: val
                      },
                    },
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView> */}
        </View>
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => this.nextScreen()}
            style={{
              width: screenWidth * 0.9,
              height: 40,
              backgroundColor: "#eee",
              elevation: 1,
              borderRadius: 20,
              justifyContent: "center",
              alignItem: "center",
              left: screenWidth * 0.035,
            }}
          >
            <Text style={styles.text}>Upload Image</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#989",
  },
  button: {
    backgroundColor: "blue",
    marginBottom: 10,
  },
  text: {
    color: "#555",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
})
