/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.msg = "f";
    this.checkAcc = this.checkAcc.bind(this);
    this.registerAcc = this.registerAcc.bind(this);
  }

  checkAcc() {
    // TODO: Check in the Server/server.js /GET
    if(this.state.loginInputText === 'a'
      && this.state.passwordInputText === 'p'){
        this.props.hand("accTrue");
      }
    else{
      this.setState({msg : "Wrong Login or Password! /l Admin /p Password"});
    }
  }

  registerAcc() {

    var details = {
    'login': 'login',
    'password': 'Password!',
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  fetch('http://192.168.1.5:8082/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
      body: formBody
    }).then((response) => {
      this.setState({msg : "1"})
    }).catch((error) => {
      this.setState({msg : '2'});
    });
  }


  render() {
    let logo = require('./img/Logo.jpg');

    return (
      <View>
        <Image
          style={{width: screenWidth, height: 110}}
          source={logo}
        />
        <TextInput placeholder="Em@il" onChangeText={(loginInputText) => this.setState({loginInputText})} value={this.state.loginInputText}/>
        <TextInput placeholder="Password" onChangeText={(passwordInputText) => this.setState({passwordInputText})} value={this.state.passwordInputText}/>
        <Button title="Sign In" onPress={this.checkAcc}/>

        <TextInput placeholder="Em@il"/>
        <TextInput placeholder="Full Name"/>
        <TextInput placeholder="Username"/>
        <TextInput placeholder="Password"/>
        <Button title="Register" onPress={this.registerAcc}/>
        <Text> {this.state.msg} </Text>
      </View>
    );
  }
}

function postAcc() {
var http = new XMLHttpRequest();
var url = "http://localhost:8082/register";
var params = "login=a&password=b";
http.open("POST", url, true);

//Send the proper header information along with the request
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
    }
}
 http.send(params);
//   fetch('http://localhost:8082/register/', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       login: 'kk',
//       password: 'pp',
//     })
//   }).then(function(response) {
//   if(response.ok) {
//
//   }
// }).then(function(data) {
//
// }).catch(function(error) {
//   alert(error);
// });
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
