
module.exports = function User() {
    // this.login = login;
    // this.password = password;
    // this.username = username;
    // this.fullname = fullname;
  this.friends = [];

  this.write = function(object) {
    this.socket.write(JSON.stringify(object));
}

  this.test = function(){
    console.log("test Correct");
  }

  this.addFriend = function(username){
    this.friends.push(username);
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

}
