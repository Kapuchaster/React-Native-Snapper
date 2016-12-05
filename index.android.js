/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import WelcomeScreen from './welcomeScreen.js';
import LoggedUser from './loggedUser.js';
import {
  AppRegistry,
  View,
  Text,
} from 'react-native';

export default class SnapVoter extends Component {
  constructor(props) {
    super(props);
    this.state = {
  screen: 'welcomeScreen'
}
  }

  hand = (data) => {
      this.setState({ screen: data });
    }

  render() {
    if(this.state.screen === 'welcomeScreen'){
      return (
        <View>
          <WelcomeScreen hand={this.hand} />
          <Text> {this.state.screen} </Text>
        </View>
      );
    }
    else if(this.state.screen === 'accTrue'){
      return (
        <View>
          <LoggedUser />
          <Text> {"MainActivity"} </Text>

        </View>
      )
    }
  }
}



AppRegistry.registerComponent('SnapVoter', () => SnapVoter);
