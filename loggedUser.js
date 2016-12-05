/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

export default class LoggedUser extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View>
        <Text> {"You are LOGGED IN !"} </Text>
      </View>
    );
  }
}
