import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  FlatList,
  StyleSheet,
  TextInput
} from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Colors } from "../Themes"

export default class DropdownModel extends Component {

  componentDidMount() {
    this.filterTokensForDisplay = this.props.items;
    this.forceUpdate();
  }

  componentDidUpdate() {
    this.filterTokensForDisplay = this.props.items;
  }

  filterTokens = (keyword) => {
    if (!keyword.length) {
      this.filterTokensForDisplay = this.props.items;
      this.forceUpdate();
      return;
    }
    let _filterTokensForDisplay = [];
    for (let i = 0; i < this.filterTokensForDisplay.length; i++) {
      if ((this.filterTokensForDisplay[i].value.toLowerCase().includes(keyword.toLowerCase()))) {
        _filterTokensForDisplay.push(this.filterTokensForDisplay[i])
      }
    }
    this.filterTokensForDisplay = _filterTokensForDisplay;
    this.forceUpdate();
  }

  onPressClose = () => {
    this.props.onRequestClose();
    this.filterTokensForDisplay = this.props.items;
    this.forceUpdate();
  }

  render() {
    return (
      <Modal
        animationType="fade"
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
        transparent={true}
      >
        <View style={{
          justifyContent: 'center',
          alignSelf: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(52, 52, 52, 0.5)'
        }}>
          <View style={{
            backgroundColor: 'white',
            width: '80%',
            height: '80%',
            alignSelf: 'center',
            marginBottom: 30,
            marginTop: 30
          }}>
            <View style={{ flexDirection: 'row', backgroundColor:Colors.rootsyPrimary,marginBottom: 10 }}>
              <TouchableOpacity
                onPress={() => this.onPressClose()}
                style={{ marginLeft: 'auto' }}
              >
                <EvilIcons style={{ padding: 4 }} name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View style={[styles.searchBoxContainer]}>
              <View style={styles.searchBoxIcon}>
                <EvilIcons name="search" size={25} color="rgb(77, 77, 77)" />
              </View>
              <TextInput
                ref={element => { this.searchBox = element }}
                style={styles.searchBoxInput}
                placeholder="Search"
                placeholderTextColor="rgb(77, 77, 77)"
                onChangeText={(tokenKeyword) => this.filterTokens(tokenKeyword)}
              />
          
            </View>

            <FlatList
              data={this.filterTokensForDisplay}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.props.onSelect(item)}>
                 
                      <Text style={{
                        margin:10,
                        marginLeft: 16,
                        fontSize: 15,
                        color: "black",
                      }}>{item.value}</Text>
                    
                    <View style={{
                      flexDirection: "row",
                      height: 0.8,
          
                      marginLeft:10,
                      marginRight:10,
                      backgroundColor: "gray"
                    }} />

                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBoxContainer: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    marginBottom: 10,
    backgroundColor:'white',
    borderWidth:0.5,
    borderColor:Colors.rootsyPrimary,
    borderRadius: 5,
  },
  searchBoxIcon: {
    alignSelf:'center',
  },
  searchBoxInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    marginBottom: -2,
    alignSelf:'center',
  },
});
