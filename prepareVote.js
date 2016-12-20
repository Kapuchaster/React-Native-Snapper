import React, { Component} from 'react';
import { View, Text, Picker, Button} from 'react-native';

const Item = Picker.Item;

export default class PrepareVote extends Component {
  constructor(props) {
    super(props);
    this.sendImg = this.sendImg.bind(this);
  }

  sendImg(){
    let avatar = require('./img/Avatar.jpg');
  //  imgData = this.getBase64Image(avatar);
  }

  getBase64Image(img) {
    // var canvas = document.createElement("canvas");
    // canvas.width = img.width;
    // canvas.height = img.height;
    //
    // var ctx = canvas.getContext("2d");
    // ctx.drawImage(img, 0, 0);
    //
    // var dataURL = canvas.toDataURL("image/png");
    //
    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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
        <Button title="send Pict" onPress={this.sendImg}/>
      </View>
    )
  }
}
