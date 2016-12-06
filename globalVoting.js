import React, { Component} from 'react';
import { View, Text } from 'react-native';

export default class GlobalVoting extends Component {
  static get defaultProps() {
    return {
      title: 'MyScene_evaluation'
    };
  }

  render() {
    return (
      <View>
        <Text>Global Voting</Text>
      </View>
    )
  }
}
