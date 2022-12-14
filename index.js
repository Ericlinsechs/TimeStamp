// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

require('dotenv').config();

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
// app.get("/api/", function (req, res) {
//   let currentDate = new Date();
//   res.json({"unix": currentDate.getTime(), "utc": `${currentDate.toString()}`});
// });

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const req_date = req.params.date;
  const now_date = new Date();
  console.log(req_date);
  if (req_date === undefined){
    return res.json({"unix": now_date.getTime(), utc: now_date.toUTCString()});
  }
  if (req_date.includes('-') || req_date.includes(',')) {
    let utcDate = new Date(req_date).toUTCString();
    let unixDate = new Date(req_date).getTime();
    console.log(unixDate);
    if (utcDate === 'Invalid Date' || isNaN(unixDate)) {
      return res.json({ error : "Invalid Date" });
    } else {
      return res.json({unix: unixDate, utc: utcDate});
    }
  } 
  else if (!isNaN(parseInt(req_date))) {
      let utcDate = new Date(parseInt(req_date)).toUTCString();
      console.log(utcDate);
      res.json({unix: req_date, utc: utcDate});  
  } 
  else {
    return res.json({ error : "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
