const fs = require('fs');
const path = require('path');

const cartsFilePath = path.join(__dirname, '../database/carts.json'); // Adjust the path accordingly

// Function to read JSON data from the carts file

function readCartsData() {
  const data = fs.readFileSync(cartsFilePath, 'utf8');
  return JSON.parse(data);
}

// Function to write JSON data to the carts file

function writeCartsData(data) {
  fs.writeFileSync(cartsFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Function to find a cart by ID

function findCartById(id) {
  const carts = readCartsData();
  return carts.find(cart => cart.id == id.toString());
}


function findUserById(id) {
  const carts = readCartsData();
  return carts.find(cart => cart.userId == id.toString());
}


// Function to create a new cart

function createCart(newCart) {
  const carts = readCartsData();
  newCart.id = carts.length + 1;
  carts.push(newCart);
  writeCartsData(carts);
  return newCart;

}

// Function to update an existing cart

function updateCart(updatedCart) {
  const carts = readCartsData();
  const index = carts.findIndex(cart => cart.id === updatedCart.id);
  if (index !== -1) {
    carts[index] = updatedCart;
    writeCartsData(carts);
    return updatedCart;
  }
  return null;
}

// push item
function itemAdd(updatedCart) {
  const carts = readCartsData();
  const index = carts.findIndex(cart => cart.id === updatedCart.id);
  if (index !== -1) {
    carts[index] = updatedCart;
    writeCartsData(carts);
    return updatedCart;
  }
  return null;
}

// Function to delete a cart by ID

function deleteCart(id) {
  const carts = readCartsData();
  const index = carts.findIndex(cart => cart.id == id.toString());
  if (index !== -1) {
    const deletedCart = carts.splice(index, 1);
    writeCartsData(carts);
    return deletedCart;
  }
  return null;
}

module.exports = {
  findCartById,
  createCart,
  updateCart,
  deleteCart,
  readCartsData,
  findUserById
};
