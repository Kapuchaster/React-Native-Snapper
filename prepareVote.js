import React, { Component} from 'react';
import { View, Text, Picker,} from 'react-native';

const Item = Picker.Item;

export default class PrepareVote extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Prepare Vote</Text>
        <Picker>
          <Item label="One Like" value="key0" />
          <Item label="Many Likes" value="key1" />
          <Item label="1-10 Scale" value="key2" />
        </Picker>
      </View>
    )
  }
}
