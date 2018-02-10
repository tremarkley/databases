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
  username: Sequelize.STRING
});

var Room = db.define('Room', {
  roomname: Sequelize.STRING
});

var Message = db.define('Message', {
  //userid: Sequelize.INTEGER,
  text: Sequelize.STRING
  //roomname: Sequelize.STRING
});

// Message.hasOne(User, {
//   foreignKey: {
//     name: 'username',
//     allowNull: false
//   }
// });

// User.hasMany(Message, {
//   foreignKey: 'username',
//   sourceKey: 'id' 
// });
// Room.hasMany(Message);

// username = Message.belongsTo(User, {
//   foreignKey: 'username',
//   sourceKey: 'id' 
// });

const Username = Message.belongsTo(User, { as: 'username' });

// roomname = Message.belongsTo(Room, {
//   foreignKey: 'roomname',
//   sourceKey: 'id'
// });

const Roomname = Message.belongsTo(Room, { as: 'roomname' });


// Message.hasOne(Room, {
//   foreignKey: {
//     name: 'roomname',
//     allowNull: false
//   }
// });

// /* Sequelize comes with built in support for promises
//  * making it easy to chain asynchronous operations together */
User.sync({force: true})
  .then(()=>{
    return Room.sync({force: true});
  })
  .then(() => {
    return Message.sync({force: true}); 
  })
  .then(function() {
    // Now instantiate an object and save it:
    console.log('before find all');
    return Message.create({
      text: 'will this work', 
      username: {username: 'Jean Valjean'}, 
      roomname: {roomname: 'lobby'}
    }, {
      include: [ 
        Username,
        Roomname 
      ]});
  })
  .then(function() {
    // Retrieve objects from the database:
    console.log('FINDING ALL');
    return Message.findAll();
  })
  .then(function(messages) {
    messages.forEach(function(message) {
      console.log(message.text + ' exists');
    });
    db.close();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });



//   Message.sync().
