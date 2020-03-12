import React, { Component } from "react"
import { View, ScrollView, ActivityIndicator, Text, TouchableOpacity } from "react-native"
import styles from "./Styles/ReturninvoiceviewStyle"
import { connect } from "react-redux"
import { Cache } from "react-native-cache"
import { Colors } from "../Themes"
import DatePicker from "react-native-datepicker"
import { getReturnInvoice, getReturnInvoiceFromCache } from "../Redux/Actions/invoiceActions"
import InvoiceOfReturn from "./InvoiceOfReturn"
import AsyncStorage from "@react-native-community/async-storage"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropdownModel from '../Components/DropdownModel'
const uuidV4 = require("uuid/v4")

class ReturnInvoiceView extends Component {
  state = {
    datum: [],
    vansaleId: 0,
    from: "",
    to: "",
    fromSelected: false,
    toSelected: false,
    vanSale: "All",
    isLoading: false,
    filterRes: true,
    isClear: false,
    dropdownModelVisible: false,
    clearFilter: false
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
        vanSale: "All",
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
    let data = []

    cache.getItem("invoiceReturnData", (err, value) => {
      if (value) {
        data = value
        this.setState({
          datum: data,
        })
      }
      else{
        console.log(err)
      }
    })

  }

  filterVan = id => {
    this.setState({ vansaleId: id })
    // var cache = new Cache({
    //   namespace: "FGMM",
    //   policy: {
    //     maxEntries: 50000,
    //   },
    //   backend: AsyncStorage,
    // })
    // const { dispatch } = this.props
    // const { vanSale } = this.state
    // this.setState({ isLoading: true })
    // cache.getItem("userData", (err, value) => {
    //   if (value) {
    //     if (value.status === true) {
    //       dispatch(
    //         getReturnInvoice(value.package.token, {
    //           customer_id: value.package.id,
    //           vansale: id,
    //           dates: "",
    //         }),
    //       )
    //         .then(res => {
    //           console.log(res)
    //           this.setState({ isLoading: false, filterRes: true })
    //           if (res.payload.status === true) {
    //             cache.setItem("invoiceData", res.payload, function(err) {})
    //           }
    //         })
    //         .catch(err => {
    //           this.setState({ isLoading: false, filterRes: false })
    //           cache.getItem("invoiceData", function(err, value) {
    //             if (value) {
    //               if (value.status === true) {
    //                 dispatch(getReturnInvoiceFromCache(value))
    //               }
    //             }
    //           })
    //         })
    //     }
    //   }
    // })
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
    const { vanSale } = this.state
    this.setState({ isLoading: true })
    const fromDate = new Date(fd.toString()).getTime() / 1000
    const toDate = new Date(td.toString()).getTime() / 1000
    cache.getItem("userData", (err, value) => {
      if (value) {
        if (value.status === true) {
          dispatch(
            getReturnInvoice(value.package.token, {
              customer_id: value.package.id,
              vansale: this.state.vansaleId,
              dates: fd === "" || td === "" ? "" : `${fromDate}-${toDate}`,
            }),
          )
            .then(res => {
              this.setState({ isLoading: false, filterRes: true })
              if (res.payload.status === true) {
                cache.setItem("invoiceData", res.payload, function (err) { })
              }
            })
            .catch(err => {
              this.setState({ isLoading: false, filterRes: false })
              cache.getItem("invoiceData", function (err, value) {
                if (value) {
                  if (value.status === true) {
                    dispatch(getReturnInvoiceFromCache(value))
                  }
                }
              })
            })
        }
      }
    })
  }

  render() {
    const { invoiceReturnData, vansalesData } = this.props
    const data = invoiceReturnData ? invoiceReturnData.package.data : []

    let data2 = [{ value: "All", id: "" }]

    const vans = vansalesData ? vansalesData.package.data : []
    vans.map((item, i) => {
      data2.push({ value: item.name, id: item.id })
      return i
    })
    if(!this.data2) {
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
          onSelect={(item) => { this.data2 = item; this.setState({ dropdownModelVisible: false, vansaleId: item.id, clearFilter: false}); this.filterData();}}
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

          <View style={[{ width: '20%',justifyContent: 'center',alignItems: 'center',marginLeft: 5, backgroundColor: Colors.rootsyPrimary },styles.shadowStyle]}>
            <TouchableOpacity
              onPress={() => this.setState({ from: "", to: "",  vansaleId: "", clearFilter: true, fromSelected: false, toSelected: false }, () => {
                this.filterData()
              })}
            >
              <RNText tx={"datePicker.clearFilter"} style={{ fontSize: 13, color: "#fff", textAlign: 'center'}} />
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
              style={{ borderColor:'rgba(24,140,234,1)',borderWidth:1, height: 40 }}
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
                  size:10
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
          <RNText tx={"datePicker.to"} style={{color:'black',marginBottom:3}}/>
            <DatePicker
              style={{ borderColor:'rgba(24,140,234,1)',borderWidth:1, height: 40 }}
              date={this.state.to}
              minDate={this.state.from==="" ?  new Date().getDate(): this.state.from}
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
                  size:10
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
                      //this.filterData()
                    }, 1000)
                  }
                })
              }}
            />
          </View>

          <View>
            <TouchableOpacity
              disabled={this.state.fromSelected && this.state.toSelected ? false : true}
              onPress={() => this.filterData()}
              style={[ {width:70,
                backgroundColor: this.state.fromSelected && this.state.toSelected ? Colors.rootsyPrimary : Colors.rootsyPrimaryLightGray,
                height: 40,
                marginTop: 20,
                justifyContent:'center' },styles.shadowStyle]
              }
            >
              <RNText tx={"datePicker.filter"} style={{ fontSize: 15, color: "#fff",textAlign:'center',padding:4 }} />
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.header}>
          <RNText tx={"invoiceScreen.invoiceReference"} style={styles.headerText} />
          <RNText tx={"invoiceScreen.vanSales"} style={styles.headerText} />
          <RNText tx={"invoiceScreen.totalAmount"} style={styles.headerText} />
          <RNText tx={"invoiceScreen.date"} style={styles.headerText} />
        </View>
        <ScrollView style={{ flex: 1, width: "96%" }} showsVerticalScrollIndicator={false}>
          {this.state.isLoading ? (
            <ActivityIndicator color={Colors.rootsyPrimary} size="small" />
          ) : this.state.filterRes === true && (this.state.datum.length > 0 || data.length > 0) ? (
            ((this.state.datum.length > 0 && this.state.datum) || data).map((item, i) => (
              // <TouchableOpacity style={{}}>
              <InvoiceOfReturn key={uuidV4()} item={item} return={true} returnInvoice={true} />
              // </TouchableOpacity>
            ))
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

function mapStateToProps(state) {
  return {
    invoiceData: state.invoiceData.purchase,
    userData: state.userData,
    invoiceReturnData: state.invoiceData.return,
    vansalesData: state.vansalesData.data,
    misc: state.misc,
  }
}

export default connect(mapStateToProps)(ReturnInvoiceView)
