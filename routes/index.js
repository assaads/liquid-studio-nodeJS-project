var express = require('express');
var router = express.Router();
const client = require('../dbconn.js')

router.post("/login", function (req, res) {
  client.connect();
  //console.log("login");
  const user = req.body;
  let insertQuery = `select * from users where username ='${user.username}' and password='${user.password}'`
  client.query(insertQuery, (err, result) => {
    if (!err && result.rowCount>0) {
      const concat= require("../services/concat");
      const msg=concat.concat_string(user.username);
      res.render('homepage', { message: msg });
      client.end;
    }
    else { 
      //console.log(err.message);
      res.render('index' , { message : 'credentials not correct' });
      client.end;
    }
  })
  client.end;
});

router.post('/register', (req, res) => {
  client.connect();
  //console.log("register");
  const user = req.body;
  let insertQuery = `insert into users(username, password, name, surname) 
                     values('${user.username}', '${user.password}', '${user.name}', '${user.surname}')`

  client.query(insertQuery, (err, result) => {
    if (!err) {
      const concat= require("../services/concat");
      const msg=concat.concat_string(user.username);
      res.render('homepage', { message: msg });
      client.end;
      //console.log("yup");
    }
    else { 
      //console.log("nope");
      res.render('index', { message : 'user already exists' });
      client.end;
    }
  })
  client.end;
})

router.get('/logout', (req, res) => {
  res.redirect('index', { message : '' });
})

router.get('/', function (req, res, next) {
  console.log("home page called" );
  res.render('index', { message : '' });
});

module.exports = router;
