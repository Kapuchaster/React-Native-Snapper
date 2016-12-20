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
      screen: 'welcomeScreen',
      username: 'nulll'
    }
  }

  hand = (status, username) => {
    this.setState({username: username});
    this.setState({screen: status });
  }

  render() {
      // return (
      //   <LoggedUser />
      // )
    if(this.state.screen === 'welcomeScreen'){
      return (
        <View>
          <WelcomeScreen hand={this.hand} />
          <Text> {this.state.screen} </Text>
          <Text> {this.state.username} </Text>
        </View>
      );
    }
    else if(this.state.screen === 'accTrue'){
      return (
        <LoggedUser username={this.state.username} />
      );
    }
    else{
      return (
        <Text> Screen Id Error: {this.state.username}</Text>
      );
    }
  }
}

AppRegistry.registerComponent('SnapVoter', () => SnapVoter);
