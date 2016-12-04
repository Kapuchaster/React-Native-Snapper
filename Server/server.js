var express = require('express');
var app = express();

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

app.post('/register', function(req, res) {
  let login = req.query.login;
  let password = req.query.password;
  accs.push({login: hashCode(login), password: hashCode(password)})
  res.send("Created: L:" + hashCode(login) + " P:" + hashCode(password));
})

app.get('/login', function (req, res) {
  let login = req.query.login;
  let password = req.query.password;

  if (accs === null){
    res.send("There are any accounts");
    return;
  }
  for(let i=0; i<accs.length; i++){
    if(hashCode(login) === accs[i].login && hashCode(password) === accs[i].password)
      {
        res.send("Data are correct");
        return;
      }
  }
  res.send("Data are not correct");
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
