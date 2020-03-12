import React, { Component } from "react"
import { View, Image, ScrollView } from "react-native"
import RNText from "../Components/RNText"
import styles from "./Styles/AboutAppScreenStyle"
import { Images } from "../Themes";
import {aboutUs} from '../Redux/Actions/userActions';
import {connect } from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";

class AboutAppScreen extends Component {

  state = {
    aboutUs:""
  }

  componentDidMount(){
    const token = this.props.userData.data.package.token
 this.props.dispatch(aboutUs(token, {})).then(res=> {
   if(res.payload.status === true){
     this.setState({
       aboutUs: res.payload.package[0] || "No Data found"
     },() => {
         AsyncStorage.setItem("about-us", `${this.state.aboutUs}`)
     })
   }
 }).catch(err => {
   console.log(err);
   const aboutCache = AsyncStorage.getItem("about-us").then(res => {
     if(res !== null){
       this.setState({
         aboutUs: res
       })
     }
   })
 })

  }

  render() {
    const regex = /(<([^>]+)>)/ig;
const result = this.state.aboutUs.replace(regex, '');
    return (
      <View styles={styles.container}>
        <ScrollView>
        <View style={styles.contentView}>
          <Image source={Images.logo} style={styles.logoHead} resizeMode={"contain"} />
        </View>
        <View style={styles.contentView}>
           <View style={styles.description}>
             {
               this.state.aboutUs === ''?
              <RNText style={{ textAlign: "center" }} tx={`offerScreen.noData`} />
               :
            <RNText text={`${result}`} style={styles.descriptionTxt} />
             }
       </View>
        </View>
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state){
  return{
    state,
    userData: state.userData,
  }
}

export default connect(mapStateToProps)(AboutAppScreen);
