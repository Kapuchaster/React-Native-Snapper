var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var accs = [];

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

  accs.push({login: hashCode(login),
    password: hashCode(password),
    username: username,
    fullname: fullname
  })
  console.log("Created:" + login + " " + password);

  var json = JSON.stringify({
    myMsg: 'OK'
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

var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
