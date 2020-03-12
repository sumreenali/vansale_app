import React, { Component } from "react"
import { View, ScrollView, ActivityIndicator, TouchableOpacity, Text } from "react-native"
import { Cache } from "react-native-cache"
import styles from "./Styles/PurchaseinvoiceviewStyle"
import OffersPH from "./OfferPhComponent"
import RNText from "../Components/RNText"
import { connect } from "react-redux"
import DatePicker from "react-native-datepicker"
import {
  getPointHistory,
  getPointHistoryFromCache,
  getBalance,
  getBalanceFromCache,
} from "../Redux/Actions/balanceActions"
import AsyncStorage from "@react-native-community/async-storage"
import { Colors } from "../Themes"
import { clearAllFilters } from "../Redux/Actions/misc"
const uuidV4 = require("uuid/v4")
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropdownModel from '../Components/DropdownModel'

class OffersPointHistoryComponent extends Component {
  constructor() {
    super()
    this.state = {
      from: "",
      to: "",
      fromSelected: false,
      toSelected: false,
      filter: 0,
      loading: false,
      filterRes: true,
      action: false,
      redme: "",
      isClear: false,
      dropdownFirst: "Not Redeemed",
      dropdownModelVisible: false,
      clearFilter: false,
    }
  }

  componentDidUpdate() {
    const { misc } = this.props
    if (misc.clearAllFilters && !this.state.isClear) {
      this.setState({
        isClear: true,
        from: "",
        to: "",
        fromSelected: false,
        toSelected: false,
        filter: 0,
        action: false,
      })
    }
  }

  componentDidMount() {
    const { dispatch, userData } = this.props

    dispatch(
      getBalance(userData.data.package.token, {
        customer_id: userData.data.package.id,
      }),
    )
      .then(res => {
        //console.log(res)
        if (res.payload.status === true) {
          var cache = new Cache({
            namespace: "FGMM",
            policy: {
              maxEntries: 50000,
            },
            backend: AsyncStorage,
          })
          cache.setItem("balanceData", res.payload, function (err) { })
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
        cache.getItem("balanceData", function (err, value) {
          if (value) {
            if (value.status === true) {
              dispatch(getBalanceFromCache(value))
            }
          }
        })
      })

    dispatch(
      getPointHistory((token = userData.data.package.token), {
        customer_id: userData.data.package.id,
        dates: "",
        status: 0,
      }),
    )
      .then(res => {
        console.log(res)
        if (res.payload.status === true) {
          //console.log(res)
          var cache = new Cache({
            namespace: "FGMM",
            policy: {
              maxEntries: 50000,
            },
            backend: AsyncStorage,
          })
          cache.setItem("pointHistoryData", res.payload, function (err) { })
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
        cache.getItem("pointHistoryData", function (err, value) {
          if (value) {
            if (value.status === true) {
              dispatch(getPointHistoryFromCache(value))
            }
          }
        })
      }) 
  }

  filterRedeem = () => {
    // var cache = new Cache({
    //   namespace: "FGMM",
    //   policy: {
    //     maxEntries: 50000,
    //   },
    //   backend: AsyncStorage,
    // })
    // const { filter } = this.state
    // const { dispatch } = this.props
    // this.setState({ loading: true })
    // cache.getItem("userData", (err, value) => {
    //   if (value) {
    //     if (value.status === true) {
    //       dispatch(
    //         getPointHistory(value.package.token, {
    //           status: filter,
    //           dates: "",
    //         }),
    //       )
    //         .then(res => {
    //           console.log(res)
    //           this.setState({ loading: false, filterRes: true })
    //           if (res.payload.status === true) {
    //             cache.setItem("invoiceData", res.payload, function(err) {})
    //           }
    //         })
    //         .catch(err => {
    //           this.setState({ loading: false, filterRes: false })
    //           cache.getItem("invoiceData", function(err, value) {
    //             if (value) {
    //               if (value.status === true) {
    //                 dispatch(getPointHistoryFromCache(value))
    //               }
    //             }
    //           })
    //         })
    //     }
    //   }
    // })
  }

  filter = () => {
    var cache = new Cache({
      namespace: "FGMM",
      policy: {
        maxEntries: 50000,
      },
      backend: AsyncStorage,
    })
    const { dispatch } = this.props
    let fd = this.state.from
    let td = this.state.to
    this.setState({ loading: true })
    const fromDate = new Date(fd.toString()).getTime() / 1000
    const toDate = new Date(td.toString()).getTime() / 1000
    cache.getItem("userData", (err, value) => {
      if (value) {
        if (value.status === true) {
          dispatch(
            getPointHistory(value.package.token, {
              status: this.state.filter,
              dates: fd === "" || td === "" ? "" : `${fromDate}-${toDate}`,
            }),
          )
            .then(res => {
              this.setState({ loading: false, filterRes: true })
              if (res.payload.status === true) {
                cache.setItem("invoiceData", res.payload, function (err) { })
              }
            })
            .catch(err => {
              this.setState({ loading: false, filterRes: false })
              cache.getItem("invoiceData", function (err, value) {
                if (value) {
                  if (value.status === true) {
                    dispatch(getPointHistoryFromCache(value))
                  }
                }
              })
            })
        }
      }
    })
  }

  setActionBtn = data => {
    this.setState({ redme: data })
  }

  updateRedeem = () => {
    this.setState({ filter: 1 }, () => this.filterRedeem())
  }

  render() {
    const { pointHistory } = this.props
    const data = pointHistory ? pointHistory.package.data : []
    let data2 = [
      {
        value: "Not Redeemed",
        filter: 0,
        action: false
      },
      {
        value: "Redeemed",
        filter: 2,
        action: false
      },
      {
        value: "Redeem Request",
        filter: 1,
        action: true
      },
    ]
    if (!this.data2) {
      this.data2 = data2[0];
    }
    if(this.state.clearFilter) {
      this.data2 = data2[0];
    }

    return (
      <View style={styles.container}>
        <DropdownModel
          visible={this.state.dropdownModelVisible}
          items={data2}
          onRequestClose={() => this.setState({ dropdownModelVisible: false })}
          onSelect={(item) => {
            this.data2 = item;
            this.setState({
              dropdownModelVisible: false,
              filter: item.filter, 
              action: item.action, 
              clearFilter: 
              false 
            });
            this.filter() 
          }
        }
        />
        <Text style={{ color: 'black', alignSelf: 'flex-start', marginLeft: 10 }}>Filter Van Sale</Text>
        <View style={{ flexDirection: 'row', alignSelf: "stretch", marginBottom: 12, marginLeft: 10 }}>

          <View style={{ width: '75%' }}>
            <TouchableOpacity style={styles.dropdownContainer}
              onPress={() => this.setState({ dropdownModelVisible: true })}
            >
              <View style={styles.dropdownTextContainer}>
                <Text numberOfLines={1} style={styles.dropdownText}>{this.data2.value}</Text>
              </View>
              <MaterialIcons name='keyboard-arrow-down' size={30} color='black' style={styles.dropdownIcon} />
            </TouchableOpacity>
            <View style={{ height: 0.8, backgroundColor: 'gray' }}></View>
          </View>

          <View style={[{ width: '20%', justifyContent: 'center', alignItems: 'center',marginLeft: 5, backgroundColor: Colors.rootsyPrimary},styles.shadowStyle]}>
            <TouchableOpacity
              onPress={() => this.setState({ from: "", to: "", vansaleId: "", clearFilter: true, fromSelected: false, toSelected: false }, () => {
                this.filter()
              })}
            >
              <RNText tx={"datePicker.clearFilter"} style={{ fontSize: 13, color: "#fff", textAlign: 'center' }} />
            </TouchableOpacity>
          </View>

        </View>

        <View
          style={{
            alignSelf: "stretch",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: 10,
          }}
        >
          <View>
            <RNText tx={"datePicker.from"} style={{ color: 'black', marginBottom: 3 }} />
            <DatePicker
              style={{ borderColor: 'rgba(24,140,234,1)', borderWidth: 1, height: 40 }}
              date={this.state.from}
              mode="date"
              placeholder="Select Date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={true}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  marginLeft: 20,
                  size: 10
                },
                dateInput: {
                  paddingRight: 30,
                  borderWidth: 0
                }
              }}
              onDateChange={date => {
                this.setState({ from: date, fromSelected: true })
              }}
            />
          </View>

          <View>
            <RNText tx={"datePicker.to"} style={{ color: 'black', marginBottom: 3 }} />
            <DatePicker
              style={{ borderColor: 'rgba(24,140,234,1)', borderWidth: 1, height: 40 }}
              date={this.state.to}
              minDate={this.state.from === "" ? new Date().getDate() : this.state.from}
              mode="date"
              placeholder="Select Date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={true}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  marginLeft: 20,
                  size: 10
                },
                dateInput: {
                  paddingRight: 30,
                  borderWidth: 0
                }
              }}
              onDateChange={date => {
                this.setState({ to: date, toSelected: true })
              }}
            />
          </View>

          <View>
            <TouchableOpacity
              disabled={this.state.fromSelected && this.state.toSelected ? false : true}
              onPress={() => this.filter()}
              style={[{  width: 70,
                backgroundColor: this.state.fromSelected && this.state.toSelected ? Colors.rootsyPrimary : Colors.rootsyPrimaryLightGray,
                height: 40,
                marginTop: 20,
                justifyContent: 'center'}, styles.shadowStyle] 
               
              }
            >
              <RNText tx={"datePicker.filter"} style={{ fontSize: 15, color: "#fff", textAlign: 'center', padding: 4 }} />
            </TouchableOpacity>
          </View>

        </View>

        {/* <View style={styles.header}>
          <RNText
            tx={"invoiceScreen.invoiceReference"}
            style={[styles.headerText, { flex: 1.2 }]}
          />
          <RNText tx={"offerScreen.points"} style={[styles.headerText, { flex: 1 }]} />
          <RNText tx={"offerScreen.rate"} style={[styles.headerText, { flex: 0.8 }]} />
          <RNText tx={"offerScreen.amount"} style={[styles.headerText, , { flex: 1 }]} />
          <RNText tx={"offerScreen.date"} style={[styles.headerText, { flex: 1.3 }]} />

          <RNText tx={"offerScreen.redeemed"} style={[styles.headerText, { flex: 1.1 }]} />

          {this.state.action && (
            <RNText tx={"offerScreen.action"} style={[styles.headerText, { flex: 2 }]} />
          )}
        </View> */}
        {!this.state.loading ? (
          <ScrollView style={{ flex: 1, width: "96%", height: 200 }} showsVerticalScrollIndicator={false}>
            {this.state.filterRes === true && data.length > 0 ? (
              data.map((item, i) => (
                <OffersPH
                  key={uuidV4()}
                  filter={this.updateRedeem}
                  actionBtn={this.setActionBtn}
                  action={this.state.action}
                  item={item}
                />
              ))
            ) : (
                <View style={{ flex: 1 }}>
                  <RNText style={{ textAlign: "center" }} tx={"offerScreen.noData"} />
                </View>
              )}
            <View style={styles.bottomView} />
          </ScrollView>
        ) : (
            <View>
              <ActivityIndicator size="small" style={{ alignSelf: "center" }} />
            </View>
          )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    balanceData: state.balanceData.pointBalance,
    pointHistory: state.balanceData.pointHistory,
    misc: state.misc,
  }
}

export default connect(mapStateToProps)(OffersPointHistoryComponent)
