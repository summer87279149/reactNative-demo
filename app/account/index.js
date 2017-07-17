
import React, { Component } from 'react';
import {AppRegistry, Image, StyleSheet, Text, View,TabBarIOS} from 'react-native';
import Login from '../common/login.js'
  
 export default class Account extends Component {
  render() {
    return (
      <View>
        <Text>
          Account
        </Text>
        <Login></Login>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
