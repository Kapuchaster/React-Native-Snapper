/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import WelcomeScreen from './welcomeScreen.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class SnapVoter extends Component {
  render() {
    let logo = require('./img/Logo.jpg');
    return (
      <View>
        <Image
          style={{width: screenWidth, height: 110}}
          source={logo}
        />
        <WelcomeScreen/>
        <TextInput placeholder="Em@il"/>
        <TextInput placeholder="Password"/>
        <Button title="Sign In"/>

        <TextInput placeholder="Em@il"/>
        <TextInput placeholder="Full Name"/>
        <TextInput placeholder="Username"/>
        <TextInput placeholder="Password"/>
        <Button title="Register"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SnapVoter', () => SnapVoter);
