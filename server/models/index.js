var db = require('../db/index');

module.exports = {
  messages: {
    get: function (callback) {
      var query = 'SELECT messages.objectId, messages.text, rooms.roomname, usernames.username ' +  
                    'FROM messages INNER JOIN rooms ON rooms.id = messages.roomname ' + 
                    'INNER JOIN usernames ON usernames.id = messages.username;';
      var queryArgs = [];
      db.query(query, queryArgs, function(err, results) {
        // console.log('results: ' + JSON.stringify(results));
        callback(err, results);
      });
    }, // a function which produces all the messages
    post: function (messageObj, callback) {
      var query = `INSERT INTO rooms (roomname) VALUE ("${messageObj.roomname}");`;
      db.query(query, function(err, results) {
        var query = `INSERT INTO usernames (username) VALUE ("${messageObj.username}");`;
        db.query(query, function(err, results) {
          var query = `select id from rooms where roomname = "${messageObj.roomname}"`;
          db.query(query, function(err, results) {
            console.log('room results: ' + results[0].id);
            var roomID = results[0].id;
            var query = `select id from usernames where username = "${messageObj.username}"`;
            db.query(query, function(err, results) {
              console.log('username results: ' + JSON.stringify(results));
              var usernameID = results[0].id;
              var query = `insert into messages (roomname, username, text) value (${roomID}, ${usernameID}, "${messageObj.text}")`;
              db.query(query, function(err, results) {
                // console.log('final results: ' + JSON.stringify(results));
                callback(results);
              });
            });
          });
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (userObj, callback) {
      var query = `INSERT INTO usernames (username) VALUE ("${userObj.username}");`;
      db.query(query, function(err, results) {
        callback();
      });
    }
  }
};

//insert into rooms
//insert into usernames
//var roomID = select id from room where room = 'messageObj.room'
//var usernameID = select id from username where username = 'messageObj.username'
//insert into messages (room, username, message) value (roomID, usernameID, messageObj.text) 
