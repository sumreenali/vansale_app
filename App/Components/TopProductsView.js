import React, { Component } from "react"
import { ScrollView, View, TouchableOpacity, Alert, Text } from "react-native"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import styles from "../Containers/Styles/InvoiceSubScreenStyle"
import ReportCard from "../Components/Reportcard"
import { Colors } from "../Themes"
import * as RNFS from "react-native-fs"
// import FileViewer from "react-native-file-viewer"
import {
  userTopProductsReport,
  userReportFromCache,
  userReportTitle,
  userReportTitleFromCache,
} from "../Redux/Actions/reportAction"
import { Cache } from "react-native-cache"
import AsyncStorage from "@react-native-community/async-storage"
import RNFetchBlob from "rn-fetch-blob"
import DocumentPicker from "react-native-document-picker"
const uuidV4 = require("uuid/v4")
var Mailer = require("NativeModules").RNMail

class TopProductsView extends Component {
  state = {
    token: null,
    reportId: 0,
    files: [],
  }

  componentDidMount() {
    this.getRports()
  }

  getRports() {
    this.requestCameraPermission()
    const { userData, dispatch } = this.props

    var cache = new Cache({
      namespace: "FGMM",
      policy: {
        maxEntries: 50000,
      },
      backend: AsyncStorage,
    })

    if (userData) {
      this.setState(
        {
          token: userData.package.token,
        },
        () => {
          dispatch(userReportTitle(this.state.token, "amazon"))
            .then(res => {
              if (res.payload.status) {
                this.setState(
                  {
                    reportId: res.payload.package.data.length > 1 ? res.payload.package.data[1].id : 0,
                  },
                  () => {
                    dispatch(userTopProductsReport(this.state.token, { id: this.state.reportId }))
                      .then(res => {
                        if (res.payload.status === true) {
                          var reportData = res.payload
                          cache.setItem("userTopProductsReport", reportData, err => { })
                        }
                      })
                      .catch(err => {
                        cache.getItem("userTopProductsReport", function (err, value) {
                          if (value) {
                            if (value.status === true) {
                              dispatch(userReportFromCache(value))
                            }
                          }
                        })
                        console.log(err)
                      })
                  },
                )
                const data = res.payload
                cache.setItem("userReportTitle", data, err => { })
              }
            })
            .catch(err => {
              cache.getItem("userReportTitle", function (err, value) {
                if (value) {
                  if (value.status === true) {
                    dispatch(userReportTitleFromCache(value))
                  }
                }
              })
              console.log(err)
            })
        },
      )
    }
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "FGMM Storage Permission",
          message: "FGMM app want to use your local storage" + "to download some report.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  downloadCSVfile = data => {
    let headerString = ""
    let keyData = data ? data[0] : {}
    let key = []
    Object.keys(keyData).map((obj, j) => {
      key.push(obj)
      return j
    })

    headerString = `${key.join()}\n`

    let rowData = data ? data : []

    let row = []
    rowData.map((item, i) => {
      Object.keys(item).map((keyVal, j) => {
        if ((j + 1) % 2 == 0) {
          row.push(`${item[keyVal]}\n`)
        } else {
          row.push(`${item[keyVal]}`)
        }
        return j
      })
      return i
    })

    let singlerow = `${row.join()}\n`

    const csvString = `${headerString}${singlerow}`

    // write the current list of answers to a local csv file
    const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/${"FGMM_REPORT_" +
      new Date().getTime() +
      ".csv"}`
    const pathToWriteDocument = `${RNFetchBlob.fs.dirs.DocumentDir}/${"FGMM_REPORT_" +
      new Date().getTime() +
      ".csv"}`
    // pathToWrite /storage/emulated/0/Download/data.csv
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, "utf8")
      .then(() => {
        // const path = pathToWrite
        // FileViewer.open(path) // absolute-path-to-my-local-file.
        //   .then(() => {
        //     // success
        //   })
        //   .catch(error => {
        //     // error
        //   })
        Alert.alert(`File successfully downloaded.`, `${pathToWrite}`)
      })
      .catch(error => console.error(error))

    RNFetchBlob.fs
      .writeFile(pathToWriteDocument, csvString, "utf8")
      .then(() => {
        // const path = pathToWrite
        // FileViewer.open(path) // absolute-path-to-my-local-file.
        //   .then(() => {
        //     // success
        //   })
        //   .catch(error => {
        //     // error
        //   })
        // Alert.alert(`File successfully downloaded.`, `${pathToWrite}`)
      })
      .catch(error => console.error(error))
  }

  chooseFile = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      })
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      )

      RNFetchBlob.fs
        .stat(res.uri)
        .then(stats => {
          Mailer.mail(
            {
              subject: "Screenshot",
              recipients: ["mohit@gmail.com"],
              body: "<b> Please find the attached file of the report. </b>",
              isHTML: true,
              attachment: {
                path: stats.path,
                type: res.type,
              },
            },
            (error, event) => {
              console.log("errror", error)
            },
          )
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert("File canceled.")
      } else {
        throw err
      }
    }
  }

  render() {
    const { dataTopProducts, title } = this.props.reportTopProductsData
    console.log('state user top products report data:', this.props.reportTopProductsData)
    const reports = dataTopProducts ? dataTopProducts.package.data : []
    const reportTitles = title ? title.package.data : []
    console.log('resport tilte:', reportTitles)
    let keys = []
    keys.push(Object.keys(reports[0] ? reports[0] : {}))
    _DOCUMENT_PATH = RNFS.DocumentDirectoryPath

    return (
      <View style={styles.body}>


        <View style={styles.header}>
          {
            keys[0].map((item, i) => (
              <RNText
                key={uuidV4()}
                text={`${item.toUpperCase()}`}
                style={[styles.headerText, { fontWeight: "600" }]}
              />
            ))}
        </View>


        <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
          {
            reports.map((item, i) => {
              return <ReportCard key={uuidV4()} keys={keys} item={item} />
            })}
          <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 30 }}>
            <TouchableOpacity
              style={{
                maxWidth: "45%",
                height: 40,
                backgroundColor: Colors.rootsyPrimary,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 3,
                paddingHorizontal: 7.5,
                paddingVertical: 5,
              }}
              onPress={() => this.chooseFile()}
            >
              <RNText
                tx={"reportScreen.emailtBtnText"}
                style={{
                  color: "#fff",
                  fontSize: 16,
                  // width: "99%",
                  minHeight: "70%",
                  textAlign: "center",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                maxWidth: "45%",
                height: 40,
                backgroundColor: Colors.rootsyPrimary,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 3,
                paddingHorizontal: 7.5,
                paddingVertical: 5,
              }}
              onPress={() => this.downloadCSVfile(reports)}
            >
              <RNText
                tx={"reportScreen.exportBtnText"}
                style={{
                  color: "#fff",
                  fontSize: 16,
                  // width: "100%",
                  minHeight: "70%",
                  textAlign: "center",
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomView} />
        </ScrollView>

      </View>
    )
  }

}

const mapStateToProps = state => {
  return {
    reportTopProductsData: state.reportTopProductsData,
    userData: state.userData.data,
  }
}

export default connect(mapStateToProps)(TopProductsView)
