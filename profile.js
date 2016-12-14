import React, { Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableHighlight
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
    this.addFriend = this.addFriend.bind(this);
    this.startChat = this.startChat.bind(this);
    this.backToProfile = this.backToProfile.bind(this);
    this.recMsg = this.recMsg.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.state = {};
    this.state.contact = 'null';
    this.friends = [];
    this.friendId = 0;
    this.msgs = [];
    this.msgId = 0;
  }

addFriend(){
  fetch('http://192.168.1.5:8082/addFriend', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      friendLogin: this.state.friendLogin
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.myMsg === 'found'){
        this.friends.push({key: this.friendId, value: this.state.friendLogin});
        this.setState({friends  : this.createFriendList()});
      }
       this.setState({msg : this.friends.length});
    })
    .catch((error) => {
      this.setState({msg : 'Error_J'});
    });
}

startChat(contactWith){
  this.setState({contact: contactWith});
}

backToProfile(){
  this.setState({contact:'null'});
}

recMsg(){
  fetch('http://192.168.1.5:8082/receiveMsg', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: this.props.username
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      this.msgs.push({key: this.msgId, from: responseJson.owner, value: responseJson.msg});
      this.setState({msgs:this.createMsgList()});
    })
    .catch((error) => {

    });
}

sendMsg(){
  fetch('http://192.168.1.5:8082/sendMsg', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: this.props.username,
      friendLogin: this.state.talker,
      msg: this.state.chatMsg
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      this.msgs.push({key: this.msgId, value: responseJson.msg});
      this.setState({msgs:this.createMsgList()});
    })
    .catch((error) => {

    });
}

createMsgList(){
  this.msgId = this.msgId+1;
  return this.msgs.map((obj) =>
    <Text style={{fontSize:30}} key={obj.key}> {obj.value} </Text>
  );
}

createFriendList(){
  this.friendId = this.friendId+1;
  return this.friends.map((obj) =>
    <TouchableHighlight key={obj.key} onPress={this.startChat.bind(obj.value)}>
      <Text style={{fontSize:20}}> {obj.value} </Text>
    </TouchableHighlight>
  );
}

  render() {
    let avatar = require('./img/Avatar.jpg');
    let awards = require('./img/Awards.jpg');
    let plus = require('./img/Plus_add.jpg');

    if(this.state.contact === 'null'){
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
          <TextInput placeholder="Add Friend" onChangeText={(friendLogin) => this.setState({friendLogin})} value={this.state.friendLogin}/>
          <Button title="ADD" onPress={this.addFriend}/>
          <Text> {this.state.msg} </Text>

          <ScrollView>
            {this.state.friends}
          </ScrollView>

        </View>
      )
    }
    else{
      return(
        <View>
          <Text> TO JE KONTAKT </Text>
          <Button title="Back" onPress={this.backToProfile}/>
          <Button title="Reveive" onPress={this.recMsg}/>
          <Button title="Send" onPress={this.sendMsg}/>

          <ScrollView>
            {this.state.msgs}
            <TextInput onChangeText={(chatMsg) => this.setState({chatMsg})} value={this.state.chatMsg}/>
          </ScrollView>
        </View>
      )
    }
  }
}
