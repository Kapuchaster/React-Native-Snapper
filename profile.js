import React, { Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
 } from 'react-native';

var styles = StyleSheet.create({
  topMenu: {
    backgroundColor:'#81c04d',
    flexDirection:'row',
  },
  awards: {
    margin: 7,
    width: 40,
    height: 40,
  //  textAlign:'center',
  },
  profile: {
    flex: 1,
    textAlign:'center',
  },
  score: {
    textAlign:'center',
    margin: 10,
    flex: 1,
  },
  avatar: {
    justifyContent: 'center',
    alignItems:'center',
  }
});

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let avatar = require('./img/Avatar.jpg');
    let awards = require('./img/Awards.jpg');
    let plus = require('./img/Plus_add.jpg');
    return (
      <View>
        <View style={styles.topMenu}>
          <Image style={styles.awards} source = {awards} />
          <Text style={styles.profile}> Profile </Text>
          <Text style={styles.score}> Score: 0000 </Text>
        </View>
        <View style={styles.avatar}>
          <Image source = {avatar} />
          <Text>Profile</Text>
          <Text>Hej {this.props.username} !</Text>
        </View>
        <Image source = {plus} />
      </View>
    )
  }
}
