const users = [];

// Join user 
function userJoin(id, username, room) {
  const user = {
    id,
    username,
    room
  };
  users.push(user);

  return user;

}

//Get Current user 
function getCurrUser(id){
  return users.find(user => user.id === id);
}

// User Leaves chat
function userLeave(id){
  const ind = users.findIndex(user => user.id === id);

  if(ind !== -1){
    return users.splice(ind, 1)[0];
  }
}

// Get room users  
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrUser,
  userLeave,
  getRoomUsers
};