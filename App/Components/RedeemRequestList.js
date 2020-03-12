
import RNText from "../Components/RNText"
import React, { Component } from "react"
import { Text, View, StyleSheet, CheckBox } from "react-native"

export default class RedeemRequestList extends Component {
  state = {
    show: true,
    isSelected: false,
    totalAmount: 0,
    main_id: 0,
    listData: [],
  }
  onClickCheckBox = (id, data) => {
    this.setState({
      main_id: id,
    })

    this.setState(
      {
        isSelected: !this.state.isSelected,
      },
      () => {
        const action = this.state.isSelected ? "push" : "pop"
        this.props.performRedeemAction(data, action)
      },
    )
  }
  performAction = () => {
    return this.state.totalAmount
  }

  componentDidMount() {
    this.setState({
      listData: this.props.item,
    })
  }

  render() {

    const { item } = this.props


    return (
      <View
        style={{
          width: 330,
          paddingLeft: 5,
          borderColor: "#FED340",
          borderWidth: 2,
          top: 10,
          height: 210,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "95%",
            justifyContent: "space-between",
            flexDirection: "row",
            height: 30,
          }}
        >
          <RNText style={{ fontWeight: "500" }} tx={`vanSaleScreen.ID`} />
          <Text style={{ fontWeight: "500" }}>{item.id}</Text>
        </View>

        <View
          style={{
            width: "95%",
            justifyContent: "space-between",
            flexDirection: "row",
            height: 30,
          }}
        >
          <RNText style={{ fontWeight: "500" }} tx={`vanSaleScreen.Select`} />
          <CheckBox
            value={this.state.isSelected}
            onChange={() => this.onClickCheckBox(item.id, item)}
          />
        </View>

        <View
          style={{
            width: "95%",
            justifyContent: "space-between",
            flexDirection: "row",
            height: 30,
          }}
        >
          <RNText style={{ fontWeight: "500" }} tx={`vanSaleScreen.Points`} />
          <Text style={{ fontWeight: "500" }}>{item.points}</Text>
        </View>

        <View
          style={{
            width: "95%",
            justifyContent: "space-between",
            flexDirection: "row",
            height: 30,
          }}
        >
          <RNText style={{ fontWeight: "500" }} tx={`vanSaleScreen.Rate`} />
          <Text style={{ fontWeight: "500" }}>{item.rate}</Text>
        </View>

        <View
          style={{
            width: "95%",
            justifyContent: "space-between",
            flexDirection: "row",
            height: 30,
          }}
        >
          <RNText style={{ fontWeight: "500" }} tx={`vanSaleScreen.Amount`} />
          <Text style={{ fontWeight: "500" }}>{item.amount}</Text>
        </View>
        <View
          style={{
            width: "95%",
            justifyContent: "space-between",
            flexDirection: "row",
            height: 30,
          }}
        >
          <RNText style={{ fontWeight: "500" }} tx={`vanSaleScreen.InvoiceRef`} />
          <Text style={{ fontWeight: "500" }}>{item.invoice_reference}</Text>
        </View>

        <View
          style={{
            width: "95%",
            justifyContent: "space-between",
            flexDirection: "row",
            height: 30,
          }}
        >
          <RNText style={{ fontWeight: "500" }} tx={`vanSaleScreen.Date`} />
          <Text style={{ fontWeight: "500" }}>{item.created_at}</Text>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  Container: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "yellow",
  },
  cellContainer: {
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
})
