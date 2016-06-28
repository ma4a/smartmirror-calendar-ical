'use strict';

var express = require('express');
var app = express();
var fs = require('fs');

var controller = require('./app/controller');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function (req, res) {

  let pckg = fs.readFileSync('package.json');
  pckg = JSON.parse(pckg);

  let params = {};
  params.data = true;
  let widget = {};
  widget._id = '1234567890';
  widget.size = pckg.smartmirror.size[0];

  params.url = "https://calendar.google.com/calendar/ical/your-username%40gmail.com/private-abc123/basic.ics" //override for test purpose
  params.limit = 4;

  controller.get(params)
    .then((data) => {
      res.render('./index.jade', {
        data: data,
        widget: widget,
      });
    })
    .catch((err) => {
      console.dir(err);
      res.status(500).send(err);
    });
});

app.listen(8080, function () {
  console.log('Module is listening on port 8080!');
});
