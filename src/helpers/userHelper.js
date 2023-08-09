const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../database/users.json'); 

// Function to read JSON data from the users file

function readUsersData() {
  const data = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(data);
}

// Function to write JSON data to the users file
function writeUsersData(data) {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Function to find a user by ID
function findUserById(id) {
 id = id.toString()
  const users = readUsersData();  
  return  users.find((element) => element.id == id);
}

// Function to create a new user

function createUser(newUser) {
  const users = readUsersData();
  id = users.length + 1;
 const obj ={
  id :id,
  name : newUser.name,
  email :newUser.email,
  password :newUser.password,
  role : newUser.role
 }
  users.push(obj);
  writeUsersData(users);
  return obj;
}

// Function to update an existing user

function updateUser(updatedUser) {
  const users = readUsersData();
  const index = users.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    writeUsersData(users);
    return updatedUser;
  }
  return null;
}

// Function to delete a user by ID

function deleteUser(id) {
  const users = readUsersData();
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    writeUsersData(users);
    return deletedUser;
  }
  return null;
}

module.exports = {
  findUserById,
  createUser,
  updateUser,
  deleteUser
};
