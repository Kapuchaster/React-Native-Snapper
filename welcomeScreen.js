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
    fetch('http://192.168.1.5:8082/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: this.state.loginInputText,
        password: this.state.passwordInputText,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({msg : String(responseJson.user)});
        this.props.hand('accTrue', String(responseJson.user));
      })
      .catch((error) => {
        this.setState({msg : 'Error_J'});
      });
  }

  registerAcc() {
    fetch('http://192.168.1.5:8082/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: this.state.loginRegInputText,
        password: this.state.passwordRegInputText,
        username: this.state.usernameRegInputText,
        fullname: this.state.fullNameRegInputText
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({msg : responseJson.myMsg});
      })
      .catch((error) => {
        this.setState({msg : 'Error_J'});
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

        <TextInput placeholder="Em@il" onChangeText={(loginRegInputText) => this.setState({loginRegInputText})} value={this.state.loginRegInputText}/>
        <TextInput placeholder="Full Name" onChangeText={(fullNameRegInputText) => this.setState({fullNameRegInputText})} value={this.state.fullNameRegInputText}/>
        <TextInput placeholder="Username" onChangeText={(usernameRegInputText) => this.setState({usernameRegInputText})} value={this.state.usernameRegInputText}/>
        <TextInput placeholder="Password" onChangeText={(passwordRegInputText) => this.setState({passwordRegInputText})} value={this.state.passwordRegInputText}/>
        <Button title="Register" onPress={this.registerAcc}/>
        <Text> {this.state.msg} </Text>
      </View>
    );
  }
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
