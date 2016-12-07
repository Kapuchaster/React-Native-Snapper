/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import GlobalVoting from './globalVoting.js';
import Profile from './profile.js';
import FriendsVote from './friendsVote.js';
import PrepareVote from './prepareVote.js'
import Swiper from 'react-native-swiper';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
wrapper: {
},
slide1: {
   flex: 1,
  // justifyContent: 'center',
  // alignItems: 'center',
   backgroundColor: '#9DD6EB',
},
slide2: {
   flex: 1,
  // justifyContent: 'center',
  // alignItems: 'center',
   backgroundColor: '#97CAE5',
},
slide3: {
   flex: 1,
  // justifyContent: 'center',
  // alignItems: 'center',
   backgroundColor: '#92BBD9',
},
text: {
  color: '#fff',
  fontSize: 30,
  fontWeight: 'bold',
}
})

export default class LoggedUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Swiper style={styles.wrapper} index={1} showsButtons={true} loop={false}>
      <View style={styles.slide3}>
        <PrepareVote />
      </View>
        <View style={styles.slide1}>
          <Profile username={this.props.username}/>
        </View>
        <View style={styles.slide2}>
          <FriendsVote />
        </View>
        <View style={styles.slide3}>
          <GlobalVoting />
        </View>
      </Swiper>
    );
  }


}
