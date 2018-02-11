/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
var db = new Sequelize('chatroom', 'student', 'student', {
  host: '127.0.0.1',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = db.define('User', {
  username: { type: Sequelize.STRING, allowNull: false}
});

var Room = db.define('Room', {
  roomname: { type: Sequelize.STRING, allowNull: false}
});

var Message = db.define('Message', {
  objectId: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  text: Sequelize.STRING
});

User.hasMany(Message);
const Username = Message.belongsTo(User);

Room.hasMany(Message);
const Roomname = Message.belongsTo(Room);

// /* Sequelize comes with built in support for promises
//  * making it easy to chain asynchronous operations together */
User.sync()
  .then(()=>{
    return Room.sync();
  })
  .then(() => {
    return Message.sync(); 
  })
  .then(function() {
    // Now instantiate an object and save it:
    exports.getMessages()
      .then((Messages) => {
        if (Messages.length === 0) {
          var MessageObj = {username: 'Steve Jobs', roomname: 'lobby', text: 'The ones who are crazy enough to think they can change the world usually are'};
          exports.addMessage(MessageObj);
        }
      });
    // var MessageObj = {username: 'Steve Jobs', roomname: 'lobby', text: 'The ones who are crazy enough to think they can change the world usually are'};
    // return exports.addMessage(MessageObj);
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });

exports.addMessage = function({text, username, roomname}) {
  var userId;
  var roomId;
  return User.findOrCreate({
    where: {
      username: username 
    }
  })
    .spread((results, created) => {
      userId = results.id;
      return Room.findOrCreate({
        where: {
          roomname: roomname
        }
      });
    })
    .spread((results, created) => {
      roomId = results.id;
      return Message.create({
        text: text,
        UserId: userId,
        RoomId: roomId
      });
    });
};

exports.getMessages = function() {
  return Message.findAll({include: [User, Room]})
    .then((Messages) => {
      return Messages.map((message) => {
        var returnObj = {};
        returnObj.objectId = message.objectId;
        returnObj.text = message.text;
        returnObj.createdAt = message.createdAt;
        returnObj.username = message.User.username;
        returnObj.roomname = message.Room.roomname;
        return returnObj;
      });
    });
};


