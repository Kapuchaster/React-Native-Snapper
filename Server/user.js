
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

  this.addMsg = function(sender, msg){
    if(String(this.msgs[sender]) === 'undefined'){
      this.msgs[sender] = [];
    }

    this.msgs[sender].push({'msg' : msg});

    console.log("Msgs1: ", this.msgs[sender]);
  }

  this.getMsgsFrom = function(sender){
    console.log("Msgs2: ",this.msgs[sender]);
  }

}
