import React, { Component } from "react"
import { ScrollView, View, ActivityIndicator } from "react-native"
import { connect } from "react-redux"
import RNText from "../Components/RNText"
import styles from "./Styles/InvoiceSubScreenStyle"

import {
    getStockList,
    getVanStockListFromCache,
} from "../Redux/Actions/StockScreenAction"
import StockList from "../Components/StockList"
import { Cache } from "react-native-cache"
import AsyncStorage from "@react-native-community/async-storage"
const uuidV4 = require("uuid/v4")

import { Colors } from "../Themes"
const dataDummy = [
  
]
class StockScreen extends Component {
  state = {
    customer_id: 0,
    token: null,
    region_id: 0,
    filterVan: "All",
    toggle: false,
    filterRes: true,
    isLoading: false,
    isClear: false,
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
              const { token } = this.state

              dispatch(getStockList(token))
                .then(res => {
                  if (res.payload.status === true) {
                    var cache = new Cache({
                      namespace: "FGMM",
                      policy: {
                        maxEntries: 50000,
                      },
                      backend: AsyncStorage,
                    })
                    cache.setItem("stockListData", res.payload, function(err) {})
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
                  cache.getItem("stockListData", function(err, value) {
                    if (value) {
                      if (value.status === true) {
                        dispatch(getVanSalesFromCache(value))
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

  componentDidMount() {
    const { dispatch, userData } = this.props

    this.setState(
      {
        token: userData.data.package.token || value.package.token,
        customer_id: userData.data.package.id || value.package.id,
        region_id: userData.data.package.region[0].id,
      },
      () => {
        const { token} = this.state

        dispatch(getStockList(token))
          .then(res => {
            if (res.payload.status === true) {
              var cache = new Cache({
                namespace: "FGMM",
                policy: {
                  maxEntries: 50000,
                },
                backend: AsyncStorage,
              })
              cache.setItem("stockListData", res.payload, function(err) {})
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
            cache.getItem("stockListData", function(err, value) {
              if (value) {
                if (value.status === true) {
                  dispatch(getVanStockListFromCache(value))
                }
              }
            })
          })
      },
    )
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
 
    this.setState({ isLoading: true })
    cache.getItem("userData", (err, value) => {
      if (value) {
        if (value.status === true) {
          dispatch(
            getStockList(value.package.token),
          )
            .then(res => {
              this.setState({ isLoading: false, filterRes: true })
              if (res.payload.status === true) {
                cache.setItem("stockListData", res.payload, function(err) {})
              }
            })
            .catch(err => {
              this.setState({ isLoading: false, filterRes: false })
              cache.getItem("stockListData", function(err, value) {
                if (value) {
                  if (value.status === true) {
                    dispatch(getVanStockListFromCache(value))
                  }
                }
              })
            })
        }
      }
    })
  }

  render() {
    const { vansalesData, vanSaleDropdown,stockData } = this.props

    console.log(stockData , "here is the stock data ")

    const data = stockData ? stockData.package.data : dataDummy


    let data2 = [{ value: "All", id: "" }]

    const vans = vanSaleDropdown ? vanSaleDropdown.package.data : []
    vans.map((item, i) => {
      data2.push({ value: item.name, id: item.id })
      return i
    })
    // console.log(vans)
    return (
      <View style={styles.body}>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
          }}
        >
        <View style = {{height : 40, alignItems : "center", alignContent : "center"}} >
            <RNText tx = {"stockScreen.stockList"} style = {{textAlign : "center", fontWeight : "bold", fontSize : 20, color : "#ffd23e"}}/>
        </View>
       
        </View>
  
        <View style={styles.header}>
          <RNText tx={"stockScreen.id"} style={[styles.headerText]} />
          <RNText tx={"stockScreen.code"} style={[styles.headerText, { flex: 1.2 }]} />
          <RNText tx={"stockScreen.quantity"} style={[styles.headerText, { flex: 1.3 }]} />
        </View>
        <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
          {this.state.isLoading === true ? (
            <ActivityIndicator color={Colors.rootsyPrimary} size="small" />
          ) : (
            data.map((item, i) => (
                <StockList  item={item} key={uuidV4()} />
            ))
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
    stockData: state.stockData.data
  }
}

export default connect(mapStateToProps)(StockScreen)
