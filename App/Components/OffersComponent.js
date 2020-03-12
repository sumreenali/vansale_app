import React, { Component } from "react"
import { View, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import styles from "./Styles/PurchaseinvoiceviewStyle"
import Offers from "./OfferSubComponent"
import RNText from "../Components/RNText"
import DatePicker from "react-native-datepicker"
import { Cache } from "react-native-cache"
import { getPointOffers, getPointOffersFromCache } from "../Redux/Actions/balanceActions"
import { Colors } from "../Themes"
import AsyncStorage from "@react-native-community/async-storage"
const uuidV4 = require("uuid/v4")

class OffersComponent extends Component {
  state = {
    from: "",
    to: "",
    fromSelected: false,
    toSelected: false,
    loading: false,
    filterRes: true,
    isClear: false,
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
      })
    }
  }

  componentDidMount() {
    var cache = new Cache({
      namespace: "FGMM",
      policy: {
        maxEntries: 50000,
      },
      backend: AsyncStorage,
    })
    const { dispatch } = this.props
    cache.getItem("userData", function (err, value) {
      if (value) {
        if (value.status === true) {
          dispatch(
            getPointOffers(value.package.token, {
              dates: "",
            }),
          )
            .then(res => {
              console.log(res)
              if (res.payload.status === true) {
                var cache = new Cache({
                  namespace: "FGMM",
                  policy: {
                    maxEntries: 50000,
                  },
                  backend: AsyncStorage,
                })
                cache.setItem("offerData", res.payload, function (err) { })
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
              cache.getItem("offerData", function (err, value) {
                if (value) {
                  if (value.status === true) {
                    dispatch(getPointOffersFromCache(value))
                  }
                }
              })
            })
        }
      }
    })
  }

  filterData = () => {
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
    const fromDate = new Date(fd.toString()).getTime() / 1000
    const toDate = new Date(td.toString()).getTime() / 1000
    this.setState({ loading: true })
    cache.getItem("userData", (err, value) => {
      if (value) {
        if (value.status === true) {
          dispatch(
            getPointOffers(value.package.token, {
              dates: fd === "" || td === "" ? "" : `${fromDate}-${toDate}`,
            }),
          )
            .then(res => {
              this.setState({ loading: false, filterRes: true })
              if (res.payload.status === true) {
                cache.setItem("offerData", res.payload, function (err) { })
              }
            })
            .catch(err => {
              this.setState({ loading: false, filterRes: false })
              cache.getItem("offerData", function (err, value) {
                if (value) {
                  if (value.status === true) {
                    dispatch(getPointOffersFromCache(value))
                  }
                }
              })
            })
        }
      }
    })
  }

  render() {
    const { balanceData } = this.props
    return (
      <View style={styles.container}>
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
                this.setState({ to: date, toSelected: true }, () => {
                  if (this.state.fromSelected && this.state.toSelected) {
                    setTimeout(() => {
                      // this.filterData()
                    }, 1000)
                  }
                })
              }}
            />
          </View>

          <View>

            <View style={[styles.shadowStyle, { height: 35, width: 70, justifyContent: 'center', alignItems: 'center',marginBottom: 8, backgroundColor: Colors.rootsyPrimary }]}>
              <TouchableOpacity
                onPress={() => this.setState({ from: "", to: "", fromSelected: false, toSelected: false }, () => {
                  this.filterData()
                })}
              >
                <RNText tx={"datePicker.clearFilter"} style={{ fontSize: 13, color: "#fff", textAlign: 'center',padding: 2 }} />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                disabled={this.state.fromSelected && this.state.toSelected ? false : true}
                onPress={() => this.filterData()}
                style={[{ width: 70,
                  backgroundColor: this.state.fromSelected && this.state.toSelected ? Colors.rootsyPrimary : Colors.rootsyPrimaryLightGray,
                  height: 40,
                  justifyContent: 'center' }, styles.shadowStyle]
                }
              >
                <RNText tx={"datePicker.filter"} style={{ fontSize: 15, color: "#fff", textAlign: 'center', padding: 4 }} />
              </TouchableOpacity>
            </View>

          </View>

        </View>

        <View style={styles.header}>
          <RNText tx={"offerScreen.name"} style={styles.headerText} />
          <RNText tx={"offerScreen.description"} style={styles.headerText} />
          <RNText tx={"offerScreen.date"} style={styles.headerText} />
        </View>

        <ScrollView style={{ flex: 1, width: "96%" }} showsVerticalScrollIndicator={false}>
          {this.state.loading ? (
            <ActivityIndicator color={Colors.rootsyPrimary} size="small" />
          ) : this.state.filterRes && balanceData ? (
            balanceData.package.data.map((item, i) => <Offers key={uuidV4()} item={item} />)
          ) : (
                <View style={{ flex: 1 }}>
                  <RNText style={{ textAlign: "center" }} tx={`offerScreen.noData`} />
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
    balanceData: state.balanceData.pointBalance,
    misc: state.misc,
  }
}

export default connect(mapStateToProps)(OffersComponent)
