const fs = require('fs');
const path = require('path');

const addressesFilePath = path.join(__dirname, '../database/address.json');


function readAddressesData() {
  const data = fs.readFileSync(addressesFilePath, 'utf8');
  return JSON.parse(data);
}

// Function to write JSON data to the addresses file
function writeAddressesData(data) {
  fs.writeFileSync(addressesFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Function to find an address by ID
function findAddressById(id) {
  console.log(id)
  const addresses = readAddressesData();
  return addresses.find(address => address.id == id);
}

function findAddressUserId(id) {
  const addresses = readAddressesData();
  return addresses.find(address => address.userId == id);
}

// Function to create a new address
function createAddress(newAddress) {
  const addresses = readAddressesData();
  newAddress.id = addresses.length + 1;
  addresses.push(newAddress);
  writeAddressesData(addresses);
  return newAddress;
}

// Function to update an existing address
function updateAddress(updatedAddress) {
  const addresses = readAddressesData();
  const index = addresses.findIndex(address => address.id === updatedAddress.id);
  if (index !== -1) {
    addresses[index] = updatedAddress;
    writeAddressesData(addresses);
    return updatedAddress;
  }
  return null;
}

// Function to delete an address by ID
function deleteAddress(id) {
  const addresses = readAddressesData();
  const index = addresses.findIndex(address => address.id === id);
  if (index !== -1) {
    const deletedAddress = addresses.splice(index, 1)[0];
    writeAddressesData(addresses);
    return deletedAddress;
  }
  return null;
}

module.exports = {
  findAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  findAddressUserId
};
