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

module.exports = {
  userJoin,
  getCurrUser
};