var express = require('express');
var User = require('./user.js');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var msgs = [];
var users =[];

hashCode = (text) => {
  var hash = 0, i, chr, len;
  if (text.length === 0) return hash;
  for (i = 0, len = text.length; i < len; i++) {
    chr   = text.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /api/users gets JSON bodies
app.post('/register', jsonParser, function (req, res) {
  if (!req.body){return res.sendStatus(400)};

  res.writeHead(200, {"Content-Type": "application/json"});

  let login = req.body.login;
  let password = req.body.password;
  let username = req.body.username;
  let fullname = req.body.fullname;

  for(i=0; i<users.length; i++){
    if(users[i].login === hashCode(login)){
      var json = JSON.stringify({
        myMsg: 'Login already exists'
      });
      res.end(json);
      return;
    }
    else if(users[i].username === username){
      var json = JSON.stringify({
        myMsg: 'Username already exists'
      });
      res.end(json);
      return;
    }
  }

  users.push(new User(hashCode(login),hashCode(password),username,fullname));

  console.log("Created: " + login + " " + password);
  console.log("Accs Amount: " + users.length);
  var json = JSON.stringify({
    myMsg: 'Account Created'
  });
  res.end(json);
})

app.post('/login', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  res.writeHead(200, {"Content-Type": "application/json"});

  let login = req.body.login;
  let password = req.body.password;

  if (users === null){
  console.log("any");
    var json = JSON.stringify({
      myMsg: 'Any Accs'
    });
    res.end(json);
    return;
  }

  for(let i=0; i<users.length; i++){
    if(hashCode(login) === users[i].login && hashCode(password) === users[i].password)
      {
        var json = JSON.stringify({
          myMsg: 'OK',
          user: users[i].username
        });
        res.end(json);
        return;
      }
  }

  var json = JSON.stringify({
    myMsg: 'Data not correct'
  });
  res.end(json);
  console.log("Data are not correct");
})

app.post('/getFriends', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);


  let username = req.body.username;
  console.log("getFriends(1)", username)
  for(i=0; i<users.length; i++){
    console.log(username)
    if(users[i].username === username){
      var json = JSON.stringify({
        friends: users[i].getFriends()
      });
      console.log("frList: ", json.friends);
      res.end(json);
    }
  }
})

app.post('/addFriend', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  let friendLogin = String(req.body.friendLogin);
  let username = req.body.username;

  for(let i=0; i<users.length; i++){
    if(friendLogin === users[i].username)
      {
        console.log("found: " + users[i].username);
        for(j=0; j<users.length; j++){
          if(username === users[j].username){

            users[j].addFriend(friendLogin);
          }
        }
        var json = JSON.stringify({
          myMsg: 'found',
        });
        res.end(json);
        return;
      }
  }
  var json = JSON.stringify({
    myMsg: 'not_found',
  });
  res.end(json);
})

app.post('/sendMsg', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  let username = String(req.body.username);
  let rec = String(req.body.friendLogin);
  let msg = String(req.body.msg);

  for(let i=0; i<users.length; i++){
    if(users[i].username === rec){
      users[i].addMsg(username,String(msg),false);
      break;
    }
  }
  for(let i=0; i<users.length; i++){
    if(users[i].username === username){
      users[i].addMsg(rec,String(msg),true);
      break;
    }
  }

  console.log('from: '+ username + ' to: ' +rec+ ' msg: '+msg)
  var json = JSON.stringify({
    myMsg: 'Sent'
  });
  res.end(json);
})

app.post('/receiveMsg', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  let username = String(req.body.username);
  let from = String(req.body.from);
  var tempMsgs;

//  for(i=0; i<msgs.length; i++){
//    if(msgs[i].to === username && msgs[i].from === from){
    for(let j=0; j<users.length; j++){
      if(users[j].username == username){
        tempMsgs = users[j].getMsgsFrom(from);
        var json = JSON.stringify({
          owner: from,
          msg: tempMsgs
        });

        res.end(json);
        return;
      }
     }

//    }
//  }

  var json = JSON.stringify({
    msg: '-noMsg'
  });
  res.end(json);
})

var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
