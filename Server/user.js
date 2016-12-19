
module.exports = function User(login,password,username,fullname) {
  this.login = login;
  this.password = password;
  this.username = username;
  this.fullname = fullname;
  this.friends = [];
  this.msgs = [];

  this.addFriend = function(username){
    this.friends.push(username);
    console.log("Added ", username, "to", this.username);
  }

  this.removeFriend = function(username){
    for(i=0; i<this.friends.length; i++){
      if(this.friends[i].username === username){
        this.friends.splice(i,1);
        return "Deteted";
      }
    }
    return "Username not found"
  }

  this.getFriends = function(){
    return this.friends;
  }
//TODO: Wiadomosc musi sie zapisaywac we wlasciwym miejscu
  this.addMsg = function(sender, msg, me){
    console.log(this.username,sender,msg,me)
    if(String(this.msgs[sender]) === 'undefined'){
      this.msgs[sender] = [];
    }
    if(me === true){
      this.msgs[sender].push({'msg' : "Me: "+msg});
    }
    else{
      this.msgs[sender].push({'msg' : sender+": "+msg});
    }
    console.log("--",this.msgs[sender])
  }

  this.addVoteMsg = function(sender, type, images){

  }

  this.getMsgsFrom = function(sender){
    console.log("Msgs2: ",this.msgs[sender]);
    return this.msgs[sender];
  }

}
