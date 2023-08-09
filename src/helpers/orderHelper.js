const fs = require('fs');
const path = require('path');
const ordersFilePath = path.join(__dirname, '../database/orders.json'); // Adjust the path accordingly

// Function to read JSON data from the orders file
function readOrdersData() {
  const data = fs.readFileSync(ordersFilePath, 'utf8');
  return JSON.parse(data);
}

function writeOrdersData(data) {
  fs.writeFileSync(ordersFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Function to find an order by ID
function findOrderById(id) {
  const orders = readOrdersData();
  return orders.find(order => order.id == id.toString());
}

// Function to create a new order
function createOrder(newOrder) {
  const orders = readOrdersData();
  newOrder.id = orders.length + 1;
  orders.push(newOrder);
  writeOrdersData(orders);
  return newOrder;
}




module.exports = {
  findOrderById,
  createOrder,
  readOrdersData
};
