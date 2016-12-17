var express = require('express');
var User = require('./user.js');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var accs = [];
var msgs = [];

var user = new User();
user.test();

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

  // Set our internal DB variable
    var db = req.db;
    var collection = db.get('usercollection');
    // Submit to the DB
// collection.insert({
//     "login" : login,
//     "password" : password,
//     "username" : username
// }, function (err, doc) {
//     if (err) {
//
//     }
//     else {
//
//     }
// });

  for(i=0; i<accs.length; i++){
    if(accs[i].login === hashCode(login)){
      var json = JSON.stringify({
        myMsg: 'Login already exists'
      });
      res.end(json);
      return;
    }
    else if(accs[i].username === username){
      var json = JSON.stringify({
        myMsg: 'Username already exists'
      });
      res.end(json);
      return;
    }
  }

  accs.push({login: hashCode(login),
    password: hashCode(password),
    username: username,
    fullname: fullname
  })
  console.log("Created:" + login + " " + password);
  console.log("len: " + accs.length);
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

  if (accs === null){
  console.log("any");
    var json = JSON.stringify({
      myMsg: 'Any Accs'
    });
    res.end(json);
    return;
  }

  for(let i=0; i<accs.length; i++){
    if(hashCode(login) === accs[i].login && hashCode(password) === accs[i].password)
      {
        var json = JSON.stringify({
          myMsg: 'OK',
          user: accs[i].username
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

app.post('/addFriend', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  let friendLogin = String(req.body.friendLogin);
  for(let i=0; i<accs.length; i++){
    if(friendLogin === accs[i].username)
      {
        console.log("found: " + accs[i].username);
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

  msgs.push({from:username, to:rec, msg:msg});
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

  for(i=0; i<msgs.length; i++){
    if(msgs[i].to === username && msgs[i].from === from){
      var json = JSON.stringify({
        owner: msgs[i].from,
        msg: msgs[i].msg
      });
      msgs.splice(i,1);
      res.end(json);
      return;
    }
  }

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
