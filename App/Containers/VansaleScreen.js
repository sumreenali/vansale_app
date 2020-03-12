import React, { PureComponent } from "react"
import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Text,
  Alert,
} from "react-native"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import styles from "./Styles/InvoiceSubScreenStyle"
import RedeemRequestList from "../Components/RedeemRequestList"
const uuidV4 = require("uuid/v4")

import {
  getVanSales,
  getVanSalesFromCache,
  getVanSalesForDropDown,
  getVanSalesDropdownFromCache,
  getVanSalesRedeemedPointsList,
  redeemVansalePointList,
} from "../Redux/Actions/vansalesActions"
import VansaleList from "../Components/Vansalelist"
import { Cache } from "react-native-cache"
import AsyncStorage from "@react-native-community/async-storage"

import { Colors } from "../Themes"
import { any } from "ramda"
import { indexOf } from "ramda"
const dataDummy = []
class VansaleScreen extends React.Component {
  state = {
    customer_id: 0,
    token: null,
    region_id: 0,
    filterVan: "All",
    toggle: false,
    total_money: 0,
    total_points: 0,
    total_quantity: 0,
    rate: 0,
    filterRes: true,
    isLoading: false,
    isClear: false,
    vansaleRedeemedData: [],
    pointData: 0,
    requestArra: [],
    isRedeemButtonActive: false,
    vansale_customer_unique_id: 0,
    pointFinilizeArray: [],
    vansales_customer_id: 0,
    newData: [],
    newId: 0,
  }
  
  onSelectRedeemMyPoints = value => {
    this.setState({
      total_money: value + total_money,
    })
  }

  componentDidUpdate() {
    const { misc } = this.props
    if (misc.clearAllFilters && !this.state.isClear) {
      this.setState(
        {
          isClear: true,
          filterVan: "All",
          region_id: 0,
        },
        () => {
          const { dispatch, userData } = this.props

          this.setState(
            {
              token: userData.data.package.token || value.package.token,
              customer_id: userData.data.package.id || value.package.id,
              region_id: userData.data.package.region[0].id,
            },
            () => {
              const { token, region_id } = this.state

              dispatch(getVanSales(token, { region_id, dates: "", vansale: "" }))
                .then(res => {
                  if (res.payload.status === true) {
                    var cache = new Cache({
                      namespace: "FGMM",
                      policy: {
                        maxEntries: 50000,
                      },
                      backend: AsyncStorage,
                    })
                    cache.setItem("vansalesData", res.payload, function(err) {})
                  }
                })
                .catch(err => {
                  var cache = new Cache({
                    namespace: "FGMM",
                    policy: {
                      maxEntries: 50000,
                    },
                    backend: AsyncStorage,
                  })
                  cache.getItem("vansalesData", function(err, value) {
                    if (value) {
                      if (value.status === true) {
                        dispatch(getVanSalesFromCache(value))
                      }
                    }
                  })
                })

              dispatch(getVanSalesForDropDown(token, { region_id, dates: "", vansale: "" }))
                .then(res => {
                  if (res.payload.status === true) {
                    var cache = new Cache({
                      namespace: "FGMM",
                      policy: {
                        maxEntries: 50000,
                      },
                      backend: AsyncStorage,
                    })
                    cache.setItem("vansalesDropdown", res.payload, function(err) {})
                  }
                })
                .catch(err => {
                  var cache = new Cache({
                    namespace: "FGMM",
                    policy: {
                      maxEntries: 50000,
                    },
                    backend: AsyncStorage,
                  })
                  cache.getItem("vansalesDropdown", function(err, value) {
                    if (value) {
                      if (value.status === true) {
                        dispatch(getVanSalesDropdownFromCache(value))
                      }
                    }
                  })
                })
            },
          )
        },
      )
    }
  }

  pushtoArray = id => {
    this.state.pointData = id
    console.log(this.state.pointData, "id")
    this.setState({
      pointFinilizeArray: [],
    })

    if (this.state.requestArra.includes(id)) {
      console.log("already in the list")
      this.state.requestArra.pop(id)
      console.log("the request array is :: ", this.state.requestArra)
      for (let i = 0; i < this.state.requestArra.length; i++) {
        this.state.pointFinilizeArray.push(
          this.state.vansaleRedeemedData.filter(res => res.id == this.state.requestArra[i]),
        )
        console.log(this.state.pointFinilizeArray, "Finalize ararrarr")
      }

      this.removePoint(id)
    } else {
      console.log("data need to be pushed", id)
      this.state.requestArra.push(id)
      console.log("the request array is :: ", this.state.requestArra),
        console.log(this.state.vansaleRedeemedData, "vansal line data")
      for (let i = 0; i < this.state.requestArra.length; i++) {
        this.state.pointFinilizeArray.push(
          this.state.vansaleRedeemedData.filter(res => res.id == this.state.requestArra[i]),
        )
        console.log(this.state.pointFinilizeArray, "Final point array")
      }
      this.addPointData()
    }
  }


 
  addPointData() {
    console.log("add the point")
    this.state.pointFinilizeArray.forEach(res => {
      this.setState({
        total_points: this.state.total_points + res.points,
      })

      console.log(res, "res")
    })
  }
  removePoint(data) {
    console.log("remove the point")

    let point = this.state.pointFinilizeArray[data].points
    this.setState({
      total_points: this.state.total_points - point,
    })
    console.log(data, "data id")
  }



  componentDidMount() {
    const { dispatch, userData } = this.props

    this.setState(
      {
        token: userData.data.package.token || value.package.token,
        customer_id: userData.data.package.id || value.package.id,
        region_id: userData.data.package.region[0].id,
      },
      () => {
        const { token, region_id } = this.state

        dispatch(getVanSales(token, { region_id, dates: "", vansale: "" }))
          .then(res => {
            if (res.payload.status === true) {
              var cache = new Cache({
                namespace: "FGMM",
                policy: {
                  maxEntries: 50000,
                },
                backend: AsyncStorage,
              })
              cache.setItem("vansalesData", res.payload, function(err) {})
            }
          })
          .catch(err => {
            var cache = new Cache({
              namespace: "FGMM",
              policy: {
                maxEntries: 50000,
              },
              backend: AsyncStorage,
            })
            cache.getItem("vansalesData", function(err, value) {
              if (value) {
                if (value.status === true) {
                  dispatch(getVanSalesFromCache(value))
                }
              }
            })
          })

        dispatch(getVanSalesForDropDown(token, { region_id, dates: "", vansale: "" }))
          .then(res => {
            if (res.payload.status === true) {
              var cache = new Cache({
                namespace: "FGMM",
                policy: {
                  maxEntries: 50000,
                },
                backend: AsyncStorage,
              })
              cache.setItem("vansalesDropdown", res.payload, function(err) {})
            }
          })
          .catch(err => {
            var cache = new Cache({
              namespace: "FGMM",
              policy: {
                maxEntries: 50000,
              },
              backend: AsyncStorage,
            })
            cache.getItem("vansalesDropdown", function(err, value) {
              if (value) {
                if (value.status === true) {
                  dispatch(getVanSalesDropdownFromCache(value))
                }
              }
            })
          })
      },
    )
  }

  _performAction = id => {
    this.props
      .dispatch(getVanSalesRedeemedPointsList(this.state.token, id, 0))
      .then(res => this.setState({ vansaleRedeemedData: res.payload.package.data })),
      () => {
        console.log("data of redeemed : ", this.state.vansaleRedeemedData)
        if (res.payload.package.data != null) {
          this.setState({
            isRedeemButtonActive: true,
          })
        }
      }
  }

  _performReedeemAction = (idArray) => {
    console.log("clicked on request redeem point button")

    var paramsformData = new FormData();
    var paramsArr = []
    const { newData } = this.state

    console.log(newData, "the newest data")
    newData.forEach(element => {
      paramsArr.push(element.id)
    })
    console.log(paramsArr)
    for (i = 0; i < paramsArr.length; i++){
      paramsformData.append("point_ids"+ "[" + [i] + "]",paramsArr[i] )
    }

    console.log(paramsArr , "hello world is this the Value for")
    this.props.dispatch(redeemVansalePointList(this.state.token, paramsformData))
    .then(res => {
        if (res.payload.status === true) {
          Alert.alert(translate("common.claimSend"))
        }
      })
      .catch(err => {
        Alert.alert(translate("common.failed"))
      })
  }

  filterVan = id => {
    var cache = new Cache({
      namespace: "FGMM",
      policy: {
        maxEntries: 50000,
      },
      backend: AsyncStorage,
    })
    const { dispatch } = this.props
    const { filterVan, region_id } = this.state
    this.setState({ isLoading: true })
    cache.getItem("userData", (err, value) => {
      if (value) {
        if (value.status === true) {
          dispatch(
            getVanSales(value.package.token, { region_id: region_id, dates: "", vansale: id }),
          )
            .then(res => {
              this.setState({ isLoading: false, filterRes: true })
              if (res.payload.status === true) {
                cache.setItem("invoiceData", res.payload, function(err) {})
              }
            })
            .catch(err => {
              this.setState({ isLoading: false, filterRes: false })
              cache.getItem("invoiceData", function(err, value) {
                if (value) {
                  if (value.status === true) {
                    dispatch(getVanSalesFromCache(value))
                  }
                }
              })
            })
        }
      }
    })
  }

  _getTotalAmount = () => {
    const { newData } = this.state
    var total_money = 0
    var total_points = 0
    var rate = 0
    newData.forEach(element => {
      total_money =
        total_money +
        Number.parseFloat(element.amount)
    })

    newData.forEach(element => {
      total_points =
      total_points +
        Number.parseFloat(element.points)
    })
    this.setState({ total_money, total_points, rate })
  }

  render() {
    const { vansalesData, vanSaleDropdown, vansale_customer_unique_id } = this.props
    const {
      toggle,
      total_money,
      total_points,

    } = this.state

    const data = vansalesData ? vansalesData.package.data : dataDummy

    let data2 = [{ value: "All", id: "" }]

    const vans = vanSaleDropdown ? vanSaleDropdown.package.data : []
    vans.map((item, i) => {
      data2.push({ value: item.name, id: item.id })
      return i
    })
    return (
      <View style={styles.body}>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
          }}
        >
 
        </View>
        <View style={{ height: 40, alignItems: "center", alignContent: "center" }}>
          <RNText
            tx={"vanSaleScreen.customer"}
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, color: "#ffd23e" }}
          />
        </View>
        <View style={styles.header}>
          <RNText tx={"vanSaleScreen.dataName"} style={[styles.headerText, { flex: 1 }]} />
          <RNText tx={"vanSaleScreen.dataPhone"} style={[styles.headerText, { flex: 1 }]} />
          <RNText tx={"vanSaleScreen.dataCode"} style={[styles.headerText, { flex: 1 }]} />
          <RNText tx={"vanSaleScreen.dataDate"} style={[styles.headerText, { flex: 1 }]} />
          <RNText tx={"vanSaleScreen.Action"} style={[styles.headerText, { flex: 0.8 }]} />
        </View>
        <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
          {this.state.isLoading === true ? (
            <ActivityIndicator color={Colors.rootsyPrimary} size="small" />
          ) : (
            data.map((item, i) => (
              <TouchableOpacity
                key={uuidV4()}
                style={{ width: "100%" }}
                onPress={() =>
                  this.setState(
                    {
                      toggle: !toggle,
                      total_money: item.total_money || 0,
                      total_points: item.total_points || 0,
                      total_quantity: item.total_quantity || 0,
                      vansales_customer_id: item.id || 0,
                      newId: item.id || 0,
                    },
                    () => {
                      console.log(this.state.vansales_customer_id)
                      this._performAction(this.state.vansales_customer_id)
                    },
                  )
                }
              >
                <VansaleList item={item} key={uuidV4()} />
              </TouchableOpacity>
            ))
          )}
          {toggle && (
            <View style={{ width: "100%" }}>
              <View
                style={{
                  marginTop: 20,
                  width: "100%",
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: "#FED340",
                  alignContent: "center",
                  height: 2,
                }}
              ></View>
              <View style={{ height: 30, top: 10, padding: 10 }}>
                <RNText
                  tx={"vanSaleScreen.requestRedeem"}
                  style={{ paddingLeft: 10, fontWeight: "bold", fontSize: 20, color: "#ffd23e" }}
                />
              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                legacyImplementation={false}
                contentContainerStyle={{ alignSelf: "flex-start" }}
                data={this.state.vansaleRedeemedData}
                keyExtractor={this.state.vansaleRedeemedData.id}
                renderItem={({ item }) => (
                  <View style={{ height: 280, top: 30, paddingLeft: 10 }}>
                    <RedeemRequestList
                      item={item}
                      performRedeemAction={(dataItem, action) => {
                        var newData = this.state.newData
                        var tempData = []
                        this.setState({ newId: dataItem.id })
                        if (action === "push") {
                          newData.push(dataItem)
                          this.setState({ newData }, () => {
                            this._getTotalAmount()
                          })
                        } else if (action === "pop") {
                          this.state.newData.forEach((element, i) => {
                            if (dataItem.id !== element.id) {
                              tempData.push(element)
                            }
                          })
                          this.setState({ newData: tempData }, () => {
                            this._getTotalAmount()
                          })
                        }
                      }}
                    />
                  </View>
                )}
              />
              <View
                style={{
                  marginTop: 20,
                  width: "90%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <RNText style={{ fontWeight: "500" }} tx={`vanSaleScreen.totalPoint`} />
                <RNText style={{ fontWeight: "500" }} text={`${total_points}`} />
              </View>
              <View
                style={{
                  marginTop: 20,
                  width: "90%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <RNText style={{ fontWeight: "500" }} tx={`vanSaleScreen.totalMoney`} />
                <RNText style={{ fontWeight: "500" }} text={`${total_money}`} />
              </View>

              <View
                style={{
                  marginTop: 20,
                  width: "90%",
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: "#FED340",
                  alignContent: "center",
                  height: 2,
                }}
              ></View>

              <TouchableOpacity onPress={() => this._performReedeemAction()}>
                <View
                  style={{
                    marginTop: 20,
                    width: "90%",
                    alignSelf: "center",
                    justifyContent: "center",
                    backgroundColor: "#FED340",
                    alignContent: "center",
                    height: 45,
                  }}
                >
                  <RNText
                    style={{ fontWeight: "500", alignContent: "center", alignSelf: "center" }}
                    tx={`vanSaleScreen.RequestRedeempoint`}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.bottomView} />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    vansalesData: state.vansalesData.data,
    vanSaleDropdown: state.vansalesData.dropdown,
    misc: state.misc,
  }
}

export default connect(mapStateToProps)(VansaleScreen)
