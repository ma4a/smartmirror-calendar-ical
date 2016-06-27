'use strict';

var ical = require('ical');

exports.get = (params) => {

  var url = params.url;
  var limit = params.limit;

  // Cut string on defined string length
  function limitString(input, limit) {
    if (input.length > limit) {
      return input.substring(0, limit) + '…';
    }
    else {
      return input;
    }
  }

  return new Promise((resolve, reject) => {

    var events = [];
    var months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

    ical.fromURL(url, {}, function(err, data) {
      if (err) {
        console.log(err);
        reject(err);
      }

      var i=0;
      limit>0 ? limit : limit=3; //only return 3 entries if no limit is set by user

      for (var k in data){
        if (data.hasOwnProperty(k)) {
          var ev = data[k]

          // Use only events in the future
          if (new Date(ev.start) > Date.now()) {
            ev.summary = limitString(ev.summary, 50);
            ev.location = limitString(ev.location, 55);
            events.push(ev);
          }
        }
      }

      // Sort events by date
      events.sort(function (a, b) {
        return new Date(a.start) - new Date(b.start);
      });

      // Return limited result
      resolve(events.splice(0, limit))
    });
  });
}