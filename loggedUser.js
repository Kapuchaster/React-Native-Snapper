/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import EvaluationPhotos from './evaluationPhotos.js';
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
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#9DD6EB',
},
slide2: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#97CAE5',
},
slide3: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
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
      <Swiper style={styles.wrapper} showsButtons={true} loop={false}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Informacje ogolne</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Zdjecia znajomych</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>Moje Zdjecia</Text>
        </View>
      </Swiper>
    );
  }


}
