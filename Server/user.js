
module.exports = function User(login,password,username,fullname) {
  this.login = login;
  this.password = password;
  this.username = username;
  this.fullname = fullname;
  this.friends = [];

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
}
