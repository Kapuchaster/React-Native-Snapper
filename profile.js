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

const config = require('./config.json');

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
    this.getFriends();
  }

addFriend(){
  for(i=0; i<this.friends.length; i++){
    if(this.friends[i].value === this.state.friendLogin){
      return;
    }
  }

  fetch(config.serverurl+'/addFriend', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: this.props.username,
      friendLogin: this.state.friendLogin
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.myMsg === 'found'){
        this.friendId = this.friendId+1;
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
  this.setState({contact: String(contactWith)});
  this.state.contact = String(contactWith);
  this.recMsg();
}

backToProfile(){
  this.setState({contact:'null'});
}

getFriends(){
  fetch(config.serverurl+'/getFriends', {
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
      let frs = responseJson.friends;
      for(i=0; i<frs.length; i++){
        this.friendId = this.friendId+1;
        this.friends.push({key: this.friendId, value: frs[i]});
      }
      this.setState({friends  : this.createFriendList()});
    })
    .catch((error) => {
      this.state.check = String(error)
    });
}

recMsg(){

  fetch(config.serverurl+'/receiveMsg', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: this.props.username,
      from: this.state.contact
    })
  }).then((response) => response.json())
    .then((responseJson) => {
       if(responseJson.msg !== '-noMsg'){
         for(i=0;i<responseJson.msg.length; i++){
           this.msgId = this.msgId+1;
           this.msgs.push({key: this.msgId, value: (responseJson.msg[i].msg)});
         }
    this.setState({msgs:this.createMsgList()});
       }
    })
    .catch((error) => {
      this.state.check = String(error);
    });
}

sendMsg(){
  if(this.state.chatMsg === '' || String(this.state.chatMsg) === 'undefined'){
    return;
  }
  fetch(config.serverurl+'/sendMsg', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: this.props.username,
      friendLogin: this.state.contact,
      msg: this.state.chatMsg
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      this.msgId = this.msgId+1;
      this.msgs.push({key: this.msgId, value: this.props.username+': '+this.state.chatMsg});
      this.state.chatMsg = '';
      this.setState({msgs:this.createMsgList()});
    })
    .catch((error) => {

    });
}

createMsgList(){
  return this.msgs.map((obj) =>
    <Text style={{fontSize:20}} key={obj.key}> {obj.value} </Text>
  );
}

createFriendList(){
//  this.friendId = this.friendId+1;
  return this.friends.map((obj) =>
    <TouchableHighlight key={obj.key} value={obj.value} onPress={() => this.startChat(obj.value)}>
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
          <Text> {this.state.check} </Text>
          <TextInput onChangeText={(chatMsg) => this.setState({chatMsg})} value={this.state.chatMsg}/>

          <ScrollView>
            {this.state.msgs}
          </ScrollView>
        </View>
      )
    }
  }
}
