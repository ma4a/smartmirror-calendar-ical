'use strict';

var express = require('express');
var app = express();

var controller = require('./app/controller');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  let url = 'https://calendar.google.com/calendar/ical/your-username%40gmail.com/private-abc123/basic.ics' //override for test purpose
  let limit = 4;
    controller.get({url: url, limit: limit})
      .then((events) => {
        res.render('app/view.jade', {
          events: events
        });
      });
});

app.listen(8080, function () {
  console.log('Module is listening on port 8080!');
});