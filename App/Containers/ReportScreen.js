

import React, { Component } from "react"
import { ScrollView, View, TouchableOpacity, Alert } from "react-native"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import styles from "./Styles/InvoiceSubScreenStyle"
import ReportCard from "../Components/Reportcard"
import { Colors } from "../Themes"
import * as RNFS from "react-native-fs"
import {
  userReport,
  userReportFromCache,
  userReportTitle,
  userReportTitleFromCache,
} from "../Redux/Actions/reportAction"
import { Cache } from "react-native-cache"
import AsyncStorage from "@react-native-community/async-storage"
import RNFetchBlob from "rn-fetch-blob"
import { PermissionsAndroid } from "react-native"
const uuidV4 = require("uuid/v4")

class ReportScreen extends Component {
  state = {
    token: null,
    reportId: 0,
    reportSection: false,
    files: [],
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
        this.requestCameraPermission()
      }
    } catch (err) {
      console.warn(err)
    }
  }

  componentDidMount() {
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
          dispatch(userReportTitle(this.state.token))
            .then(res => {
              if (res.payload.status) {
                this.setState(
                  {
                    reportId: res.payload.package.data[0].id,
                  },
                  () => {
                    dispatch(userReport(this.state.token, { id: this.state.reportId }))
                      .then(res => {
                        if (res.payload.status === true) {
                          var reportData = res.payload
                          cache.setItem("userReport", reportData, err => {})
                        }
                      })
                      .catch(err => {
                        cache.getItem("userReport", function(err, value) {
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
                cache.setItem("userReportTitle", data, err => {})
              }
            })
            .catch(err => {
              cache.getItem("userReportTitle", function(err, value) {
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

  render() {
    const { reportId, reportSection } = this.state
    const { data, title } = this.props.reportData
    const reports = data ? data.package.data : []
    const reportTitles = title ? title.package.data : []
    let keys = []
    keys.push(Object.keys(reports[0] ? reports[0] : {}))
    _DOCUMENT_PATH = RNFS.DocumentDirectoryPath

    return reportTitles.length > 0 ? (
      <View style={styles.body}>
        {!reportSection && (
          <View style={{ backgroundColor: "#fff", marginBottom: 40,width: '96%' }}>
            {reportTitles.length > 0 ? (
              reportTitles.map((item, i) => (
                <TouchableOpacity
                  key={uuidV4()}
                  style={{
                    backgroundColor: Colors.rootsyPrimary,
                    height: 40,
                    borderRadius: 4,
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: Colors.rootsyPrimary,
                    marginBottom: 12.5,
                  }}
                  onPress={() => this.props.navigation.navigate("ReportScreenDetails", {
                    id: item.id,
                  })}
                >
                  <RNText
                    text={`${item.name}`}
                    style={{
                      textAlign: "center",
                      letterSpacing: 2,
                      fontWeight: "600",
                      color: Colors.rootsyPrimary,
                      fontSize: 18,
                      padding:8,
                      color: 'white'
                
                    }}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <RNText tx={`common.notFound`} style={{ width: "98%", textAlign: "center" }} />
            )}
          </View>
        )}
      </View>
    ) : (
      <View></View>
    )
  }
}

const mapStateToProps = state => {
  return {
    reportData: state.reportData,
    userData: state.userData.data,
  }
}

export default connect(mapStateToProps)(ReportScreen)
