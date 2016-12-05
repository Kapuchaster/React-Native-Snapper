import React, { Component} from 'react';
import { View, Text } from 'react-native';

export default class EvaluationPhotos extends Component {
  static get defaultProps() {
    return {
      title: 'MyScene_evaluation'
    };
  }

  render() {
    return (
      <View>
        <Text>Hi! My name is .</Text>
      </View>
    )
  }
}
