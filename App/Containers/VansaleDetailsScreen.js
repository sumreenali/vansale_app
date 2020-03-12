import React, { Component } from "react"
import { View } from "react-native"
import RNText from "../Components/RNText"
import styles from "./Styles/InvoiceSubScreenStyle"
import stylesRow from "../Components/Styles/InvoiceItemStyle"
import { Colors } from "../Themes"

class VansaleDetailsScreen extends Component {
    render() {
        const { total_money, total_points, total_quantity } = this.props.navigation.getParam("item")
        console.log(this.props.navigation.getParam("item"))
        return (
            <View style={styles.body}>
                    <View style={styles.header}>
                        <RNText tx={"vanSaleScreen.totalMoney"} style={[styles.headerText,{ flex: 1.2 }]} />
                        <RNText tx={"vanSaleScreen.totalPoint"} style={[styles.headerText, { flex: 1.2 }]} />
                        <RNText tx={"vanSaleScreen.totalQty"} style={[styles.headerText, { flex: 1.2 }]} />
                    </View>
                    <View style={{ flex: 1, width: '100%' }}>
                        <View style={stylesRow.body}>
                            <View
                                style={[
                                    stylesRow.A1,
                                    {
                                        borderWidth: 0.5,
                                        borderColor: Colors.rootsyPrimary,
                                    },
                                ]}
                            >
                                <View style={[stylesRow.A1C1, { flex: 2 }]}>
                                    <RNText style={stylesRow.invoiceText1} text={`${total_money}`} />
                                </View>

                                <View style={[stylesRow.A1C1, { flex: 2.4 }]}>
                                    <RNText style={stylesRow.invoiceText1} text={`${total_points}`} />
                                </View>

                                <View style={[stylesRow.A1C1, { flex: 2.4 }]}>
                                    <RNText style={[stylesRow.invoiceText1]} text={`${total_quantity}`} />
                                </View>
                            </View>
                        </View>
                    </View>
            </View>
        )
    }
}


export default VansaleDetailsScreen
