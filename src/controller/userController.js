
const path = require('path');
const helper = require('../helpers/userHelper'); // Adjust the path to match your project structure


// Create a new user

exports.createUser = (req, res) => {
try{
  const newUser = req.body;
const {name ,email ,password, role, ...rest} =req.body
if(Object.keys(rest).length >0)return res.status(400).send({message:"please provided only valid details"})
if(!name)return res.status(400).send({message:"name required"})
if(!password)return res.status(400).send({message:"password required"})
if(!email)return res.status(400).send({message:"email required"})
if(!role )return res.status(400).send({message:"role required"})

const roleCheck = ["admin" ,"user" ,"seller"]
if(!roleCheck.includes(role.trim()))return res.status(400).send({message:"role should be only admin, user, seller"})

  const createdUser = helper.createUser( newUser);
  res.status(201).json(createdUser);
}catch(err){
  return res.status(500).send({message :err.message})
}
};


