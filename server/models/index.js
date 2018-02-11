var db = require('../db/index');
var orm = require('../../orm-resources/orm');

module.exports = {
  messages: {
    get: function (callback) {
      orm.getMessages()
        .then((results) => {
          callback(null, results);
        })
        .catch((err) => {
          callback(err, null);
        });
    }, // a function which produces all the messages
    post: function (messageObj, callback) {
      orm.addMessage(messageObj)
        .then(() => {
          callback();
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
