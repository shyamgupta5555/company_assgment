const path = require("path");
const addressHelper = require("../helpers/addressHelper");

const addressesFilePath = path.join(__dirname, "../data/addresses.json");
const userHelper = require("../helpers/userHelper");

// Create a new address
exports.createAddress = (req, res) => {
  try {
    const userId = req.params.userId;
    const {street,city,state,zip ,...rest} = req.body

    if(Object.keys(rest).length >0)return res.status(400).send({message:"please provided only valid details"})

    if(!street)return res.status(400).send({message:"street is required"})
    if(!city)return res.status(400).send({message:"city is required"})
    if(!state)return res.status(400).send({message:"state is required"})
    if(!zip)return res.status(400).send({message:"zip is required"})


    const checkId = userHelper.findUserById(userId);
    if (!checkId) return res.status(400).send({ message: "user id not exist" });

    const checkAddress = addressHelper.findAddressUserId(userId)
    console.log(checkAddress)
    if(checkAddress)return res.status(400).send({message:`already create address this is id =>  ${checkAddress.id}`})

    const newAddress = req.body;
    newAddress.userId = checkId.id;
    const createdAddress = addressHelper.createAddress(newAddress);
    return res.status(201).json(createdAddress);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Update an existing address

exports.updateAddress = (req, res) => {
  const addressId = parseInt(req.params.addressId);
  const updatedAddress = req.body;
  
  const {street,city,state,zip ,...rest} = req.body
  if(Object.keys(rest).length >0)return res.status(400).send({message:"please provided only valid details"})

  updatedAddress.id = addressId;

  const address = addressHelper.findAddressById(addressId);
  if (!address) return res.status(404).send({ message: "address not found" });
 

  if (!updatedAddress.street) {
    updatedAddress.street = address.street;
  }
  if (!updatedAddress.city) {
    updatedAddress.city = address.city;
  }
  if (!updatedAddress.state) {
    updatedAddress.state = address.state;
  }
  if (!updatedAddress.zip) {
    updatedAddress.zip = address.zip;
  }

  const result = addressHelper.updateAddress(updatedAddress);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ error: "Address not found" });
  }
};

// Get a list of addresses
exports.getAddress = (req, res) => {
  try {
    const id = req.params.addressId;
    const addresses = addressHelper.findAddressById(id);
    if (!addresses)
      return res.status(400).send({ message: "address not found" });
    return res.status(200).json(addresses);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
