var express = require('express');
var app = express();

var accs = [];

app.post('/register', function(req, res) {
  let login = req.query.login;
  let password = req.query.password;
  accs.push({login: login, password: password})
  res.send("Created");
})

app.get('/login', function (req, res) {
  let login = req.query.login;
  let password = req.query.password;

  if (accs === null){
    res.send("There are any accounts");
    return;
  }
  for(let i=0; i<accs.length; i++){
    if(login === accs[i].login && password === accs[i].password)
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
