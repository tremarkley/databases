var models = require('../models');
var qs = require('querystring');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, results) =>{
        if (err) {
          res.writeHead(500, headers);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200, headers);
        res.end(JSON.stringify({results: results}));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {  
      models.messages.post(req.body, function() {
        res.writeHead(201, headers);
        res.end(JSON.stringify({results: 'POST SUCCESS'}));
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      models.users.post(req.body, function() {
        res.writeHead(201, headers);
        res.end();
      });
    }
  }
};

